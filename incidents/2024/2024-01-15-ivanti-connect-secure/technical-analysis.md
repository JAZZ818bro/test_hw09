# Ivanti Connect Secure 攻擊手法與技術分析

## 03. 攻擊手法
- **初始入侵途徑**：
  - 攻擊者鎖定網際網路暴露之 Ivanti Connect Secure VPN 外部入口網站。
  - 首先發送精心構造之 HTTP 請求利用 **CVE-2023-46805**（REST API 驗證控制路徑繞過漏洞），規避 `/api/v1/cav/` 端點的權限查核。 `[已確認事實]`
  - 接著透過內部 API 端點觸發 **CVE-2024-21887**，在命令引數中注入 shell 元字元（Command Injection），以 `root` 特權執行任意指令。 `[已確認事實]`
- **攻擊者使用的技術 (MITRE ATT&CK)**：
  - `T1190` - Exploit Public-Facing Application（利用公開應用程式漏洞）
  - `T1505.003` - Server Software Component: Web Shell（植入 Web Shell）
  - `T1562.001` - Impair Defenses: Disable or Modify Tools（篡改完整性檢查工具）
  - `T1003` - OS Credential Dumping（傾印登入憑證）
- **攻擊執行流程**：
  ```mermaid
  flowchart TD
      A["攻擊者發送惡意 HTTP 請求"] --> B["CVE-2023-46805: 繞過 /api/v1 驗證"]
      B --> C["CVE-2024-21887: 命令注入取得 root shell"]
      C --> D["植入 WIREFIRE / GLASSTOKEN Web Shell"]
      D --> E["篡改內建 ICT 完整性檢測腳本 (防禦規避)"]
      E --> F["傾印內存快取之使用者 AD 憑證與金鑰"]
      F --> G["橫向移動侵入內部企業網路"]
  ```
- **使用的惡意程式或工具**：
  - **WIREFIRE**：輕量級 Python Web Shell，植入於組態處理組件，專門接收外部 Base64 編碼指令。 `[已確認事實]`
  - **GLASSTOKEN**：針對 JavaScript 前端框架注入的後門，偽裝成合法 API 端點。 `[已確認事實]`
  - **WARPWIRE**：注入於登入頁面之認證竊密 JavaScript 腳本，明文攔截提交之帳密。 `[已確認事實]`

## 04. 技術分析
- **漏洞或攻擊技術**：
  - **CVE-2023-46805 (CVSS 8.2)**：位於 Web 伺服器之路由轉發規則，對 `/api/v1/cav/client/status/../../` 等目錄穿越樣式未妥善規範化，使攻擊者能未經身份驗證直接觸發受保護的管理介面。
  - **CVE-2024-21887 (CVSS 9.1)**：位於 `/api/v1/license/keys-status/` 等 API 的後端 Python 腳本，直接將外部輸入未經清理拼接至 shell 指令執行，導致無條件任意命令執行。
- **IOC（入侵指標）**：
  - **Web Shell 檔案路徑**：
    - `/home/perl/licenseserver.cgi`
    - `/pkg/do-install/wirefire.py`
  - **檔案雜湊 (SHA256)**：
    - `06b4791e84b1d61996d9101c7847b2c0fd3230c45de19c438c64d85ccb6b8d96` (WARPWIRE 竊密器)
    - `9c0f991f86f5c8774706beeb3d97f5a9f8f9024f9e160e181be3c0b0373fb398` (WIREFIRE Web Shell)
  - **惡意連線 IP 與 C2**：
    - `206.189.208.156` (探測與初始載入)
    - `75.145.243.85` (C2 通訊站點)
- **網路行為**：利用現有 443/TCP TLS 通道偽裝回傳流量，隱匿於正常的 HTTPS 業務流量中。 `[已確認事實]`
- **系統與程序行為**：攻擊者執行 `mount -o remount,rw /` 將唯讀分區重新掛載為可讀寫，隨後改寫系統 Python 函式庫，並清除 `/data/var/dlogs` 下的審計事件紀錄。 `[已確認事實]`

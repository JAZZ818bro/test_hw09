# Change Healthcare 攻擊手法與技術分析

## 03. 攻擊手法
- **初始入侵途徑**：
  - 攻擊者未利用任何未知的 0-day 漏洞，而是直接使用由暗網竊密日誌（Infostealer Logs）中取得的有效員工帳號與密碼。 `[已確認事實]`
  - 目標 Citrix 遠端存取 Portal 缺乏多因素驗證 (MFA)，致使攻擊者單憑一組憑證即順利通過外圍邊界認證。 `[已確認事實]`
- **攻擊者使用的技術 (MITRE ATT&CK)**：
  - `T1078` - Valid Accounts（有效帳號濫用）
  - `T1133` - External Remote Services（外部遠端服務）
  - `T1003` - OS Credential Dumping（LSASS 記憶體憑證竊取）
  - `T1021.002` - Remote Services: SMB/Windows Admin Shares（透過 SMB 橫向移動）
  - `T1567` - Exfiltration Over Web Service（透過雲端儲存向外洩露資料）
  - `T1486` - Data Encrypted for Impact（資料加密癱瘓）
- **攻擊執行流程**：
  ```mermaid
  flowchart TD
      A["外洩帳號憑證 (Infostealer 取得)"] --> B["登入無 MFA 的 Citrix 遠端服務"]
      B --> C["LSASS 憑證傾印取得 Domain Admin"]
      C --> D["持續 9 天收集並打包 4TB 醫療資料"]
      D --> E["透過 Rclone 滲漏資料至外網雲端儲存"]
      E --> F["透過 PsExec/GPO 批量分發 ALPHV 勒索軟體"]
      F --> G["大規模加密檔案並切斷醫療結算平台"]
  ```
- **使用的惡意程式或工具**：
  - **ALPHV / BlackCat 勒索軟體**：使用 Rust 語言撰寫的高性能多執行緒加密器，支援 AES-256 與 ChaCha20。 `[已確認事實]`
  - **Rclone / MegaCmd**：用於高速加密傳輸並滲漏大量病患個資的合法雲端管理工具（Living off the Land）。 `[已確認事實]`
  - **PsExec & Cobalt Strike Beacon**：用於在內網橫向分發載荷與建立交互式命令連線。 `[已確認事實]`

## 04. 技術分析
- **漏洞或攻擊技術**：
  - 本事件無對應 CVE，其致命弱點在於**身分識別與存取管理（IAM）政策嚴重缺失**與**缺乏多因素驗證機制**。
  - 由於未對外部遠端存取強制推行 FIDO2 / TOTP，使得攻擊者能利用普通員工憑證直接穿透邊界。
- **IOC（入侵指標）**：
  - **勒索加密副檔名**：`.alphv` / 隨機 7 碼英數後綴
  - **勒索信檔案名稱**：`RECOVER-README.txt`
  - **惡意二進位雜湊 (SHA256)**：
    - `0d3a54d3ebf6869a8449e7bdf51a707a2a0ffeb1e29e9d6d5ef0d279cf4f828a` (BlackCat Rust Encryptor)
    - `8a25c345a0b12bc129031ef1e479a024c6e94e21a719c8f9485b0d0c1598f80b` (Cobalt Strike Stager)
  - **滲漏傳輸特徵**：
    - 短時間內向公開網址 `*.mega.nz` 發起大量具規律之 HTTPS 出站封包。
- **網路行為**：利用 SMB (445/TCP) 及 RPC 進行內網掃描與權限探索，並將資料以分塊壓縮檔傳送至外部匿名雲端儲存。 `[已確認事實]`
- **系統與程序行為**：執行 `vssadmin delete shadows /all /quiet` 刪除 Windows 磁碟陰影複製，並終止各類 MSSQL、Oracle 與 Exchange 資料庫服務以解除檔案鎖定以利加密。 `[已確認事實]`

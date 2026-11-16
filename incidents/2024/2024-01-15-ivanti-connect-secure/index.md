---
id: "2024-01-15-ivanti-connect-secure"
title: "Ivanti Connect Secure 零時差漏洞連鎖利用攻擊事件"
date: "2024-01-10"
discovery_date: "2023-12-14"
target: "全球數百家企業、國防承包商及政府機關"
industry: "國防、政府、高科技與關鍵基礎設施"
severity: "Critical"
evidence_status: "confirmed"
cve: ["CVE-2023-46805", "CVE-2024-21887"]
threat_actor: "UNC5221 (疑似具國家背景之高威脅組織)"
tags: ["0-day", "VPN-Exploit", "Web-Shell", "Espionage"]
summary: "攻擊者串聯 Ivanti Connect Secure VPN 設備之身份驗證繞過與命令注入漏洞，在未授權情況下取得系統 root 權限，隨後植入 Web Shell、竊取組態憑證並篡改內建完整性檢測機制以規避偵測。"
---

# Ivanti Connect Secure 零時差漏洞連鎖利用攻擊事件

## 01. 事件概述
- **事件發生時間**：2023 年 12 月初即觀測到在野探測與利用跡象，受害者通報於 2024-01-10 經 Volexity 與 Ivanti 原廠公開確認。 `[已確認事實]`
- **事件發生對象**：全球部署 Ivanti Connect Secure (ICS / 舊稱 Pulse Secure) 及 Policy Secure 網關之企業、國防國安組織與大型企業。 `[已確認事實]`
- **事件簡介與影響**：威脅組織利用兩個零時差漏洞組合（CVE-2023-46805 身份驗證繞過 ＋ CVE-2024-21887 指令注入），無需任何帳號憑證即可遠端在 VPN 設備上執行任意程式碼。攻擊者更進一步修改內建 Python 程式碼、注入惡意 Web Shell（如 GLASSTOKEN、WIREFIRE），並竊取內存快取的 VPN 使用者連線憑證。 `[已確認事實]`

## 05. 影響與損害
- **受影響系統**：Ivanti Connect Secure 9.x、22.x 全版本，以及 Policy Secure 閘道系統。 `[已確認事實]`
- **資料外洩情況**：
  - 設備內存與資料庫中快取之 Active Directory (AD) 網域使用者帳號密碼。 `[已確認事實]`
  - 設備組態檔、VPN 憑證、私鑰與會話 Token。 `[已確認事實]`
  - 後續內網橫向移動造成的深層內部文件外洩狀況：因各受害企業環境而異，部分敏感外洩細節仍屬機密。 `[尚待確認]`
- **財務或營運損失**：CISA 發布緊急指令 (ED 24-01) 要求美國聯邦機構拔除該設備網路連線並強制重構；全球企業投入數千萬美元進行緊急應變與鑑識調查。 `[已確認事實]`
- **其他影響**：邊界網路架構信任遭受重創，促使企業加速轉向以零信任（Zero Trust Network Access, ZTNA）取代傳統集中式 SSL VPN。 `[已確認事實]`

## 06. 防禦與改善
- **官方應對措施**：
  - Ivanti 於 2024-01-10 發布緩解方案 XML 設定檔（mitigation.xml），封鎖受影響的 Web 請求路徑。 `[已確認事實]`
  - CISA 於 2024-01-19 與 2024-01-31 發布應急指南，要求所有聯邦機構徹底備份日誌並隔離檢測。 `[已確認事實]`
  - Ivanti 自 2024-01-31 起分批釋出正式修補韌體版本。 `[已確認事實]`
- **漏洞修補方式**：
  - 部署 Ivanti 官方修補韌體。 `[已確認事實]`
  - 執行官方外部完整性檢查工具 (External ICT) 進行二進位雜湊比對。 `[已確認事實]`
- **後續改善**：
  - 撤銷並重設所有曾通過該 VPN 認證之 AD 網域帳號、服務帳號及 Kerberos 票證（KRBTGT）。 `[已確認事實]`
  - 撤銷並重新簽發 VPN 伺服器與 CA 憑證。 `[已確認事實]`
  - 限制 VPN 管理介面僅限專用帶外管理網路（OOB）存取，禁止暴露於公開網際網路。 `[已確認事實]`

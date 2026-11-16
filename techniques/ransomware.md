---
id: "ransomware"
title: "勒索軟體與資料加密衝擊 (Data Encrypted for Impact)"
mitre_id: "T1486"
tactic: "Impact"
severity: "Critical"
summary: "攻擊者透過強對稱與非對稱加密演算法對目標系統內的關鍵資料進行不可逆加密，並破壞系統還原備份點，藉由癱瘓業務向受害組織勒索高額解密贖金。"
---

# 勒索軟體與資料加密衝擊 (T1486)

## 1. 技術概念與原理
- 現代勒索軟體多採用**雙重勒索（Double Extortion）**甚至**三重勒索（Triple Extortion）**模式：
  1. 第一重：加密受害伺服器與虛擬機器磁碟，造成營運癱瘓。
  2. 第二重：在加密前預先竊取數百 GB 至數 TB 的商業機密或敏感個資，威脅若不付贖金即公諸於暗網。
  3. 第三重：向受害者的客戶、供應商發送威脅郵件，或發起 DDoS 攻擊加重受害單位營運壓力。
- 加密實作：通常使用混合加密體系，對每個檔案使用隨機生成的 AES-256 或 ChaCha20 金鑰加密，並使用攻擊者的 RSA-4096 / Curve25519 公鑰加密該對稱金鑰，確保無私鑰時數學上無法解密。

## 2. 常見利用情境與攻擊流程
- **防禦抑制與前置清理**：
  - 呼叫 `vssadmin` 刪除磁碟快照（Volume Shadow Copies）。
  - 使用 Windows Restart Manager 或終止 SQL、Exchange 相關程序以釋放檔案鎖（File Locks）。
  - 停用 Windows Defender 或透過 BYOVD（自帶易受攻擊驅動程式）終止 EDR 防護程序。
- **快速加密演算法**：採用「間歇性加密（Intermittent Encryption）」技術，僅加密檔案頭尾或特定區塊，在大幅提升加密速度的同時依然達成毀壞檔案結構的效果。

## 3. 關聯資安事件
- [2024-02-21-change-healthcare-ransomware](../incidents/2024/2024-02-21-change-healthcare-ransomware/index.md)：ALPHV/BlackCat 勒索軟體摧毀醫療交易系統，造成全美醫療核銷停擺。

## 4. 偵測與防禦對策
- **3-2-1-1-0 備份原則**：保存 3 份資料、2 種不同儲存媒介、1 處異地備份、1 份離線不可篡改備份（Immutable Backup）、0 備份還原錯誤驗證。
- **金絲雀檔案（Canary Files）與大量檔案寫入偵測**：在檔案伺服器監控目錄短時間內的異常檔名變更頻率與高熵（High Entropy）寫入行為。
- **嚴格網路分段**：避免備份管理網段（如 Veeam）與一般 Active Directory 網域產生信任串聯。

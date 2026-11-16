---
id: "privilege-escalation"
title: "憑證存取與特權提升 (OS Credential Dumping)"
mitre_id: "T1003"
tactic: "Credential Access"
severity: "Critical"
summary: "攻擊者透過記憶體傾印、註冊表提取或攔截認證協定，取得本機使用者或網域管理員的純文字密碼、NTLM 雜湊值與 Kerberos 票據，進而取得企業最高控制權。"
---

# 憑證存取與特權提升 (T1003)

## 1. 技術概念與原理
- 在 Windows 網域環境中，`lsass.exe`（Local Security Authority Subsystem Service）進程負責處理使用者登入認證並快取憑證。
- 具備本機管理者權限的攻擊者通常利用工具（如 Mimikatz、ProcDump）讀取 LSASS 記憶體，直接提取 NTLM 雜湊值進行 Pass-the-Hash 橫向攻擊，或偽造黃金票據（Golden Ticket）。

## 2. 常見利用情境與攻擊流程
- **LSASS 傾印**：呼叫 `MiniDumpWriteDump` API 或利用合法驅動直接讀取記憶體頁面。
- **NTDS.dit 提取**：從網域控制器（DC）備份或磁碟快照複製 Active Directory 資料庫 `ntds.dit` 及 `SYSTEM` 註冊表配置單元，離線破解全域帳密。
- **DPAPI 竊取**：解密本機存放於瀏覽器、RDP 用戶端或憑證管理員中的已儲存密碼。

## 3. 關聯資安事件
- [2024-01-15-ivanti-connect-secure](../incidents/2024/2024-01-15-ivanti-connect-secure/index.md)：攻擊者在 VPN 設備內存提取快取之網域帳號憑證。
- [2024-02-21-change-healthcare-ransomware](../incidents/2024/2024-02-21-change-healthcare-ransomware/index.md)：攻擊者於內網潛伏期間實施憑證傾印，取得網域最高管理員權限。

## 4. 偵測與防禦對策
- **開啟 Credential Guard (LSA Protection)**：利用虛擬化安全技術（VBS）將 LSASS 敏感密鑰隔離於獨立受保護的沙箱中。
- **限制除錯權限 (SeDebugPrivilege)**：嚴格限制只有專屬安全管理員群組擁有除錯本機進程之特權。
- **監控敏感 API 呼叫**：透過 Sysmon Event ID 10 監控非系統正常程序存取 `lsass.exe` 的行為特徵。

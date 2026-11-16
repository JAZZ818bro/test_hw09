# Cyber Incident Archive — 全域事件總索引

最後更新時間：2026-11-16

---

## 收錄事件清單

| 事件識別碼 | 發生日期 | 受害主體 | 產業領域 | 攻擊類型 | 關鍵 CVE | 證據狀態 |
|---|---|---|---|---|---|---|
| [2024-01-15-ivanti-connect-secure](incidents/2024/2024-01-15-ivanti-connect-secure/index.md) | 2024-01-15 | 全球多家企業/政府機關 | 國防/公部門/關鍵基礎設施 | 邊界 VPN 設備零時差漏洞利用 (0-day) | CVE-2023-46805, CVE-2024-21887 | `[已確認事實]` |
| [2024-02-21-change-healthcare-ransomware](incidents/2024/2024-02-21-change-healthcare-ransomware/index.md) | 2024-02-21 | Change Healthcare (UnitedHealth Group) | 醫療保健 / 健保支付結算 | ALPHV/BlackCat 勒索軟體、無 MFA 遠端存取 | 無特定 CVE (遭洩漏憑證攻擊) | `[已確認事實]` |

---

## 攻擊技術知識索引

- [魚叉式網路釣魚 (Phishing - T1566)](techniques/phishing.md)
- [勒索軟體加密與勒索 (Ransomware - T1486)](techniques/ransomware.md)
- [利用公開應用程式漏洞 (Exploit Public-Facing Application - T1190)](techniques/exploit-public-facing.md)
- [憑證存取與傾印 (Credential Dumping - T1003)](techniques/privilege-escalation.md)

---

## 漏洞追蹤索引

- [CVE-2023-46805: Ivanti Connect Secure 身份驗證繞過漏洞](vulnerabilities/CVE-2023-46805.md)
- [CVE-2024-21887: Ivanti Connect Secure 命令注入遠端執行漏洞](vulnerabilities/CVE-2024-21887.md)

---

## 個人研究筆記

- [逆向分析：惡意程式持久化與反鑑識技術](research-notes/malware-analysis.md)
- [網路鑑識：勒索軟體橫向移動流量特徵分析](research-notes/network-forensics.md)

---
id: "phishing"
title: "魚叉式網路釣魚 (Spearphishing)"
mitre_id: "T1566"
tactic: "Initial Access"
severity: "High"
summary: "攻擊者透過客製化偽造郵件或即時通訊，誘騙特定目標點擊惡意連結、下載偽裝文件或輸入帳號憑證，是目前威脅組織突破企業邊界最普及的手法之一。"
---

# 魚叉式網路釣魚 (Spearphishing - T1566)

## 1. 技術概念與原理
- 攻擊者在行動前進行充分的開源情報收集（OSINT），鎖定目標組織中具備高權限或財務權限的特定員工。
- 郵件內容高度仿真（偽裝為人力資源政策、薪資調整、重要供應商發票或 IT 密碼重設通知），藉此大幅降低被害人的戒心。
- 現代釣魚常結合「逆向代理釣魚框架」（如 Evilginx），即時攔截並竊取使用者輸入之 OTP 雙因素認證 Session Token，有效繞過傳統簡訊或 App 推播驗證。

## 2. 常見利用情境與攻擊流程
- **附件誘導**：帶有密碼保護之 ZIP/7z 壓縮檔，內部包含 LNK 捷徑檔、OneNote 筆記或惡意 ISO 鏡像檔，用以規避安全郵件閘道（SEG）之靜態掃描。
- **OAuth 授權釣魚（Consent Phishing）**：誘騙使用者授權惡意第三方應用程式存取其 Microsoft 365 / Google Workspace 郵件與雲端檔案，無需竊取密碼即可長期潛伏。

## 3. 關聯資安事件
- 歷史上眾多 APT 攻擊行動（如 APT28、Lazarus）皆以高度客製化的魚叉釣魚做為第一道突破口。
- 亦常見於憑證竊取鏈條中，作為勒索軟體初始存取仲介（Initial Access Broker, IAB）的標準作案工具。

## 4. 偵測與防禦對策
- **抗釣魚多因素驗證（Phishing-Resistant MFA）**：導入基於 FIDO2 / WebAuthn 的硬體安全金鑰，從密碼學層面徹底根除反向代理釣魚攔截。
- **郵件防護協議**：全面落實 SPF、DKIM 與 DMARC（配置 `p=reject` 策略）。
- **進階行為分析**：監控使用者終端上下文中 Office 或瀏覽器程序是否異常衍生 `powershell.exe` 或 `cmd.exe` 等子程序。

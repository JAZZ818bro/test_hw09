---
id: "network-forensics"
title: "網路鑑識：勒索軟體橫向移動與大規模資料滲漏特徵分析"
author: "Cyber Incident Research Team"
date: "2024-03-20"
tags: ["Forensics", "Ransomware", "Data-Exfiltration", "Network-Traffic"]
summary: "分析雙重勒索行動中資料打包與外洩階段的網路封包特徵，探討如何利用 NetFlow、DNS 日誌與 TLS 憑證異常在加密前即時阻斷外洩通道。"
---

# 網路鑑識：勒索軟體橫向移動與大規模資料滲漏特徵分析

## 1. 研究背景
以 [Change Healthcare 勒索事件](../incidents/2024/2024-02-21-change-healthcare-ransomware/index.md) 為例，攻擊者在內網潛伏長達 9 天並外洩超過 4TB 的敏感資料。如果在資料滲漏（Exfiltration）階段能被及時攔截，即可大幅減輕後續勒索造成的災難性衝擊。

## 2. 核心流量特徵分析
- **合法工具雙重利用（Living off the Land）**：
  - 威脅行動者幾乎不再自行開發上傳工具，而是大量使用 `Rclone`、`MegaCmd` 或 `FileZilla`。
  - 特徵：出站連線多指向知名公有雲端儲存（如 Mega.nz、Wasabi、AWS S3、OneDrive）。
- **流量異常特徵**：
  - 短時間內特定內部主機與單一外部網域之間出現長時間維持且頻寬接近飽和的 TLS 連線。
  - 統計封包大小分佈，上行資料量遠大於下行資料量（Up/Down 比例極度失衡，如 100:1）。

## 3. 防禦與早期預警策略
- **DNS 查詢監控**：對非企業內部指定雲端儲存之網域名稱查詢發出安全告警。
- **微分段出站過濾**：資料庫核心主機與備份系統嚴格禁止直接建立任何公網 HTTPS 出站連線，所有資料轉移一律通過受審查的代理伺服器。

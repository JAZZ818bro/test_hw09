# Cyber Incident Archive — 資安事件研究知識庫

歡迎來到 **Cyber Incident Archive（資安事件研究知識庫）**。

本知識庫旨在透過深度研究真實資安事件，剖析不同產業面臨的威脅情勢、攻擊者入侵途徑、攻擊流程鏈條、利用之惡意工具與 CVE 漏洞，以及受害單位的防禦因應與修復對策。

---

## 專案核心定位

本專案**非一般資安新聞聚合器**，而是一個**個人資安技術研究工作台與知識庫**：
- **資訊整理**：標準化 8 大必備章節，建立事件完整脈絡。
- **技術研究**：深入分析攻擊鏈（ATT&CK）、IOC、網路特徵與逆向分析。
- **事實分離**：嚴格標籤化「已確認事實」、「研究推論」與「尚待確認」。
- **知識累積**：建立跨事件、CVE、攻擊技術之間的立體化技術關聯網絡。

---

## 核心規範文件

在進行任何新增、維護或網站調整前，請務必先閱讀以下規範：
1. **[AGENTS.md](AGENTS.md)**：AI 工作規範、查證原則、8 大必備章節與變更報告格式。
2. **[DESIGN.md](DESIGN.md)**：深色技術研究風格設計規格、調色盤、頁面結構與圖表可視化規範。

---

## 專案目錄結構

```text
Cyber-Incident-Archive/
├── AGENTS.md                          # AI 工作規範與內容管理守則
├── DESIGN.md                          # 網站設計與視覺規格書
├── README.md                          # 專案說明文件
├── index.md                           # 全域事件總索引
├── incidents/                         # 資安事件研究目錄
│   ├── 2024/                          # 依年份分類
│   │   └── YYYY-MM-DD-<event-id>/     # 單一事件完整分析 (4個標準 md 檔)
│   └── 2025/
├── techniques/                        # 攻擊技術知識庫 (ATT&CK)
├── vulnerabilities/                   # CVE 漏洞專題研究
├── research-notes/                    # 個人專題研究筆記
├── assets/                            # 圖表、截圖與附件
│   ├── images/
│   ├── diagrams/
│   └── attachments/
└── templates/                         # 標準研究模板
    ├── incident-template.md
    ├── technique-template.md
    └── vulnerability-template.md
```

---

## 啟動研究知識庫網站

本專案整合現代化深色技術研究儀表板（Vite + React + Tailwind CSS + Mermaid.js）：

```bash
# 安裝依賴
npm install

# 啟動本地知識庫工作台（自動熱更新）
npm run dev

# 建置靜態發布包
npm run build
```

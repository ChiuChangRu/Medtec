# 台灣醫療器材商情查詢

以產品類別、製程能力及市場線索探索醫療器材公開資訊的靜態網站。左側選擇主題，右側大幅顯示資料來源、搜尋與結果。

## 資料來源

| 面板 | 來源 | 用途 |
| --- | --- | --- |
| 台灣標案 | [OpenFun 政府採購公告 API](https://pcc-api.openfun.app/) 的 `/api/searchbytitle` | 依標案名稱尋找公開公告、機關與原始連結 |
| 海外廠商 | [openFDA Device 510(k) API](https://open.fda.gov/apis/device/510k/) | 依器材名稱探索申請廠商及 FDA 紀錄 |
| 歐噴資料 | [歐噴資料庫](https://data.openfun.tw/) 公開統一搜尋 API | 免登入檢索資料集及條目摘要；逐筆 API 可能需授權 |

站內沒有預載商機數字。公開公告與 FDA 紀錄僅作為初步線索；需回原始來源確認公告階段、規格、廠商身分和合作意願。

## 部署與本機預覽

儲存庫根目錄的 `index.html` 由 GitHub Actions 自動部署至 GitHub Pages。正式網址為 https://chiuchangru.github.io/Medtec/ 。本機預覽可執行 `python -m http.server 8000` 後開啟 `http://localhost:8000/`。

網站是純前端，無建置程序與伺服器端密鑰。歐噴存取權杖僅保存在使用者瀏覽器的 `sessionStorage`；分頁關閉後移除。第三方 API 的流量限制、服務狀態和瀏覽器跨來源政策可能影響查詢。

## 設計說明

以清晰的雙欄版面、較大的字體和資料卡片呈現查詢結果。


## 📌 專案介紹

這是一個服飾購物網站，使用者可以瀏覽商品、加入購物車並建立訂單。

此專案主要練習：
- 前後端資料流設計
- API 串接
- 購物車設計
- 訂單建立流程
---

## 🛠 技術棧

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Next.js API Route / Node.js
- 資料庫（MongoDB / PostgreSQL）

---

## 🧠 系統流程說明

### 1️⃣ 商品取得

- 使用 useEffect 在頁面載入時呼叫 API
- 使用 useState 管理商品資料
- 加入 loading 與 error 處理

---

### 2️⃣ 加入購物車

- 點擊加入購物車時，前端呼叫 API
- 傳送 productId、userId、quantity
- 後端將資料寫入 cart table
---

### 3️⃣ 訂單建立

- 前端呼叫 create-order API
- 後端：
  1. 建立 order
  2. 建立 order_items
  3. 刪除該使用者的購物車資料

---

## 🚧 遇到的問題

### 問題 1：購物車重複新增

目前設計為每次點擊新增一筆資料。

未來優化方向：
- 使用 (userId, productId) unique constraint
- 改為 upsert 更新 quantity
- 使用 transaction 確保資料一致性
---

### 問題 2：登入驗證安全性

目前版本將 userId 存於 localStorage。

未來優化方向：
- 改用 JWT
- 由後端解析 token 取得 userId
- 不信任前端傳來的資料
---

## 🔄 未來優化方向
- 改善 RWD 設計
- 加入庫存檢查機制
---

## 💡 專案收穫
透過這個專案，我學會：
- 如何設計完整購物流程資料流
- 前後端責任分離
- 基本資料一致性思考
# Personal Daily Planner (Cloud)

React + Vite, Firebase Auth (Google), Cloud Firestore, triển khai GitHub Pages.

## 1. Firebase
1. Tạo project trên Firebase Console, thêm Web App.
2. Authentication → Sign-in method → bật **Google**.
3. Firestore Database → tạo database (Production).
4. Tab Rules → dán nội dung `firestore.rules` → Publish.
5. Authentication → Settings → Authorized domains → thêm `localhost` và `USERNAME.github.io`.

## 2. Chạy local
```bash
cp .env.example .env     # điền 4 giá trị từ Firebase Web Config
npm install
npm run dev
```

## 3. GitHub Pages
1. Nếu tên repo khác `personal-daily-planner`, sửa `base` trong `vite.config.js` và đường dẫn favicon trong `index.html`.
2. Repo → Settings → Secrets and variables → Actions → thêm 4 secret:
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`.
3. Repo → Settings → Pages → Source: **GitHub Actions**.
4. Push lên nhánh `main`; workflow `.github/workflows/deploy.yml` tự build và deploy.

Địa chỉ: `https://USERNAME.github.io/personal-daily-planner/`

# 📅 Personal Daily Planner v2.0

> **Plan • Focus • Achieve** — Ứng dụng quản lý lịch trình và công việc cá nhân hiện đại, đồng bộ đám mây thời gian thực trên mọi thiết bị.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-10.14-FFCA28?logo=firebase&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github)

🔗 **Trải nghiệm trực tiếp (Live Demo):** [https://mt1242.github.io/personal-daily-planner/](https://mt1242.github.io/personal-daily-planner/)

---

## ✨ Giới thiệu

**Personal Daily Planner** giúp bạn tổ chức công việc hằng ngày, theo dõi tiến độ hoàn thành theo tuần/tháng và duy trì sự tập trung với giao diện trực quan, mượt mà. Dữ liệu của bạn được bảo mật theo từng tài khoản **Google** và đồng bộ tức thời qua **Cloud Firestore** kết hợp bộ nhớ đệm cục bộ (**Optimistic UI**).

![Hero Banner](./public/hero-banner.jpg)

---

## 🚀 Tính năng nổi bật

### 1. 📋 Quản lý công việc thông minh
- **Thêm, sửa, xóa và đánh dấu hoàn thành** công việc chỉ với 1 chạm.
- Phân loại chi tiết theo:
  - **Mức độ ưu tiên:** `Cao`, `Trung bình`, `Thấp` (hiển thị nhãn màu trực quan).
  - **Danh mục:** `Công việc`, `Học tập`, `Cá nhân`, `Sức khỏe`.
  - **Trạng thái:** `Chưa thực hiện`, `Đang thực hiện`, `Hoàn thành`, `Đã hủy`.
- **Kiểm tra dữ liệu tự động:** Chặn bấm lưu liên tục (anti-spam), kiểm tra `Giờ kết thúc >= Giờ bắt đầu` và cảnh báo khi tạo công việc trùng lặp trong cùng ngày/khung giờ.
- **Tìm kiếm & Lọc nhanh:** Lọc tức thì theo từ khóa tiêu đề, ghi chú hoặc danh mục ngay trên Trang chủ.

### 2. 🗓️ Lịch trình linh hoạt (Ngày / Tuần / Tháng)
- **Lịch tháng mini trên Trang chủ:** Bấm vào bất kỳ ngày nào để xem hoặc thêm lịch trình cho ngày đó ngay lập tức.
- **Trang Lịch chuyên sâu:** Chuyển đổi mượt mà giữa chế độ xem **Tháng (Month)** và **Tuần (Week)**, hiển thị chấm màu báo hiệu mức độ ưu tiên của từng công việc trong ngày.

### 3. 🌤️ Tiện ích Thời tiết thời gian thực (Live Weather)
- Tích hợp dữ liệu thời tiết trực tiếp từ **Open-Meteo API** (nhiệt độ `°C`, trạng thái thời tiết, độ ẩm `%`, tốc độ gió `km/h`).
- Hỗ trợ **Định vị GPS tự động** theo vị trí hiện tại hoặc chọn nhanh các tỉnh/thành phố (*Hà Nội, TP. Hồ Chí Minh, Thái Nguyên, Đà Nẵng, Hải Phòng, Cần Thơ, Huế, Đà Lạt*).
- Đồng bộ tức thời giữa thẻ thời tiết trên **Hero Banner** và thanh **Topbar**.

### 4. 📊 Thống kê & Phân tích hiệu suất
- **3 thẻ KPI trực quan:** Tổng công việc, Đã hoàn thành, Còn lại / Tỷ lệ hoàn thành (`%`).
- **Biểu đồ cột 7 ngày qua:** Theo dõi nhịp độ hoàn thành công việc mỗi ngày trong tuần.
- **Phân tích đa chiều:** Thanh tiến độ chi tiết theo *Danh mục*, *Trạng thái* và *Mức độ ưu tiên*.

### 5. 🎨 Giao diện hiện đại & Tối ưu đa thiết bị (Responsive)
- **Chế độ Sáng / Tối (Light / Dark Mode):** Tự động ghi nhớ tùy chọn giao diện của người dùng.
- **Đồ họa Vector SVG & Minh họa riêng biệt:** Không phụ thuộc emoji hệ điều hành, hiển thị sắc nét trên cả Windows, macOS, iOS và Android.
- **Responsive toàn diện:**
  - **Desktop & Widescreen:** Bố cục 2 cột rộng rãi, đồng bộ trục lề.
  - **Tablet & Mobile:** Tích hợp **Menu ngăn kéo trượt (Slide-out Drawer)**, **Thanh điều hướng đáy (Bottom Navigation Bar)** và cửa sổ Modal tối ưu cho Safari iOS / Chrome Android.

### 6. ☁️ Đồng bộ Đám mây & Sao lưu an toàn
- Đăng nhập một chạm với **Google Authentication**.
- Kết hợp **Cloud Firestore** và **LocalStorage Backup** giúp thao tác phản hồi tức thì (`0ms` độ trễ), hoạt động ổn định ngay cả khi mạng chập chờn.
- Hỗ trợ **Xuất file sao lưu (`.json`)**, dọn dẹp nhanh công việc đã xong hoặc xóa việc trùng lặp trong mục **Cài đặt**.

---

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ |
| :--- | :--- |
| **Frontend Framework** | React 18 (Functional Components, Custom Hooks) |
| **Build Tool & Bundler** | Vite 5 (Code-splitting tối ưu gói tải) |
| **Xác thực & Cơ sở dữ liệu** | Firebase v10 (Google Auth + Cloud Firestore) |
| **API Thời tiết & Địa lý** | Open-Meteo API + BigDataCloud Reverse Geocoding |
| **Hệ thống Icon & Đồ họa** | Lucide React + Custom Animated SVG Illustrations |
| **Styling** | Modern CSS3 (CSS Variables, Grid/Flexbox, Glassmorphism, Keyframe Animations) |
| **CI/CD & Hosting** | GitHub Actions + GitHub Pages |

---

## 📂 Cấu trúc thư mục

```text
personal-daily-planner/
├── .github/workflows/
│   └── deploy.yml              # Workflow tự động build & deploy lên GitHub Pages
├── public/
│   ├── favicon.svg             # Biểu tượng trang web
│   ├── hero-banner.jpg         # Ảnh minh họa nền Hero Banner
│   ├── login-bg.jpg            # Ảnh minh họa màn hình Đăng nhập
│   └── rocket-card.jpg         # Ảnh minh họa thẻ truyền cảm hứng ở Sidebar
├── src/
│   ├── components/
│   │   ├── Icons.jsx           # Bộ SVG đa sắc, hiệu ứng mặt trời & Skeleton Loader
│   │   ├── Sidebar.jsx         # Thanh điều hướng bên trái & Drawer trên di động
│   │   ├── TaskItem.jsx        # Thẻ hiển thị từng công việc
│   │   ├── TaskModal.jsx       # Cửa sổ thêm/sửa công việc & kiểm tra hợp lệ
│   │   └── WeatherWidget.jsx   # Tiện ích thời tiết thời gian thực & định vị GPS
│   ├── pages/
│   │   ├── Dashboard.jsx       # Trang chủ (Banner, KPI, Lịch trình, Lịch mini, Tuần)
│   │   ├── Calendar.jsx        # Trang lịch chi tiết theo Tháng / Tuần
│   │   ├── Statistics.jsx      # Trang biểu đồ thống kê hiệu suất
│   │   ├── Settings.jsx        # Trang cài đặt tài khoản, giao diện & sao lưu JSON
│   │   └── Login.jsx           # Màn hình giới thiệu & đăng nhập Google
│   ├── App.jsx                 # Khung ứng dụng chính, Topbar & điều hướng
│   ├── firebase.js             # Khởi tạo kết nối Firebase Auth & Firestore
│   ├── hooks.js                # Custom hooks (useTheme, useTasks đồng bộ kép)
│   ├── utils.js                # Các hàm xử lý ngày tháng, sắp xếp & hằng số
│   ├── styles.css              # Toàn bộ hệ thống giao diện, animation & responsive
│   └── main.jsx                # Điểm khởi chạy ứng dụng React
├── .env.example                # Mẫu cấu hình biến môi trường Firebase
├── firestore.rules             # Quy tắc bảo mật dữ liệu Cloud Firestore
├── vite.config.js              # Cấu hình Vite & phân tách gói tải (manualChunks)
└── package.json                # Khai báo thư viện và scripts
```

---

## ⚙️ Hướng dẫn cài đặt & Chạy trên máy cá nhân (Local)

### Bước 1: Cài đặt thư viện
```bash
npm install
```

### Bước 2: Cấu hình biến môi trường Firebase
Tạo file `.env` tại thư mục gốc (hoặc sao chép từ `.env.example`) và điền thông tin từ **Firebase Console → Project Settings → Your apps (Web App)**:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Bước 3: Thiết lập dịch vụ trên Firebase Console
1. **Authentication:** Vào **Authentication → Sign-in method** → Bật nhà cung cấp **Google**.
2. **Authorized Domains:** Vào **Authentication → Settings → Authorized domains** → Đảm bảo có `localhost` và tên miền GitHub Pages của bạn (ví dụ `mt1242.github.io`).
3. **Cloud Firestore:** Vào **Firestore Database** → Tạo database → Mở tab **Rules** và dán nội dung từ file `firestore.rules` rồi nhấn **Publish**:
   ```text
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

### Bước 4: Khởi chạy máy chủ phát triển
```bash
npm run dev
```
Mở trình duyệt tại địa chỉ: `http://localhost:5173/personal-daily-planner/`

---

## 🌐 Triển khai tự động lên GitHub Pages

1. Trên GitHub Repository của bạn, vào **Settings → Secrets and variables → Actions** và thêm các Repository Secrets tương ứng với file `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
2. Vào **Settings → Pages** → Mục **Source** chọn **GitHub Actions**.
3. Mỗi khi bạn `git push` lên nhánh `main`, workflow tại `.github/workflows/deploy.yml` sẽ tự động đóng gói (`npm run build`) và xuất bản lên `https://<USERNAME>.github.io/personal-daily-planner/`.

---

<p align="center">
  Được phát triển với ❤️ cho <strong>Personal Daily Planner v2.0</strong>
</p>

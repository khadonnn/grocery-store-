# 🛒 Fresh Grocery Store

Một nền tảng mua sắm thực phẩm hiện đại, gồm phần client bằng React và phần server bằng Node.js/Prisma.

Bản tiếng Anh: [README.md](README.md)

## ✨ Giới thiệu

Fresh Grocery Store là ứng dụng mua sắm thực phẩm hiện đại với giao diện người dùng phản hồi tốt trong thư mục `client/` và API backend trong thư mục `server/`. Dự án hỗ trợ xem sản phẩm, lọc danh mục, quản lý giỏ hàng, thanh toán, công cụ quản trị và luồng giao hàng.

## 🛠️ Công nghệ

### Client

- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- React Context và hooks

### Server

- Node.js + TypeScript
- Express
- Prisma ORM
- Cơ sở dữ liệu PostgreSQL
- Tích hợp Cloudinary, Nodemailer và Inngest

## ✨ Tính năng

### Tính năng cho khách hàng

- Xem sản phẩm theo danh mục
- Tìm kiếm sản phẩm theo tên
- Trang chi tiết sản phẩm
- Quản lý giỏ hàng
- Quản lý địa chỉ
- Quy trình thanh toán
- Lịch sử đơn hàng
- Giao diện responsive cho mobile, tablet và desktop

### Tính năng giao diện

- Thiết kế theo phong cách grocery hiện đại
- Lọc sản phẩm
- Khu vực Flash Deals
- Sản phẩm nổi bật
- Điều hướng danh mục
- Trạng thái loading
- Hiệu ứng chuyển động mượt

## 📸 Ảnh minh hoạ

### Login

![Login](demo/login.png)

### Homepage

![Homepage](demo/homepage.png)

### Content

![Content](demo/content.png)

### Detail

![Detail](demo/detail.png)

### Filter

![Filter](demo/filter.png)

### Dashboard

![Dashboard](demo/dashboard.png)

## 📁 Cấu trúc dự án

```text
project-root/
│
├── client/                 # Ứng dụng frontend React
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server/                 # API backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── README.md
├── README.vi.md
└── .gitignore
```

## 🚀 Cài đặt

Clone repository:

```bash
git clone <your-repository-url>
```

Di chuyển vào thư mục dự án:

```bash
cd fresh-grocery
```

Cài đặt dependencies:

```bash
npm install
```

Chạy môi trường phát triển:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Xem bản build production:

```bash
npm run preview
```

## 🎯 Mục tiêu học tập

Dự án này thể hiện:

- React fundamentals
- Tích hợp TypeScript
- Kiến trúc component
- Context API
- React Router
- Quản lý trạng thái
- Thiết kế responsive
- Phát triển UI e-commerce

## 🌟 Hướng phát triển

- Tích hợp backend API
- Xác thực người dùng
- Cổng thanh toán
- Đánh giá sản phẩm
- Danh sách yêu thích
- Theo dõi đơn hàng
- Admin dashboard
- Thông báo thời gian thực

## 📄 Giấy phép

Dự án này phục vụ mục đích học tập và nghiên cứu.

## 👨‍💻 Tác giả

Created by Kha Don

GitHub: https://github.com/your-username

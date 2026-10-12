# Inventory Management System

ระบบจัดการคลังสินค้าและการแสดงผลสินค้าตามกลุ่มราคา (Low / Mid / High) สำหรับร้านค้าและการจัดการสินค้าแบบเรียลไทม์ ผ่านแอปมือถือและเว็บด้วย Expo + React Native

## ภาพรวม

โปรเจคนี้เป็นแอปพลิเคชันสำหรับจัดการสินค้าคงคลังและจัดแสดงสินค้าในรูปแบบ Cluster โดยแบ่งตามระดับราคา เพื่อให้ผู้ใช้สามารถค้นหาและดูสินค้าได้ง่ายขึ้น พร้อมระบบล็อกอิน, สมัครสมาชิก, การเพิ่มสินค้า, การลบและแก้ไขสินค้า, ตะกร้าสินค้า, และการสั่งซื้อแบบเบื้องต้น

## ฟีเจอร์หลัก

- ระบบเข้าสู่ระบบและสมัครสมาชิก
- หน้า Dashboard / Cluster Product
- ค้นหาสินค้าและกรองตามประเภท/ระดับราคา
- แยกสินค้าเป็น 3 กลุ่ม:
  - Low
  - Mid
  - High
- เพิ่มสินค้าใหม่
- แก้ไขสินค้า
- ลบสินค้า (สำหรับผู้ใช้ Admin)
- เพิ่มสินค้าลงตะกร้า
- ยืนยันคำสั่งซื้อ
- รองรับการรันทั้งบน Web, Android และ iOS
- มี fallback login สำหรับการทดสอบแบบ offline

## เทคโนโลยีที่ใช้งาน

- Expo SDK 57
- React Native
- Expo Router
- TypeScript
- JavaScript / TypeScript

## โครงสร้างโปรเจค

```text
Inventory/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── cluster.tsx
│   ├── components/
│   │   ├── AdminProductModal.tsx
│   │   ├── CartModal.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailModal.tsx
│   │   ├── ProductFormModal.tsx
│   │   └── ProductRow.tsx
│   ├── constants/
│   │   ├── api.ts
│   │   ├── clusterStyles.ts
│   │   ├── monitors.ts
│   │   ├── products.ts
│   │   └── theme.ts
│   └── hooks/
│       ├── useAuth.ts
│       ├── useProducts.ts
│       └── use-color-scheme.ts
├── assets/
├── scripts/
├── app.json
├── package.json
├── tsconfig.json
├── LICENSE
├── README.md
├── expo-env.d.ts
└── .gitignore
```

## ข้อกำหนดก่อนเริ่มต้น

- Node.js 18+
- npm
- Git
- Expo CLI (ถ้าต้องการเริ่มแอปแบบตรง ๆ)

## การติดตั้ง

```bash
npm install
```

## การรันแอป

### 1) รันบนเว็บ

```bash
npm run web
```

### 2) รันบน Android

```bash
npm run android
```

### 3) รันบน iOS

```bash
npm run ios
```

### 4) รันโดยตรงแบบ Expo

```bash
npm start
```

## การใช้งาน

### เข้าสู่ระบบ

เปิดแอปแล้วจะเห็นหน้า Login / Register

หากยังไม่มีบัญชี ให้กดปุ่ม "สมัครสมาชิก"

### Username / Password สำหรับทดสอบแบบเร็ว

กรณีที่ Backend ไม่ตอบหรือ Offline แอปมีระบบ fallback ดังนี้

```text
Username: admin
Password: 1234
```

หรือ

```text
Username: user
Password: 1234
```

### การใช้งานภายในแอป

1. เข้าสู่ระบบเรียบร้อย
2. ดูสินค้าแบบ Cluster ตามระดับราคา
3. ใช้ Search เพื่อค้นหาสินค้า
4. เปิดรายละเอียดสินค้าเพื่อดูข้อมูลเพิ่มเติม
5. เพิ่มสินค้าลงในตะกร้า
6. ตรวจสอบยอดรวมและยืนยันคำสั่งซื้อ
7. Admin สามารถเพิ่ม แก้ไข หรือลบสินค้าได้

## API ที่ใช้

โปรเจคนี้เชื่อมต่อกับ API แบบเบื้องต้นผ่านไฟล์ `src/constants/api.ts`

```ts
export const API_BASE = 'http://119.59.102.161:3076/api/products';
export const API_LOGIN = 'http://119.59.102.161:3076/api/login';
export const API_REGISTER = 'http://119.59.102.161:3076/api/register';
```

ข้อมูลสำคัญ:

- `/api/products` สำหรับดึงข้อมูลสินค้า
- `/api/login` สำหรับเข้าสู่ระบบ
- `/api/register` สำหรับสมัครสมาชิก
- `/api/orders` สำหรับดึงข้อมูลคำสั่งซื้อ

ถ้า Backend ไม่พร้อม แอปจะทำงานแบบ mock/fallback บางฟีเจอร์เพื่อให้แอปยังใช้งานได้

## ตัวอย่างการทำงาน

### หน้า Login

- ปุ่มเปลี่ยนโหมด ระหว่าง Login และ Register
- กรอกชื่อผู้ใช้และรหัสผ่าน
- ระบบตรวจสอบก่อนเข้าสู่หน้า Cluster

### หน้า Cluster

- แสดงสินค้าทั้งหมดแบบ Card
- มีการจัดกลุ่มราคา Low / Mid / High
- มีช่องค้นหาและตัวกรองสินค้า
- สามารถกดเข้าไปดูรายละเอียดสินค้าได้

### หน้า Admin

- เพิ่มสินค้าใหม่
- ปรับราคาหรือข้อมูลสินค้า
- ลบสินค้าออกจากระบบ

## การพัฒนาเพิ่มเติม

หากต้องการรีเซ็ตโครงสร้าง Expo template ให้ใช้คำสั่ง:

```bash
npm run reset-project
```

## Git

ตรวจสอบสถานะ repo:

```bash
git status
git remote -v
```

เชื่อมต่อ GitHub:

```bash
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin master
```

## License

โปรเจคนี้เผยแพร่ภายใต้ใบอนุญาต MIT ที่อยู่ในไฟล์ `LICENSE`

## หมายเหตุ

- แอปนี้ถูกออกแบบให้ใช้งานเป็น Inventory management app
- หากต้องการให้ใช้งานจริงบน production ควรมี Backend จริงและฐานข้อมูลที่เข้มแข็ง
- สามารถพัฒนาเพิ่มเติมได้ เช่น การจัดเก็บข้อมูลแบบฐานข้อมูลจริง, ระบบJWT, การจัดการผู้ใช้งานแบบทีม, จัดการสต็อกแบบ real-time เป็นต้น

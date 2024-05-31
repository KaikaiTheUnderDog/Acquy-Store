# # RyzelStore

Tiểu luận chuyên ngành - Khóa luận tốt nghiệp

Thành viên nhóm:

- Đường Nguyễn An Khang - 20110501
- Bùi Quang Huy - 20110492
- Đoàn Văn Hiếu - 20110476

## Cài đặt thư viện backend

$ cd server
$ npm install

## Cài đặt thư viện frontend (mobile)

$ cd client/mobile
$ npm install

## Cài đặt thư viện frontend (mobile)

$ cd client/admin
$ npm install

## Cài đặt thư viện frontend (web)

$cd client/web
$npm install

## Chạy Server

npm run dev

## Chạy Client (mobile)

$cd client/mobile
$npm start

## Chạy Client (web)

$cd client/web
$npm run dev

\*\* Lưu ý trước khi chạy client với localhost cần mở Terminal để tiến hành mapping port localhost trên thiết bị debug với port localhost trên mobile

$ adb reverse tcp:8000 tcp:8000

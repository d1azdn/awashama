# AwasHama
AwasHama Website

# Applikasi Backend AwasHama

# Menggunakan Program
Untuk menggunakan program, install proyek dan lakukan.

Jalankan perintah berikut untuk menginstal semua package yang diperlukan:

```bash
npm install dependencies
npm install bcrypt
npm install body-parser
npm install dotenv
npm install express
npm install express-session
npm install mysql2
npm install passport
npm install passport-local
```

# Format Data
Berikut adalah format data USER/ADMIN yang digunakan

| Field       | Tipe                 | Keterangan |
|-------------|----------------------|------------|
| id          | int                  |            |
| Username    | Varchar (45)         |            |
| Password    | Varchar (255)        |            |
| Role        | Enum('admin','user') |            |

Berikut adalah format data ARTIKEL yang digunakan

| Field       | Tipe                 | Keterangan |
|-------------|----------------------|------------|
| id          | int                  |            |
| Judul       | Varchar (255)        |            |
| Deskripsi   | Varchar (255)        |            |
| Kategori    | Varchar (255)        |            |

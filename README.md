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

Berikut adalah format data PRODUK yang digunakan

| Field       | Tipe                 | Keterangan |
|-------------|----------------------|------------|
| id          | int                  |            |
| nama_produk | Varchar (45)         |            |
| harga       | int                  |            |
| Kategori    | int unsigned         |            |

Berikut adalah format data PROMO yang digunakan

| Field           | Tipe                    | Keterangan |
|-----------------|-------------------------|------------|
| id              | int                     |            |
| nama_promo      | Varchar (45)            |            |
| diskon          | int                     |            |
| Kategori_diskon | enum('persen','harga')  |            |

Berikut adalah format data KERANJANG yang digunakan

| Field             | Tipe                 | Keterangan |
|-------------------|----------------------|------------|
| id                | int                  |            |
| id_user           | Varchar (255)        |            |
| id_produk         | Varchar (255)        |            |
| jumlah_produk     | int                  |            |
| jenis_pengiriman  | Varchar (255)        |            |
| alamat            | text                 |            |
| metode_pembayaran | Varchar (255)        |            |
| promo             | Varchar (255)        |            |
| note_pelanggan    | text                 |            |

Berikut adalah format data CHECKOUT yang digunakan

| Field             | Tipe                                    | Keterangan |
|-------------------|-----------------------------------------|------------|
| id                | int                                     |            |
| id_user           | Varchar (255)                           |            |
| id_produk         | Varchar (255)                           |            |
| jumlah_produk     | int                                     |            |
| jenis_pengiriman  | Varchar (255)                           |            |
| alamat            | text                                    |            |
| metode_pembayaran | Varchar (255)                           |            |
| promo             | Varchar (255)                           |            |
| note_pelanggan    | text                                    |            |
| status            | enum('dikemas','dikirim','berhasil')   |            |

Berikut adalah format data PENGIRIMAN yang digunakan

| Field            | Tipe                 | Keterangan |
|------------------|----------------------|------------|
| id               | int                  |            |
| jenis_pengiriman | Varchar (45)         |            |

Berikut adalah format data PEMBAYARAN yang digunakan

| Field            | Tipe                 | Keterangan |
|------------------|----------------------|------------|
| id               | int                  |            |
| nama_pembayaran  | Varchar (255)        |            |

# Ketentuan API

# 1. CREATE (Menambahkan User/Admin dan Menambahkan Semua Data)
* **Endpoint**: /post/register ( USER )
* **Method**: POST
* **Body Request**:
  ```bash
  {
  "username": "billy",
  "password": "billy",
  "role": "user"
  }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     User berhasil ditambahkan dengan ID: 23
     ```
  ○ **Gagal**:
  
    **Tidak Ada Role**:

        ■ Error inserting data

   **Salah Input**:

       ■ Username atau password salah

**Menambahkan Admin**
* **Endpoint**: /post/register ( ADMIN )
* **Method**: POST
* **Body Request**:
  ```bash
  {
  "username": "tobi",
  "password": "tobi",
  "role": "admin"
  }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     User berhasil ditambahkan dengan ID: 23
     ```
  ○ **Gagal**:
  
    **Tidak Ada Role**:

        ■ Error inserting data

   **Salah Input**:

       ■ Username atau password salah

**Login User**
* **Endpoint**: /post/login
* **Method**: POST
* **Body Request**:
  ```bash
  {
  "username": "billy",
  "password": "billy",
  "role": "user"
  }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     Selamat datang, billy
     ```
  ○ **Gagal**:
  
    **Tidak Ada Role User**:

        ■ Error inserting data

   **Salah Input**:

       ■ Username atau password salah

**Login Admin**
* **Endpoint**: /post/login
* **Method**: POST
* **Body Request**:
  ```bash
  {
  "username": "tobi",
  "password": "tobi",
  "role": "admin"
  }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     Selamat datang di dashboard admin!
     ```
  ○ **Gagal**:
  
    **Tidak Ada Role Admin**:

        ■ Error inserting data

   **Salah Input**:

       ■ Username atau password salah

**Menambahkan Data Produk (HANYA BISA ADMIN)**
* **Endpoint**: /post/dashboard/produk ( ADMIN )
* **Method**: POST
* **Body Request**:
  ```bash
  {
  "nama_produk": "tanah",
  "harga": 50000,
  "stok": 50
  }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Produk berhasil ditambahkan",
    "id": 8
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Nama produk, harga, dan stok harus diisi!

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Pesan : Gagal Menambahkan Produk

**Menambahkan Data Artikel (HANYA BISA ADMIN)**
* **Endpoint**: /post/dashboard/artikel ( ADMIN )
* **Method**: POST
* **Body Request**:
  ```bash
  {
    "judul": "Petani adalah",
    "deskripsi": "Panduan lengkap untuk pemula",
    "kategori": "Panduan"
  }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Artikel berhasil ditambahkan",
    "id": 9
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Data

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Gagal Menambahkan Artikel

**Menambahkan Data Checkout** (User)
* **Endpoint**: /post/checkout
* **Method**: POST
* **Body Request**:
  ```bash
       {
        "id": 1,
        "id_user": "1",
        "id_produk": "1",
        "jumlah_produk": 50,
        "jenis_pengiriman": "jnt",
        "alamat": "jalan silber",
        "metode_pembayaran": "transfer",
        "promo": "11.11",
        "note_pelanggan": "dipercepat bosku",
        "status": "dikemas"
        }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Checkout berhasil ditambahkan",
    "id": 9
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Data Harus Diisi

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Gagal Menambahkan Checkout

**Menambahkan Data Checkout** (Admin)
* **Endpoint**: /post/dashboard/checkout
* **Method**: POST
* **Body Request**:
  ```bash
       {
        "id": 13,
        "id_user": "16",
        "id_produk": "14",
        "jumlah_produk": 50,
        "jenis_pengiriman": "jnt",
        "alamat": "jalan silberr",
        "metode_pembayaran": "transfer",
        "promo": "11.11",
        "note_pelanggan": "dipercepat boskuuu",
        "status": "dikemas"
    }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Checkout berhasil ditambahkan",
    "id": 9
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Data Harus Diisi

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Gagal Menambahkan Checkout


**Menambahkan Data Promo (HANYA BISA ADMIN)**
* **Endpoint**: /post/dashboard/promo ( ADMIN )
* **Method**: POST
* **Body Request**:
  ```bash
       {
        "nama_promo": "murah",
        "diskon": 80,
        "kategori_diskon": "persen"
       }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Data berhasil ditambahkan",
    "id": 14
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Data Harus Diisi

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Gagal Menambahkan Data

**Menambahkan Data Keranjang (HANYA BISA USER)**
* **Endpoint**: /post/keranjang ( USER )
* **Method**: POST
* **Body Request**:
  ```bash
       {
        "id": 1,
        "id_user": "1",
        "id_produk": "1",
        "jumlah_produk": 2,
        "jenis_pengiriman": "jnt",
        "alamat": "jl,Silaberanti GG Kelapa",
        "metode_pembayaran": "transfer",
        "promo": "23.11",
        "note_pelanggan": "tolong di percepat ya proses nya"
      }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Keranjang berhasil ditambahkan",
    "id": 6
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Data Harus Diisi

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Gagal Menambahkan Data Keranjang

**Menambahkan Data Pembayaran (HANYA BISA ADMIN)**
* **Endpoint**: /post/dashboard/pembayaran ( ADMIN )
* **Method**: POST
* **Body Request**:
  ```bash
       {
        "id": 1,
        "nama_pembayaran": "bca"
       }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Data berhasil ditambahkan",
    "id": 6
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Data Harus Diisi

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Gagal Menambahkan Data 

**Menambahkan Data Pengiriman (HANYA BISA ADMIN)**
* **Endpoint**: /post/dashboard/pengiriman ( ADMIN )
* **Method**: POST
* **Body Request**:
  ```bash
        {
        "jenis_pengiriman": "jnt"
        }
  ```
* **Response**:  
  ○ **Sukses**:
     ```bash
     {
    "message": "Pengiriman berhasil ditambahkan",
    "id": 8
     }
     ```
  ○ **Gagal**:
  
    **Salah Input**:

        ■ Status : 400  Eror
        ■ Pesan : Data Harus Diisi

   **Format Input Salah**:

       ■ Status : 500  Eror
       ■ Gagal Menambahkan Data Pengiriman

# 2. READ (Melihat Semua Data)
**Melihat Data Admin**
* **Endpoint**: /get/check-login ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Tidak Ada Data
   ○ **Ada Data**:

        ■ Ada Data:

        {
         "loggedIn": true,
         "user": {
         "id": 27,
         "username": "tobi",
         "role": "admin"
        }

**Melihat Data User**
* **Endpoint**: /get/check-login ( USER )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Tidak Ada Data
   ○ **Ada Data**:

        ■ Ada Data:

        {
         "loggedIn": true,
         "user": {
         "id": 23,
         "username": "billy",
         "role": "user"
        }

# 3. UPDATE (Melakukan Pembaruan Data)
* **Endpoint**: /dashboard/.../{id}/ (admin)
* **Method**: PUT
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

# 4. DELETE (Menghapus Data Tertentu)
* **Endpoint**: /dashbord/{id}/..../ (admin)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Berhasil Dihapus"


  

        

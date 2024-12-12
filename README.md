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

Untuk menjalankan server yang diperlukan:
```bash
node server.js
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
**Menambahkan User**
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
    "nama_produk": "drum", 
    "harga": "50", 
    "stok": "10",
    "kategori": "pupuk",
    "foto": "https://www.noecho.net/uploads/wysiwyg/backtrack-band-photo.jpg",
    "deskripsi": "uhuy",
    "berat": "500gr"
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
        ■ Pesan : Data harus diisi!

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

**Melihat Data Produk**
* **Endpoint**: /get/produk ( USER )
* **Endpoint**: /get/dashboard/produk ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Produk
   ○ **Ada Data**:

        ■ Ada Data:
      [
        {
           "id":1
           "nama_produk": "pupuk", 
           "harga": "50", 
           "stok": "10",
           "kategori": "pupuk",
           "foto": "https://www.noecho.net/uploads/wysiwyg/backtrack-band-photo.jpg",
           "deskripsi": "uhuy",
           "berat": "500gr"
        }, 

        {
          "id":3
          "nama_produk": "drum", 
          "harga": "50", 
          "stok": "10",
          "kategori": "pupuk",
          "foto": "https://www.noecho.net/uploads/wysiwyg/backtrack-band-photo.jpg",
          "deskripsi": "uhuy",
          "berat": "500gr"
        } 
      ]

**Melihat Data Produk By ID**
* **Endpoint**: /get/produk/1 ( USER )
* **Endpoint**: /get/dashboard/prduk/1 ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Produk
   ○ **Ada Data**:

        ■ Ada Data:

        {
        "id": 1,
        "nama_produk": "pupuk",
        "harga": 55,
        "stok": 100
        }

**Melihat Data Artikel**
* **Endpoint**: /get/artikel ( USER )
* **Endpoint**: /get/dashboard/artikel ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Artikel
   ○ **Ada Data**:

        ■ Ada Data:
      [
        {
        "id": 1,
        "judul": "Pilihan berkelanjutan yang kian diminati konsumen",
        "deskripsi": "Permintaan produk organik terus meningkat mendorong",
        "kategori": "berita"
        },
        {
        "id": 5,
        "judul": "uhuy",
        "deskripsi": "kiwkiw",
        "kategori": "berita"
        }
      ]

**Melihat Data Artikel By ID**
* **Endpoint**: /get/artikel/1 ( USER )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Artikel
   ○ **Ada Data**:

        ■ Ada Data:
        {
        "id": 1,
        "judul": "Pilihan berkelanjutan yang kian diminati konsumen",
        "deskripsi": "Permintaan produk organik terus meningkat mendorong",
        "kategori": "berita"
        }

**Melihat Data Checkout**
* **Endpoint**: /get/checkout ( USER )
* **Endpoint**: /get/dashboard/chechkout ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Checkout
   ○ **Ada Data**:

        ■ Ada Data:
      [
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
        },
        {
        "id": 2,
        "id_user": "3",
        "id_produk": "1",
        "jumlah_produk": 50,
        "jenis_pengiriman": "jnt",
        "alamat": "jhehehe",
        "metode_pembayaran": "blalbal",
        "promo": "11.11",
        "note_pelanggan": "kiwkiw",
        "status": "dikirim"
        }
      ]

**Melihat Data Checkout By ID**
* **Endpoint**: /get/checkout/1 ( USER )
* **Endpoint**: /get/dashboard/chechkout/1 ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Checkout
   ○ **Ada Data**:

        ■ Ada Data:
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

**Melihat Data Promo**
* **Endpoint**: /get/promo ( USER )
* **Endpoint**: /get/dashboard/promo ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Promo
   ○ **Ada Data**:

        ■ Ada Data:
      [
        {
        "id": 1,
        "nama_promo": "uhuy",
        "diskon": 50,
        "kategori_diskon": "persen"
        },
        {
        "id": 3,
        "nama_promo": "11.11",
        "diskon": 50000,
        "kategori_diskon": "persen"
        },
      ]

**Melihat Data Promo By Id**
* **Endpoint**: /get/promo/1 ( USER )
* **Endpoint**: /get/dashboard/promo/1 ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Promo
   ○ **Ada Data**:

        ■ Ada Data:
        {
        "id": 1,
        "nama_promo": "uhuy",
        "diskon": 50,
        "kategori_diskon": "persen"
        }

**Melihat Data Keranjang**
* **Endpoint**: /get/keranjang/ ( USER )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Keranjang
   ○ **Ada Data**:

        ■ Ada Data:
      [
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
        },
        {
        "id": 4,
        "id_user": "12",
        "id_produk": "2",
        "jumlah_produk": 5,
        "jenis_pengiriman": "kirim",
        "alamat": "palembang",
        "metode_pembayaran": "tranfer",
        "promo": "11.11",
        "note_pelanggan": "kiwkiw"
        },
      ]

**Melihat Data Keranjang By id**
* **Endpoint**: /get/keranjang/1 ( USER )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Keranjang
   ○ **Ada Data**:

        ■ Ada Data:
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

**Melihat Data Pembayaran**
* **Endpoint**: /get/dashboard/pembayaran/ ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Pembayaran
   ○ **Ada Data**:

        ■ Ada Data:
       [
        {
        "id": 1,
        "nama_pembayaran": "bca"
        },
        {
        "id": 3,
        "nama_pembayaran": "bri"
        },
       ]

**Melihat Data Pembayaran**
* **Endpoint**: /get/dashboard/pembayaran/1 ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Pembayaran
   ○ **Ada Data**:

        ■ Ada Data:
        {
        "id": 1,
        "nama_pembayaran": "bca"
        }

**Melihat Data Pengiriman**
* **Endpoint**: /get/dashboard/pengiriman/ ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Pngiriman
   ○ **Ada Data**:

        ■ Ada Data:
       [
        {
        "id": 1,
        "jenis_pengiriman": "jnt"
        },
        {
        "id": 3,
        "jenis_pengiriman": "jnt"
        },
       ]

**Melihat Data Pengiriman By ID**
* **Endpoint**: /get/dashboard/pengiriman/1 ( ADMIN )
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Gagal Menampilkan Data Pngiriman
   ○ **Ada Data**:

        ■ Ada Data:
        {
        "id": 1,
        "jenis_pengiriman": "jnt"
        }

# 3. UPDATE (Melakukan Pembaruan Data)
**Melakukan Pembaruan Data User**
* **Endpoint**: /dashboard/user/23/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
      {
          "username": "billy",
          "password": "billy"
      }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data User Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Admin**
* **Endpoint**: /dashboard/user/27/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
      {
          "username": "tobi",
          "password": "tobi"
      }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data User Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Produk**
* **Endpoint**: PUT/dashboard/produk/3/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
       {
        "nama_produk": "Sayur",
        "harga": 200.000,
        "stok": 100,
        "kategori": "pupuk",
        "foto": "https://www.noecho.net/uploads/wysiwyg/backtrack-band-photo.jpg",
        "deskripsi": "uhuy",
        "berat": "500gr"
       }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Produk Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Artikel**
* **Endpoint**: PUT/dashboard/artikel/5/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
      {
        "id": 5,
        "judul": "Petani",
        "deskripsi": "kiwkiw",
        "kategori": "berita"
        }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Artikel Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Checkout**
* **Endpoint**:PUT/dashboard/checkout/2/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
      {
        "id": 2,
        "id_user": "3",
        "id_produk": "1",
        "jumlah_produk": 50,
        "jenis_pengiriman": "jnt",
        "alamat": "jhehehe",
        "metode_pembayaran": "bca",
        "promo": "11.11",
        "note_pelanggan": "kiwkiw",
        "status": "dikirim"
      }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Checkout Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Promo**
* **Endpoint**:PUT/dashboard/promo/4/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
        {
        "id": 4,
        "nama_promo": "10.10",
        "diskon": 80,
        "kategori_diskon": "persen"
        }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Promo Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Keranjang**
* **Endpoint**:PUT/keranjang/4/ (USER)
* **Method**: PUT
* **Body Request**:
  ```bash
        {
        "id": 4,
        "id_user": "12",
        "id_produk": "2",
        "jumlah_produk": 5,
        "jenis_pengiriman": "kirim",
        "alamat": "palembang",
        "metode_pembayaran": "bca",
        "promo": "11.11",
        "note_pelanggan": "kiwkiw"
         }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Keranjang Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Pembayaran**
* **Endpoint**: /dashboard/pembayaran/3/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
        {
        "id": 3,
        "nama_pembayaran": "mandiri"
        }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Pembayaran Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

**Melakukan Pembaruan Data Pengiriman**
* **Endpoint**: /dashboard/pengiriman/4/ (ADMIN)
* **Method**: PUT
* **Body Request**:
  ```bash
        {
        "id": 4,
        "jenis_pengiriman": "jne"
        }
  ```
* **Response**:

  ○ **Tidak Ada Pembaruan Data**:
  
        ■ Status: 404 Not Found
        ■ Pesan : "Error updating data"

  ○ **Sukses Pembaruan Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Pengiriman Berhasil Diperbarui"

  ○ **Gagal Pembaruan Data**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

# 4. DELETE (Menghapus Data Tertentu)
**Menghapus Data User**
* **Endpoint**: /user/30 
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "User Berhasil Dihapus"

**Menghapus Data Admin**
* **Endpoint**: /user/31
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "User Berhasil Dihapus"

**Menghapus Data Produk**
* **Endpoint**: /dashboard/produk/5 (ADMIN)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Produk Berhasil Dihapus"

**Menghapus Data Artikel**
* **Endpoint**: /dashboard/artikel/5 (ADMIN)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Artikel Berhasil Dihapus"

**Menghapus Data Checkout**
* **Endpoint**: /dashboard/checkout/6 (ADMIN)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Data Checkout Berhasil Dihapus"

**Menghapus Data Promo**
* **Endpoint**: /dashboard/promo/13 (ADMIN)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Promo Dihapus"

**Menghapus Data Keranjang**
* **Endpoint**: /keranjang/7 (USER)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Promo Dihapus"

**Menghapus Data Pembayaran**
* **Endpoint**: /dashboard/pembayaran/6 (ADMIN)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Pembayaran Dihapus"

**Menghapus Data Pengiriman**
* **Endpoint**: /dashboard/pengiriman/8 (ADMIN)
* **Method**: DELETE
* **Response**:

  ○ **Data Tidak Ditemukan**:

        ■ Status: 404 Not Found
        ■ Pesan : "Data tidak ditemukan"

  ○ **Sukses Menghapus Data**:

        ■ Status: 200 OK
        ■ Pesan : "Pengiriman Dihapus"


  

        

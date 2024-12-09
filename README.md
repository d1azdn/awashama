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

# 1. CREATE (Menambahkan User / Admin Baru, Data Produk, Data Artikel, Data Data Checkout, 
# Data Promo, Data Keranjang, Data Pembayaran, Data Pengiriman)
* **Endpoint**: /post/register
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

# 2. READ (Melihat Semua Data)
* **Endpoint**: /post/all ( user)
* **Endpoint**: /post/dashboard/... (admin) 
* **Method**: GET
* **Response**:
  
   ○ **Tidak Ada Data**:
  
         ■ Status: 400 Not Found
         ■ Tidak Ada Data
   ○ **Ada Data**:

        ■ Ada Data:
        ```bash
        {
        "id": 27,
        "username": "tobi",
        "password": "$2b$10$s5IL7IvffK5Utz9ak1P7eOMAHhYnbH6rcRdef1QoGw9k2HfMkWJr.",
        "role": "admin"
        }
        ```

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


  

        

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./db');
const bodyParser = require('body-parser');
const app = express();
const produkRoutes = require('./routes/produkRoutes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', produkRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

const getPasswordByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT password FROM user WHERE username = ?';
        connection.query(query, [username], (err, results) => {
            if (err) {
                reject(err); // Jika terjadi error, kembalikan error.
            } else if (results.length === 0) {
                resolve(null); // Jika username tidak ditemukan, kembalikan null.
            } else {
                resolve(results[0].password); // Ambil password dari hasil query.
            }
        });
    });
};

//Middleware untuk memeriksa role
function checkRole(role) {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            return next(); // Lanjut ke handler berikutnya
        }
        res.status(403).send('Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.');
    };
}


//authen
passport.use(new LocalStrategy((username, password, done) => {
    // Query ke database untuk mencari username
    connection.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) return done(err); // Jika ada error dalam query

        if (results.length === 0) {
            return done(null, false, { message: 'Username tidak ditemukan.' }); // Username tidak ditemukan
        }

        const user = results[0]; // Ambil data user dari hasil query

        // Cek password menggunakan bcrypt
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);  // Jika ada error saat memeriksa password

            if (isMatch) {
                return done(null, user);  // Password cocok, login berhasil
            } else {
                return done(null, false, { message: 'Password salah.' });  // Password tidak cocok
            }
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);  // Menyimpan ID user ke session
});

passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) return done(err);
        done(null, results[0]);  // Mengambil data user berdasarkan ID dari database
    });
});

// Endpoint untuk login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

// Endpoint khusus admin
app.get('/admin', checkRole('admin'), (req, res) => {
    res.send('Selamat datang di halaman admin!');
});

// Endpoint untuk dashboard
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Selamat datang di dashboard!');
    } else {
        res.redirect('/login');
    }
});

// Endpoint untuk mengecek status login
app.get('/check-login', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ loggedIn: true, user: req.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// Endpoint untuk logout
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});
//authen end //

app.post('/register', async (req, res) => {
    const { username, password, role} = req.body;

    if (!username || !password)  {
        return res.status(400).send('Data berhasil di Tambahkan');
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const query = 'INSERT INTO user (username, password, role) VALUES (?, ?, ?)';
        connection.query(query, [username, hashedPassword, role], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Error inserting data');
                return;
            }
            res.status(201).send(`User berhasil ditambahkan dengan ID: ${result.insertId}`);
        });

    } catch (error) {   
        console.error('Error hashing password:', error);
        res.status(500).send('Error hashing password');
    }

});


// ROUTE LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Data berhasil ditambahkan');
    }

    try {
        const hashedPassword = await getPasswordByUsername(username);

        if (!hashedPassword) {
            return res.status(404).send('Username tidak ditemukan');
        }
        const check = await bcrypt.compare (password, hashedPassword)

       
        return res.send({ check }); // Return password dalam bentuk response JSON.
    } catch (error) {
        console.error('Error saat menampilkan password:', error);
        return res.status(500).send('Error saat menampilkan password');
    }
});
// ROUTE LOGIN END

// ROUTE PRODUK
app.post('/dasboard/produk', checkRole('admin'), async (req, res) => {
    let { nama_produk, harga, stok } = req.body;  
    
    // Validasi data
    if (!nama_produk || !harga || !stok) {
        return res.status(400).json({ error: 'Nama produk, harga, dan stok harus diisi!' });
    }
    
    // Simpan data ke tabel produk
    try {
        const sql = 'INSERT INTO produk (nama_produk, harga, stok) VALUES (?, ?, ?)';
        connection.query(sql, [nama_produk, harga, stok], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Gagal menambahkan produk' });
            }
            return res.status(200).json({ message: 'Produk berhasil ditambahkan', id: result.insertId });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
});

app.get('/dashboard/produk', checkRole('admin'), (req, res) => {
    const query = 'SELECT * FROM produk';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Produk:', err);
            res.status(500).send('Gagal Menampilkan Produk');
            return;
        }
        res.json(results);
    });
});

app.get('/dashboard/produk/:id', checkRole('admin'), (req, res) => {
    const query = 'SELECT * FROM produk WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Produk Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});


app.get('/produk', (req, res) => {
    const query = 'SELECT * FROM produk';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Produk:', err);
            res.status(500).send('Gagal Menampilkan Produk');
            return;
        }
        res.json(results);
    });
});

app.get('/produk/:id', (req, res) => {
    const query = 'SELECT * FROM produk WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Produk Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

app.put('/dasboard/produk/:id', checkRole('admin'), async (req, res) => {
    const { nama_produk, harga, stok } = req.body;
    const produkId = req.params.id;  // Mengambil ID dari parameter URL

    if (!nama_produk || !harga || !stok) {
        return res.status(400).send('Data harus diisi');
    }
        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE produk SET nama_produk = ?, harga = ?, stok =? WHERE id = ?';
        connection.query(query, [ nama_produk, harga, stok, produkId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Produk Tidak Ditemukan');
            }
            res.send('Data Produk berhasil diperbarui');
        });
    
});

app.delete('/dashboard/produk/:id', checkRole('admin'), (req, res) => {
    const query = 'DELETE FROM produk WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Produk:', err);
            res.status(500).send('Gagal Menghapus Produk');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Produk Tidak di Temukan');
            return;
        }
        res.send('Produk dihapus');
    });
});
// ROUTE PRODUK END


// ROUTE ARTIKEL 
app.post('/dashboard/artikel', checkRole('admin'), async (req, res) => {
    const { judul, deskripsi, kategori } = req.body;

    if (!judul || !deskripsi || !kategori) {
        return res.status(400).send('Data berhasil di Tambahkan');
    }
    const query = 'INSERT INTO artikel(judul, deskripsi, kategori) VALUES (?, ?, ?)';
    connection.query(query, [judul, deskripsi, kategori], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(201).send(`Artikel berhasil ditambahkan dengan ID: ${result.insertId}`);
    });
});

app.get('/dashboard/artikel', checkRole('admin'), (req, res) => {
    const query = 'SELECT * FROM artikel';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Artikel:', err);
            res.status(500).send('Gagal Menampilkan Artikel');
            return;
        }
        res.json(results);
    });
});

app.get('/dashboard/artikel/:id', checkRole('admin'), (req, res) => {
    const query = 'SELECT * FROM artikel WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Artikel Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

app.get('/artikel', (req, res) => {
    const query = 'SELECT * FROM artikel';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Artikel:', err);
            res.status(500).send('Gagal Menampilkan Artikel');
            return;
        }
        res.json(results);
    });
});

app.get('/artikel/:id', (req, res) => {
    const query = 'SELECT * FROM artikel WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Artikel Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

app.put('/dashboard/artikel/:id', checkRole('admin'), async (req, res) => {
    const { judul, deskripsi, kategori } = req.body;
    const artikelId = req.params.id;  // Mengambil ID dari parameter URL

    if (!judul || !deskripsi || !kategori) {
        return res.status(400).send('Artikel harus diisi');
    }
        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE artikel SET judul = ?, deskripsi = ?, kategori =? WHERE id = ?';
        connection.query(query, [judul, deskripsi, kategori, artikelId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Artikel Tidak Ditemukan');
            }
            res.send('Artikel berhasil diperbarui');
        });
    
});

app.delete('/dashboard/Artikel/:id', checkRole('admin'),(req, res) => {
    const query = 'DELETE FROM artikel WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Artikel:', err);
            res.status(500).send('Gagal Menghapus Artikel');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Artikel Tidak di Temukan');
            return;
        }
        res.send('Artikel dihapus');
    });
});
// ROUTE ARTIKEL END

// ROUTE PROMO
app.post('dashboard/promo', checkRole ('admin'), async (req, res) => {
    const { nama_promo, diskon, kategori_diskon } = req.body;

    if (!nama_promo || !diskon || !kategori_diskon) {
        return res.status(400).send('Data berhasil di Tambahkan');
    }
    const query = 'INSERT INTO promo(nama_promo, diskon, kategori_diskon) VALUES (?, ?, ?)';
    connection.query(query, [nama_promo, diskon, kategori_diskon], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(201).send(`Promo berhasil ditambahkan dengan ID: ${result.insertId}`);
    });
});

app.get('/dashboard/promo', checkRole ('admin'), (req, res) => {
    const query = 'SELECT * FROM promo';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            res.status(500).send('Gagal Menampilkan Data');
            return;
        }
        res.json(results);
    });
});

app.get('/dashboard/promo/:id', checkRole ('admin'), (req, res) => {
    const query = 'SELECT * FROM promo WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Data Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

app.get('/promo', (req, res) => {
    const query = 'SELECT * FROM promo';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            res.status(500).send('Gagal Menampilkan Data');
            return;
        }
        res.json(results);
    });
});

app.get('/promo/:id', (req, res) => {
    const query = 'SELECT * FROM promo WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Data Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

app.put('/dashboard/promo/:id', checkRole ('admin'), async (req, res) => {
    const { nama_promo, diskon, kategori_diskon } = req.body;
    const promoId = req.params.id;  // Mengambil ID dari parameter URL

    if (!nama_promo || !diskon || !kategori_diskon) {
        return res.status(400).send('Data harus diisi');
    }
        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE promo SET nama_promo = ?, diskon = ?, kategori_diskon =? WHERE id = ?';
        connection.query(query, [nama_promo, diskon, kategori_diskon, promoId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Promo Tidak Ditemukan');
            }
            res.send('Data Promo berhasil diperbarui');
        });
    
});

app.delete('/dashboard/promo/:id', checkRole ('admin'), (req, res) => {
    const query = 'DELETE FROM promo WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Promo:', err);
            res.status(500).send('Gagal Menghapus Promo');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Promo Tidak di Temukan');
            return;
        }
        res.send('Promo dihapus');
    });
});

// ROUTE PROMO END

// ROUTE CHECKOUT
app.post('/dashboard/checkout', checkRole('admin'), async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status } = req.body;

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran || !promo || !note_pelanggan || !status) {
        return res.status(400).send('Data berhasil di Tambahkan');
    }
    const query = 'INSERT INTO checkout(id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(201).send(`Checkout berhasil ditambahkan dengan ID: ${result.insertId}`);
    });
});

// (method checkout untuk user )
app.post('/checkout', async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status } = req.body;

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran || !promo || note_pelanggan || !status) {
        return res.status(400).send('Data berhasil di Tambahkan');
    }
    const query = 'INSERT INTO checkout(id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(201).send(`Checkout berhasil ditambahkan dengan ID: ${result.insertId}`);
    });
});

app.get('/checkout', (req, res) => {
    const query = 'SELECT * FROM checkout';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            res.status(500).send('Gagal Menampilkan Data');
            return;
        }
        res.json(results);
    });
});

app.get('/checkout/:id', (req, res) => {
    const query = 'SELECT * FROM checkout WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Data Checkout Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});
// (method checkout untuk user END )

app.get('/dashboard/checkout', checkRole ('admin'), (req, res) => {
    const query = 'SELECT * FROM checkout';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            res.status(500).send('Gagal Menampilkan Data');
            return;
        }
        res.json(results);
    });
});

app.get('/dashboard/checkout/:id', checkRole ('admin'), (req, res) => {
    const query = 'SELECT * FROM checkout WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Data Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

app.put('/dashboard/checkout/:id', checkRole ('admin'), async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status } = req.body;
    const checkoutId = req.params.id;  // Mengambil ID dari parameter URL

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran || !promo || !note_pelanggan || !status) {
        return res.status(400).send('Data harus diisi');
    }
        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE checkout SET id_user = ?, id_produk = ?, jumlah_produk =?, jenis_pengiriman =?, alamat =?, metode_pembayaran =?, promo=?, note_pelanggan=?, status =? WHERE id = ?';
        connection.query(query, [id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status, checkoutId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Checkout Tidak Ditemukan');
            }
            res.send('Data Checkout berhasil diperbarui');
        });
    
});

app.delete('/dashboard/checkout/:id', checkRole ('admin'), (req, res) => {
    const query = 'DELETE FROM checkout WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Data Checkout:', err);
            res.status(500).send('Gagal Menghapus Data Checkout');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Checkout Tidak di Temukan');
            return;
        }
        res.send('Data Checkout dihapus');
    });
});
// ROUTE CHEECKOUT END

app.post('/keranjang', async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan } = req.body;

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran || !promo || !note_pelanggan) {
        return res.status(400).send('Keranjang berhasil di Tambahkan');
    }
    const query = 'INSERT INTO keranjang( id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [ id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(201).send(`Keranjang berhasil ditambahkan dengan ID: ${result.insertId}`);
    });
});

app.post('/pengiriman', async (req, res) => {
    const { jenis_pengiriman } = req.body;

    if (!jenis_pengiriman) {
        return res.status(400).send('Data berhasil di Tambahkan');
    }
    const query = 'INSERT INTO pengiriman(jenis_pengiriman) VALUES (?)';
    connection.query(query, [jenis_pengiriman], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(201).send(`Data berhasil ditambahkan dengan ID: ${result.insertId}`);
    });
});

app.post('/pembayaran', async (req, res) => {
    const { nama_pembayaran } = req.body;

    if (!nama_pembayaran) {
        return res.status(400).send('Data pembayaran di Tambahkan');
    }
    const query = 'INSERT INTO pembayaran(nama_pembayaran) VALUES (?)';
    connection.query(query, [nama_pembayaran], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(201).send(`Data Pembayaran berhasil ditambahkan dengan ID: ${result.insertId}`);
    });
});


// ROUTE GET
app.get('/user', (req, res) => {
    const query = 'SELECT * FROM user';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            res.status(500).send('Gagal Menampilkan Data');
            return;
        }
        res.json(results);
    });
});

app.get('/user/:id', (req, res) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.json(result[0]);
    });
});








app.get('/keranjang', (req, res) => {
    const query = 'SELECT * FROM keranjang';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data Keranjang:', err);
            res.status(500).send('Gagal Menampilkan Data Keranjang');
            return;
        }
        res.json(results);
    });
});

app.get('/keranjang/:id', (req, res) => {
    const query = 'SELECT * FROM keranjang WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Keranjang Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});


app.get('/pengiriman', (req, res) => {
    const query = 'SELECT * FROM pengiriman';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data Pengiriman:', err);
            res.status(500).send('Gagal Menampilkan Data Pengiriman');
            return;
        }
        res.json(results);
    });
});

app.get('/pengiriman/:id', (req, res) => {
    const query = 'SELECT * FROM pengiriman WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Data Pengiriman Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

app.get('/pembayaran', (req, res) => {
    const query = 'SELECT * FROM pembayaran';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data Pembayaran:', err);
            res.status(500).send('Gagal Menampilkan Data Pembayaran');
            return;
        }
        res.json(results);
    });
});

app.get('/pembayaran/:id', (req, res) => {
    const query = 'SELECT * FROM pembayaran WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Data Pembayaran Tidak Ditemukan');
            return;
        }
        res.json(result[0]);
    });
});

// ROUTE PUT 
app.put('/user/:id', async (req, res) => {
    const { username, password } = req.body;
    const userId = req.params.id;  // Mengambil ID dari parameter URL

    if (!username || !password) {
        return res.status(400).send('Username dan password harus diisi');
    }
    
    try {
        // Hash password baru sebelum update
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE user SET username = ?, password = ? WHERE id = ?';
        connection.query(query, [username, hashedPassword, userId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('User Tidak Ditemukan');
            }
            res.send('User berhasil diperbarui');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Error hashing password');
    }
});




app.put('/keranjang/:id', async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan } = req.body;
    const keranjangId = req.params.id;  // Mengambil ID dari parameter URL

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran || !promo || !note_pelanggan) {
        return res.status(400).send('Data keranjang harus diisi');
    }
        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE keranjang SET id_user = ?, id_produk = ?, jumlah_produk =?, jenis_pengiriman =?, alamat =?, metode_pembayaran =?, promo =?, note_pelanggan =? WHERE id = ?';
        connection.query(query, [ id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, keranjangId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Keranjang Tidak Ditemukan');
            }
            res.send('Data Keranjang berhasil diperbarui');
        });
    
});

app.put('/pengiriman/:id', async (req, res) => {
    const { jenis_pengiriman } = req.body;
    const pengirimanId = req.params.id;  // Mengambil ID dari parameter URL

    if (!jenis_pengiriman) {
        return res.status(400).send('Data harus diisi');
    }
        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE pengiriman SET jenis_pengiriman = ? WHERE id = ?';
        connection.query(query, [ jenis_pengiriman, pengirimanId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Pengiriman Tidak Ditemukan');
            }
            res.send('Data Pengiriman berhasil diperbarui');
        });
    
});

app.put('/pembayaran/:id', async (req, res) => {
    const { nama_pembayaran } = req.body;
    const pembayaranId = req.params.id;  // Mengambil ID dari parameter URL

    if (!nama_pembayaran) {
        return res.status(400).send('Data harus diisi');
    }
        // Query untuk mengupdate data user berdasarkan ID
        const query = 'UPDATE pembayaran SET nama_pembayaran = ? WHERE id = ?';
        connection.query(query, [ nama_pembayaran, pembayaranId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Pembayaran Tidak Ditemukan');
            }
            res.send('Data Pembayaran berhasil diperbarui');
        });
    
});



// ROUTE DELETE
app.delete('/user/:id', (req, res) => {
    const query = 'DELETE FROM user WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Data:', err);
            res.status(500).send('Gagal Menghapus Data');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('User Tidak di Temukan');
            return;
        }
        res.send('User dihapus');
    });
});



app.delete('/produk/:id', (req, res) => {
    const query = 'DELETE FROM produk WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Produk:', err);
            res.status(500).send('Gagal Menghapus Produk');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Produk Tidak di Temukan');
            return;
        }
        res.send('Produk dihapus');
    });
});

app.delete('/promo/:id', (req, res) => {
    const query = 'DELETE FROM promo WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Promo:', err);
            res.status(500).send('Gagal Menghapus Promo');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Promo Tidak di Temukan');
            return;
        }
        res.send('Promo dihapus');
    });
});

app.delete('/keranjang/:id', (req, res) => {
    const query = 'DELETE FROM keranjang WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Keranjang:', err);
            res.status(500).send('Gagal Menghapus Keranjang');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Keranjang Tidak di Temukan');
            return;
        }
        res.send('Keranjang Berhasil dihapus');
    });
});

app.delete('/pengiriman/:id', (req, res) => {
    const query = 'DELETE FROM pengiriman WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Data Pengiriman:', err);
            res.status(500).send('Gagal Menghapus Pengiriman');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Pengiriman Tidak di Temukan');
            return;
        }
        res.send('Pengiriman Berhasil dihapus');
    });
});

app.delete('/pembayaran/:id', (req, res) => {
    const query = 'DELETE FROM pembayaran WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Data Pembayaran:', err);
            res.status(500).send('Gagal Menghapus Pembayaran');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('id Pembayaran Tidak di Temukan');
            return;
        }
        res.send('Pembayaran Berhasil dihapus');
    });
});
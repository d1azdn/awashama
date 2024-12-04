const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 

// POST (USER)
const addKeranjang = async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan } = req.body;

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran || !promo || !note_pelanggan) {
        return res.status(400).json({ error: 'Data harus diisi!' });
    }

    const sql = 'INSERT INTO keranjang(id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal menambahkan Data Keranjang' });
        }
        res.status(200).json({ message: 'Keranjang berhasil ditambahkan', id: result.insertId });
    });
};


// GET (USER)
const getKeranjangUser = async (req, res) => {
    const query = 'SELECT * FROM keranjang';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Keranjang:', err);
            return res.status(500).send('Gagal Menampilkan Keranjang');
        }
        res.json(results);
    });
};

// GET by id (USER)
const getKeranjangByIdUser = async (req, res) => {
    const query = 'SELECT * FROM keranjang WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Keranjang Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// PUT (USER)
const putKeranjang = async (req, res) => {
    const {id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan,} = req.body;
    const keranjangId = req.params.id;

    // Validasi Data
    if (!keranjangId) {
        return res.status(400).send('Id Keranjang harus disediakan');
    }

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran) {
        return res.status(400).send('Data wajib belum diisi');
    }

    const query = 'UPDATE keranjang SET id_user = ?, id_produk = ?, jumlah_produk = ?, jenis_pengiriman = ?, alamat = ?, metode_pembayaran = ?, promo = ?, note_pelanggan = ? WHERE id = ?';

    connection.query(query,[id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, keranjangId],
        (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).send('Error updating data');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Id Keranjang tidak ditemukan');
            }
            res.send('Data Keranjang berhasil diperbarui');
        }
    );
};


// DELETE (USER)
const deleteKeranjang = async (req, res) => {
    const query = 'DELETE FROM keranjang WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Keranjang:', err);
            return res.status(500).send('Gagal Menghapus Keranjang');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Keranjang Tidak Ditemukan');
        }
        res.send('Keranjang dihapus');
    });
};

module.exports = { addKeranjang, getKeranjangUser,  getKeranjangByIdUser, putKeranjang, deleteKeranjang }
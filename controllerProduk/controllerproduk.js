const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 

// Tambahkan produk
const addProduk = async (req, res) => {
    const { nama_produk, harga, stok, kategori, foto, deskripsi, berat } = req.body;

    if (!nama_produk || !harga || !stok || !kategori || !foto || !deskripsi || !berat) {
        return res.status(400).json({ error: 'Data harus diisi!' });
    }

    const sql = 'INSERT INTO produk (nama_produk, harga, stok, kategori, foto, deskripsi, berat) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nama_produk, harga, stok, kategori, foto, deskripsi, berat], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal menambahkan produk' });
        }
        res.status(200).json({ message: 'Produk berhasil ditambahkan', id: result.insertId });
    });
};

// Dapatkan semua produk (admin)
const getProduk = async (req, res) => {
    const query = 'SELECT * FROM produk';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Produk:', err);
            return res.status(500).send('Gagal Menampilkan Produk');
        }
        res.json(results);
    });
};

// Dapatkan produk berdasarkan ID (admin)
const getProdukById = async (req, res) => {
    const query = 'SELECT * FROM produk WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Produk Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// Dapatkan semua produk (user)
const getProdukUser = async (req, res) => {
    const query = 'SELECT * FROM produk';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Produk:', err);
            return res.status(500).send('Gagal Menampilkan Produk');
        }
        res.json(results);
    });
};

// Dapatkan produk berdasarkan ID (user)
const getProdukByIdUser = async (req, res) => {
    const query = 'SELECT * FROM produk WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Produk Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// Update produk
const putProduk = async (req, res) => {
    const { nama_produk, harga, stok, kategori, foto, deskripsi, berat } = req.body;
    const produkId = req.params.id;

    if (!nama_produk || !harga || !stok) {
        return res.status(400).send('Data harus diisi');
    }

    const query = 'UPDATE produk SET nama_produk = ?, harga = ?, stok = ?, kategori = ?, foto = ?, deskripsi = ?, berat = ? WHERE id = ?';
    connection.query(query, [nama_produk, harga, stok, kategori, foto, deskripsi, berat, produkId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Produk Tidak Ditemukan');
        }
        res.send('Data Produk berhasil diperbarui');
    });
};

// Hapus produk
const deleteProduk = async (req, res) => {
    const query = 'DELETE FROM produk WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Produk:', err);
            return res.status(500).send('Gagal Menghapus Produk');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Produk Tidak Ditemukan');
        }
        res.send('Produk dihapus');
    });
};

module.exports = {addProduk , getProduk, getProdukById, getProdukUser, getProdukByIdUser, putProduk, deleteProduk};

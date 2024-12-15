const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 

// POST (ADMIN)
const addCheckout = async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status } = req.body;

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman) {
        console.log(req.body)
        return res.status(400).json({ error: 'Data Harus Diisi' });
    }

    const sql = 'INSERT INTO checkout(id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal Checkout' });
        }
        res.status(200).json({ message: 'Checkout berhasil Ditambahkan dengan', id: result.insertId });
    });
};

// POST (ADMIN)
const addCheckoutUser = async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status } = req.body;

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman) {
        console.log(req.body)
        return res.status(400).json({ error: 'Data Harus Diisi' });
    }

    const sql = 'INSERT INTO checkout(id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal Checkout' });
        }
        res.status(200).json({ message: 'Checkout berhasil Ditambahkan dengan', id: result.insertId });
    });
};

//GET (ADMIN)
const getCheckout = async (req, res) => {
    const query = 'SELECT * FROM checkout';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data Checkout:', err);
            return res.status(500).send('Gagal Menampilkan Data Checkout');
        }
        res.json(results);
    });
};

//GET by id (ADMIN)
const getCheckoutById = async (req, res) => {
    const query = 'SELECT * FROM checkout WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Data Checkout Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// GET (USER)
const getCheckoutUser = async (req, res) => {
    const query = 'SELECT * FROM checkout';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data Checkout:', err);
            return res.status(500).send('Gagal Menampilkan Data Checkout');
        }
        res.json(results);
    });
};

// GET by id (USER)
const getCheckoutByIdUser = async (req, res) => {
    const query = 'SELECT * FROM checkout WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Data Checkout Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// PUT (ADMIN)
const putCheckout = async (req, res) => {
    const { id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status } = req.body;
    const checkoutId = req.params.id;

    if (!id_user || !id_produk || !jumlah_produk || !jenis_pengiriman || !alamat || !metode_pembayaran || !promo || !note_pelanggan || !status) {
        return res.status(400).send('Data harus diisi');
    }

    const query = 'UPDATE checkout SET id_user = ?, id_produk = ?, jumlah_produk =?, jenis_pengiriman =?, alamat =?, metode_pembayaran =?, promo=?, note_pelanggan=?, status =? WHERE id = ?';
    connection.query(query, [id_user, id_produk, jumlah_produk, jenis_pengiriman, alamat, metode_pembayaran, promo, note_pelanggan, status, checkoutId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Checkout Tidak Ditemukan');
        }
        res.send('Data Checkout berhasil diperbarui');
    });
};

// DELETE (ADMIN)
const deleteCheckout = async (req, res) => {
    const query = 'DELETE FROM checkout WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Data Checkout:', err);
            return res.status(500).send('Gagal Menghapus Data Checkout');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Checkout Tidak Ditemukan');
        }
        res.send('Data Checkout berhasil dihapus');
    });
};

module.exports = { addCheckout, addCheckoutUser, getCheckout, getCheckoutById, getCheckoutUser, getCheckoutByIdUser, putCheckout, deleteCheckout };
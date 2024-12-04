const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 

// POST (ADMIN)
const addPromo = async (req, res) => {
    const { nama_promo, diskon, kategori_diskon } = req.body;
    if (!nama_promo || !diskon || !kategori_diskon) {
        return res.status(400).json({ error: 'Data harus diisi!' });
    }

    const sql = 'INSERT INTO promo (nama_promo, diskon, kategori_diskon) VALUES (?, ?, ?)';
    connection.query(sql, [nama_promo, diskon, kategori_diskon], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal menambahkan Data' });
        }
        res.status(200).json({ message: 'Data berhasil ditambahkan', id: result.insertId });
    });
};

//GET (ADMIN)
const getPromo = async (req, res) => {
    const query = 'SELECT * FROM promo';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            return res.status(500).send('Gagal Menampilkan Data');
        }
        res.json(results);
    });
};

//GET by id (ADMIN)
const getPromoById = async (req, res) => {
    const query = 'SELECT * FROM promo WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Promo Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// GET (USER)
const getPromoUser = async (req, res) => {
    const query = 'SELECT * FROM promo';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Promo:', err);
            return res.status(500).send('Gagal Menampilkan Promo');
        }
        res.json(results);
    });
};

// GET by id (USER)
const getPromoByIdUser = async (req, res) => {
    const query = 'SELECT * FROM promo WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('promo Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// PUT (ADMIN)
const putPromo = async (req, res) => {
    const { nama_promo, diskon, kategori_diskon} = req.body;
    const promoId = req.params.id;

    if (!nama_promo || !diskon|| !kategori_diskon) {
        return res.status(400).send('Data harus diisi');
    }

    const query = 'UPDATE promo SET nama_promo = ?, diskon = ?, kategori_diskon =? WHERE id = ?';
    connection.query(query, [nama_promo, diskon, kategori_diskon, promoId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Promo Tidak Ditemukan');
        }
        res.send('Data Promo berhasil diperbarui');
    });
};

// DELETE (ADMIN)
const deletePromo = async (req, res) => {
    const query = 'DELETE FROM promo WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Promo:', err);
            return res.status(500).send('Gagal Menghapus Promo');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Promo Tidak Ditemukan');
        }
        res.send('Promo dihapus');
    });
};

module.exports = { addPromo,  getPromo, getPromoById, getPromoUser,  getPromoByIdUser, putPromo, deletePromo }
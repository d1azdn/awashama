const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 


// POST (admin)
const addPengiriman = async (req, res) => {
    const { jenis_pengiriman  } = req.body;

    if (!jenis_pengiriman) {
        return res.status(400).json({ error: 'Data harus diisi!' });
    }

    const sql = 'INSERT INTO pengiriman(jenis_pengiriman) VALUES (?)';
    connection.query(sql, [jenis_pengiriman], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal menambahkan Data Pengiriman' });
        }
        res.status(200).json({ message: 'Pengiriman berhasil ditambahkan', id: result.insertId });
    });
};

//GET (ADMIN)
const getPengiriman = async (req, res) => {
    const query = 'SELECT * FROM pengiriman';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            return res.status(500).send('Gagal Menampilkan Data');
        }
        res.json(results);
    });
};

//GET by id (ADMIN)
const getPengirimanById = async (req, res) => {
    const query = 'SELECT * FROM pengiriman WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Pengiriman Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// PUT (ADMIN)
const putPengiriman = async (req, res) => {
    const {jenis_pengiriman} = req.body;
    const pengirimanId = req.params.id;

    if (!jenis_pengiriman) {
        return res.status(400).send('Data harus diisi');
    }

    const query = 'UPDATE pengiriman SET jenis_pengiriman = ? WHERE id = ?';
    connection.query(query, [jenis_pengiriman, pengirimanId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Pengiriman Tidak Ditemukan');
        }
        res.send('Data Pengiriman berhasil diperbarui');
    });
};

// DELETE (ADMIN)
const deletePengiriman = async (req, res) => {
    const query = 'DELETE FROM pengiriman WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Pengiriman:', err);
            return res.status(500).send('Gagal Menghapus Pengiriman');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Pengiriman Tidak Ditemukan');
        }
        res.send('Pengiriman dihapus');
    });
};

module.exports = { addPengiriman, getPengiriman, getPengirimanById, putPengiriman, deletePengiriman }
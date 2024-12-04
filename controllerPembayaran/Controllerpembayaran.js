const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 

// POST (ADMIN)
const addPembayaran = async (req, res) => {
    const { nama_pembayaran } = req.body;

    if (!nama_pembayaran) {
        return res.status(400).json({ error: 'Data harus diisi!' });
    }

    const sql = 'INSERT INTO pembayaran(nama_pembayaran) VALUES (?)';
    connection.query(sql, [nama_pembayaran], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal menambahkan Data' });
        }
        res.status(200).json({ message: 'Data berhasil ditambahkan', id: result.insertId });
    });
};

//GET (ADMIN)
const getPembayaran = async (req, res) => {
    const query = 'SELECT * FROM pembayaran';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            return res.status(500).send('Gagal Menampilkan Data');
        }
        res.json(results);
    });
};

//GET by id (ADMIN)
const getPembayaranById = async (req, res) => {
    const query = 'SELECT * FROM pembayaran WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Pembayaran Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};


// PUT (ADMIN)
const putPembayaran = async (req, res) => {
    const { nama_pembayaran} = req.body;
    const pembayaranId = req.params.id;

    if (!nama_pembayaran) {
        return res.status(400).send('Data harus diisi');
    }

    const query = 'UPDATE pembayaran SET nama_pembayaran = ? WHERE id = ?';
    connection.query(query, [nama_pembayaran, pembayaranId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Pembayaran Tidak Ditemukan');
        }
        res.send('Data Pembayaran berhasil diperbarui');
    });
};

// DELETE (ADMIN)
const deletePembayaran = async (req, res) => {
    const query = 'DELETE FROM pembayaran WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Pembayaran:', err);
            return res.status(500).send('Gagal Menghapus Pembayaran');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Pembayaran Tidak Ditemukan');
        }
        res.send('Pembayaran dihapus');
    });
};

module.exports = { addPembayaran,  getPembayaran, getPembayaranById, putPembayaran, deletePembayaran }
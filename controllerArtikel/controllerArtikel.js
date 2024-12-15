const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 

// POST (ADMIN)
const addArtikel = async (req, res) => {
    const { judul, deskripsi, kategori, foto, tempat, sumber } = req.body;

    if (!judul || !deskripsi || !kategori || !foto || !tempat || !sumber) {
        console.log(req.body)
        return res.status(400).json({ error: 'Data' });
    }

    const sql = 'INSERT INTO artikel(judul, deskripsi, kategori, foto, tempat, sumber) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [judul, deskripsi, kategori, foto, tempat, sumber], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal menambahkan Artikel' });
        }
        res.status(200).json({ message: 'Artikel berhasil ditambahkan', id: result.insertId });
    });
};

//GET (ADMIN)
const getArtikel = async (req, res) => {
    const query = 'SELECT * FROM artikel';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Artikel:', err);
            return res.status(500).send('Gagal Menampilkan Artikel');
        }
        res.json(results);
    });
};

//GET by id (ADMIN)
const getArtikelById = async (req, res) => {
    const query = 'SELECT * FROM artikel WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('Artikel Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

// GET (USER)
// const getArtikelUser = async (req, res) => {
//     const query = 'SELECT * FROM artikel';
//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error('Gagal Menampilkan Artikel:', err);
//             return res.status(500).send('Gagal Menampilkan Artikel');
//         }
//         res.json(results);
//     });
// };

// GET by id (USER)
// const getArtikelByIdUser = async (req, res) => {
//     const query = 'SELECT * FROM artikel WHERE id = ?';
//     connection.query(query, [req.params.id], (err, result) => {
//         if (err) {
//             console.error('Error fetching data:', err);
//             return res.status(500).send('Error fetching data');
//         }
//         if (result.length === 0) {
//             return res.status(404).send('artikel Tidak Ditemukan');
//         }
//         res.json(result[0]);
//     });
// };

// PUT (ADMIN)
const putArtikel = async (req, res) => {
    const {  judul, deskripsi, kategori, foto, tempat, sumber} = req.body;
    const artikelId = req.params.id;

    if (!judul || !deskripsi || !kategori || !foto || !tempat || !sumber) {
        return res.status(400).send('Data harus diisi');
    }
  
    const query = 'UPDATE artikel SET judul = ?, deskripsi = ?, kategori =?, foto = ?, tempat = ?, sumber = ? WHERE id = ?';
    connection.query(query, [ judul, deskripsi, kategori, foto, tempat, sumber, artikelId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Artikel Tidak Ditemukan');
        }
        res.send('Data Artikel berhasil diperbarui');
    });
};

// DELETE (ADMIN)
const deleteArtikel = async (req, res) => {
    const query = 'DELETE FROM artikel WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Artikel:', err);
            return res.status(500).send('Gagal Menghapus Artikel');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id Artikel Tidak Ditemukan');
        }
        res.send('Artikel dihapus');
    });
};

module.exports = { addArtikel,  getArtikel, getArtikelById, putArtikel, deleteArtikel };
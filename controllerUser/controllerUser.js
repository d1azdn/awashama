const express = require('express');
const router = express.Router();
const connection = require('../db');
const { checkRole } = require('../middlewares/authMiddleware'); 

const getUser = async (req, res) => {
    const query = 'SELECT * FROM user';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Gagal Menampilkan Data:', err);
            return res.status(500).send('Gagal Menampilkan Data');
        }
        res.json(results);
    });
};

const getUserById = async (req, res) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length === 0) {
            return res.status(404).send('User Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

const putUser = async (req, res) => {
    const { username, password} = req.body;
    const userId = req.params.id;

    if (!username || !password) {
        return res.status(400).send('Data harus diisi');
    }

    const query = 'UPDATE user SET username = ?, password = ? WHERE id = ?';
    connection.query(query, [username, password, userId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id User Tidak Ditemukan');
        }
        res.send('Data User berhasil diperbarui');
    });
};

const deleteUser = async (req, res) => {
    const query = 'DELETE FROM user WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Gagal Menghapus Promo:', err);
            return res.status(500).send('Gagal Menghapus Promo');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Id User Tidak Ditemukan');
        }
        res.send('User dihapus');
    });
};


module.exports = { getUser, getUserById, putUser, deleteUser }
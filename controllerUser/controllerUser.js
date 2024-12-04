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
            return res.status(404).send('Promo Tidak Ditemukan');
        }
        res.json(result[0]);
    });
};

module.exports = { getUser, getUserById }
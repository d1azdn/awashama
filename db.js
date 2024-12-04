const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alif200204',
    database: 'awashama_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Gagal Menghubungkan ke database:', err);
        return;
    }
    console.log('Berhasil Terhubung ke database.');
});

module.exports = connection; 

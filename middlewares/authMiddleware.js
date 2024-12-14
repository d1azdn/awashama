const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../db');


// Middleware untuk memeriksa role
function checkRole(role) {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            if(req.user.role === role){
                return next(); // Lanjut ke handler berikutnya
            }
            res.status(403).send('Anda tidak memiliki akses');
        } else {
            res.status(400).send('Anda belum login.');
        }
    };
};

// const getPasswordByUsername = (username) => {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT password FROM user WHERE username = ?';
//         connection.query(query, [username], (err, results) => {
//             if (err) {
//                 reject(err); // Jika terjadi error, kembalikan error.
//             } else if (results.length === 0) {
//                 resolve(null); // Jika username tidak ditemukan, kembalikan null.
//             } else {
//                 resolve(results[0].password); // Ambil password dari hasil query.
//             }
//         });
//     });
// };

//authen
passport.use(new LocalStrategy((username, password, done) => {
    // Query ke database untuk mencari username
    connection.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) return done(err); // Jika ada error dalam query

        if (results.length === 0) {
            return done(null, false, { message: 'Username tidak ditemukan.' }); // Username tidak ditemukan
        }

        const user = results[0]; // Ambil data user dari hasil query

        // Cek password menggunakan bcrypt
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);  // Jika ada error saat memeriksa password

            if (isMatch) {
                return done(null, user);  // Password cocok, login berhasil
            } else {
                return done(null, false, { message: 'Password salah.' });  // Password tidak cocok
            }
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);  // Menyimpan ID user ke session
});

passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) return done(err);
        done(null, results[0]);  // Mengambil data user berdasarkan ID dari database
    });
});

//Endpoint untuk login
// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

// // Endpoint khusus admin
// app.get('/admin', checkRole('admin'), (req, res) => {
//     res.send('Selamat datang di halaman admin!');
// });

// // Endpoint untuk dashboard
// app.get('/dashboard', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.send('Selamat datang di dashboard!');
//     } else {
//         res.redirect('/login');
//     }
// });

// // Endpoint untuk mengecek status login
// app.get('/check-login', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.json({ loggedIn: true, user: req.user });
//     } else {
//         res.json({ loggedIn: false });
//     }
// });

// // Endpoint untuk logout
// app.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) return next(err);
//         res.redirect('/');
//     });
// });
//authen end //

// ROUTE LOGIN
const login = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send('Username atau password salah');
        }

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            // Periksa role user untuk menentukan redirect
            if (user.role === 'admin') {
                return res.redirect('/dashboard'); // Redirect ke halaman admin
            } else if (user.role === 'user') {
                return res.redirect('/'); // Redirect ke halaman user
            } else {
                return res.status(403).send('Role tidak dikenali');
            }
        });
    })(req, res, next);
};
// ROUTE LOGIN END

//
const register = async (req, res) => {
    const { username, password, role} = req.body;

    if (!username || !password)  {
        return res.status(400).send('Data berhasil di Tambahkan');
    }
    
    console.log(username, password,role)
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = 'INSERT INTO user (username, password, role) VALUES (?, ?, ?)';
        connection.query(query, [username, hashedPassword, role], (err, result) => {
            if (err.code == "ER_DUP_ENTRY") {
                console.log(err)
                res.status(400).send('Username already registered.');
                return;
            }
            else {
                res.status(500).send('Error inserting data');
            }
            res.status(201).send(`User berhasil ditambahkan dengan ID: ${result.insertId}`);
        });

    } catch (error) {   
        console.error('Error hashing password:', error);
        res.status(500).send('Error hashing password');
    }

};

// const checkLogin = (req, res) => {
//     if (req.isAuthenticated()) {
//         return res.json({
//             loggedIn: true,
//             user: {
//                 id: req.user.id,
//                 username: req.user.username,
//                 role: req.user.role,
//             },
//         });
//     }

    
//     return res.json({
//         loggedIn: false,
//         message: 'Anda belum login.',
//     });
// };

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Terjadi kesalahan saat logout');
        }
        res.redirect('/'); 
    });
};
module.exports = {login, register, checkRole, logout}
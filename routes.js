const express = require('express');
const { checkRole, login, register, checkLogin, logout } = require('./middlewares/authMiddleware');
const { addProduk, getProduk, getProdukById, getProdukUser, getProdukByIdUser, putProduk, deleteProduk } = require('./controllerProduk/controllerproduk');
const { addArtikel, getArtikel, getArtikelById, putArtikel, deleteArtikel, getArtikelUser, getArtikelByIdUser } = require('./controllerArtikel/controllerArtikel');
const { addCheckout, getCheckout, getCheckoutById, getCheckoutByIdUser, putCheckout, deleteCheckout, addCheckoutUser, getCheckoutUser } = require('./controllerCheckout/controllerCheckout');
const { addPromo, getPromo, getPromoById, putPromo, getPromoByIdUser, getPromoUser, deletePromo } = require('./controllerPromo/controllerPromo');
const { getUser, getUserById } = require('./controllerUser/controllerUser');
const router = express.Router();


//ROUTE LOGIN
router.post ('/register', register)
router.post ('/login', login)
router.get('/check-login', checkLogin);
router.get('/dashboard', checkRole('admin'), (req, res) => {
    res.send('Selamat datang di dashboard admin!');
});
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Selamat datang, ${req.user.username}`);
    } else {
        res.send('Silakan login.');
    }
});
//ROUTE LOGIN

//ROUTE PRODUK
router.post ('/dashboard/produk',  checkRole('admin'),addProduk)
router.get ('/dashboard/produk', checkRole('admin'),getProduk)
router.get ('/dashboard/produk/:id', checkRole('admin'),getProdukById)
router.get ('/produk',  getProdukUser)
router.get ('/produk/:id',  getProdukByIdUser)
router.put ('/dashboard/produk/:id', checkRole('admin'), putProduk)
router.delete ('/dashboard/produk/:id', checkRole('admin'),  deleteProduk)
//ROUTE PRODUK END

//ROUTE ARTIKEL
router.post ('/dashboard/artikel', checkRole('admin'), addArtikel)
router.get ('/dashboard/artikel',  checkRole('admin'), getArtikel)
router.get ('/dashboard/artikel/:id',  checkRole('admin'), getArtikelById)
router.get ('/artikel', getArtikelUser)
router.get ('/artikel/:id', getArtikelByIdUser)
router.put ('/dashboard/artikel/:id', checkRole('admin'), putArtikel)
router.delete ('/dashboard/artikel/:id', checkRole('admin'), deleteArtikel)
//ROUTE ARTIKEL END

//ROUTE CHECKOUT
router.post ('/dashboard/checkout', checkRole('admin'), addCheckout)
router.post ('/checkout', addCheckoutUser)
router.get ('/dashboard/checkout', checkRole('admin'), getCheckout)
router.get ('/dashboard/checkout/:id', checkRole('admin'), getCheckoutById)
router.get ('/checkout', getCheckoutUser)
router.get ('/checkout/:id', getCheckoutByIdUser)
router.put ('/dashboard/checkout/:id', checkRole('admin'), putCheckout)
router.delete ('/dashboard/checkout/:id', checkRole('admin'), deleteCheckout)
//ROUTE CHECKOUT END

//ROUTE PROMO 
router.post ('/dashboard/promo', checkRole('admin'), addPromo)
router.get ('/dashboard/promo', checkRole('admin'), getPromo)
router.get ('/dashboard/promo/:id', checkRole('admin'), getPromoById)
router.get ('/promo', getPromoUser)
router.get ('/promo/:id', getPromoByIdUser)
router.put ('/dashboard/promo/:id', checkRole('admin'), putPromo)
router.delete ('/dashboard/promo/:id', checkRole('admin'), deletePromo)
//ROUTE PROMO END 


//ROUTE USER
router.get ('/dashboard/user', checkRole('admin'), getUser)
router.get ('/dashboard/user', checkRole('admin'), getUserById)
//ROUTE USER END

module.exports = router;

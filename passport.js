const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

// Middleware untuk session dan parsing body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));

// Inisialisasi Passport dan session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
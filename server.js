const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const cors = require('cors');

const initializePassport = require("./passportConfig");

initializePassport(passport);

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(session({
  secret: "secret",

  resave: false,

  saveUninitialized: false
})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get("/users/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You have logged out");
  res.redirect("/users/login")
});


app.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  console.log({
    name,
    email,
    password,
    password2
  });

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" })
  }
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }
  if (password != password2) {
    errors.push({ message: "Passwords do not match" });
  }
  if (errors.length > 0) {
    res.json('Error validating credentials');
  } else {
    //for validation has passed

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    pool.query(
      `SELECT * FROM users
      WHERE email = $1`, [email], (err, results) => {
      if (err) {
        throw err;
      }

      console.log(results.rows);

      if (results.rows.length > 0) {
        errors.push({ message: "Email already registered" });
        res.json('Email already registerd');
      } else {
        pool.query(
          `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, password`, [name, email, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log(results.rows);
            res.json(results);
          }
        );

      }
    }
    );
  }
});

app.post(
  "/users/login",
  passport.authenticate("local"), (req, res) => {
    res.json('logged in');
  }
);


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json('Not authenticated');
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
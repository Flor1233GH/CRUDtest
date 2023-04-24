const express = require("express");
const path = require("path");

// Création du serveur Express
const app = express();

// Configuration du serveur
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Démarrage du serveur
app.listen(3000, () => {
    console.log("Serveur démarré (http://localhost:3000/) !");
  });
  
// GET /
app.get("/", (req, res) => {
    // res.send("Bonjour le monde...");
    res.render("index");
  });

// GET /books
app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books ORDER BY title";
    console.log("antes de .. Abriendo books...");
  
  //CAMBIOS MIOS
    const db = require('./db/index.js')
    db.query(sql, "", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      for (const book of result.rows){
          console.log(book.title);
          }
      res.render("books", { model: result.rows });
    })
  });
  //CAMBIOS MIOS




// GET /about
app.get("/about", (req, res) => {
    res.render("about");
});
  
  // GET /data
app.get("/data", (req, res) => {
    const test = {
      title: "Test",
      items: ["un", "deux", "trois"]
    };
    console.log(test);
    res.render("data", { model: test });
});

// GET /create
app.get("/create", (req, res) => {
    res.render("create", { model: {} });
  });

// POST /create
app.post("/create", (req, res) => {
    const sql = "INSERT INTO books (title, author, comments) VALUES ($1, $2, $3)";
    const book = [req.body.title, req.body.author, req.body.comments];
    
    const db = require('./db/index.js')
    db.query(sql, book, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.redirect("/books");
    })
  /*   pool.query(sql, book, (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    }); */
  });

  // GET /edit/5
app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM books WHERE book_ID = $1";
    const db = require('./db/index.js')
    db.query(sql, [id], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.render("edit", { model: result.rows[0] });
    })
  /*   pool.query(sql, [id], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("edit", { model: result.rows[0] });
    }); */
  });

// POST /edit/5
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const book = [req.body.title, req.body.author, req.body.comments, id];
    const sql = "UPDATE books SET title = $1, author = $2, comments = $3 WHERE (book_ID = $4)";
    const db = require('./db/index.js')
    db.query(sql, book, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.redirect("/books");
    })  
  
    /*   pool.query(sql, book, (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    }); */
  });

// GET /delete/5
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM books WHERE book_ID = $1";
    const db = require('./db/index.js')
    db.query(sql, [id], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.render("delete", { model: result.rows[0] });
    })
  /*   pool.query(sql, [id], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("delete", { model: result.rows[0] });
    }); */
  });
  
  // POST /delete/5
  app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM books WHERE book_ID = $1";
    const db = require('./db/index.js')
    db.query(sql, [id], function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.redirect("/books");
    })


  /*   pool.query(sql, [id], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    }); */
  });











/*
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * from books', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    for (const book of result.rows){
        console.log(book.title);
        }
    //console.log("titulo 1 " + result.rows[0].title);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});
*/
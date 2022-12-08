const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { saveContact, findContact, addContact } = require("./utils/contact");

const app = express();
const port = 3000;

//memanggil ejs
app.set("view engine", "ejs");
//menampilkan gambar
app.use(express.static("public"));
//parsing data dari html ke json agar tidak undifined
app.use(
  express.urlencoded({
    extended: true,
  })
);
//memanggil express layouts
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("index", { nama: "Anifa", layout: "layout/main", title: "Home Page" }); //menambahkan objek
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layout/main", title: "About Page" });
});

app.get("/contact", (req, res) => {
  const contacts = saveContact();
  res.render("contact", { layout: "layout/main", title: "Contact Page", contacts });
});

//form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Add New Contact",
    layout: "layout/main",
  });
});
//proses data contact
app.post("/contact", (req, res) => {
  addContact(req.body);
  res.redirect("/contact");
});

//detail contact
app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("detail", {
    layout: "layout/main",
    title: "Detail Contact",
    contact,
    name: req.params.name,
  });
});

//untuk req apapun
app.use("/", (req, res) => {
  res.status(404);
  res.send("Page Not Found 404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

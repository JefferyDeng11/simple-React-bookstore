import express from 'express'
import mysql from 'mysql2'
import cors from "cors"

const app = express ()

const db = mysql.createPool ({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test"
})

//ALLOWS ANY USE OF JSON SENT BY POST METHOD
app.use(express.json())
app.use(cors())

//CONNECTING TO BACKEND SERVER CHECK
app.get("/", (req, res) => {
    res.json("Hello this is the backend.")
})

//GET METHOD TO PRINT OUT FULL TABLE
app.get("/books", (req, res) => {
    const qry = "SELECT * FROM books"
    db.query(qry, (err, data) => {
        if(err) return res.json(err)
            return res.json(data)
    })
})


//SEND DATA TO DATABASE THROUGH POST METHOD
app.post("/books", (req, res) => {
    const qry = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(qry, [values], (err, data) => {
        if(err) return res.json(err)
            return res.json("Book has been created successfully.")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const qry = "DELETE FROM books WHERE id = ?"


    db.query(qry, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.")
    })
})

app.listen(3000, () => {
    console.log("Connected to backend!")
})
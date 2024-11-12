import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/books")
                setBooks(res.data);
                console.log(res)
            }
            catch(err) {
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3000/books/"+id);
            window.location.reload()

        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Loki's Bookshop</h1>
            <div className="Books">
            {books.map(book=>(

                <div className="Book"  key={book.id}>
                    {book.cover && <img src={book.cover} alt="" />}
                    <h2>{book.title}</h2>
                    <h2>{book.desc}</h2>
                    <h2>{book.price}</h2>
                    <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
            ))} 
            </div>
            <button>
                <Link to="/Add">Add New Books</Link>
            </button>
        </div>
    )
}

export default Books
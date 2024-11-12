import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const [book, setBook] = useState ({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook((prev)=>({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/books", book)
            navigate("/")
        }
        catch(err) {
            console.log(err);
        }
    }

    console.log(book)
    return (
        <div className='form'>Add
            <h1> Add new book </h1>
            <input type="text" placeholder='title' name="title" onChange = {handleChange}/>
            <input type="text" placeholder='description' name="desc" onChange = {handleChange}/>
            <input type="number" placeholder='price' name="price" onChange = {handleChange}/>
            <input type="text" placeholder='cover' name="cover" onChange = {handleChange}/>

            <button onClick={handleClick}>Add New</button>
        </div>
    )
}

export default Add
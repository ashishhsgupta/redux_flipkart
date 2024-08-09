import express from "express";
import bcrypt from 'bcryptjs';
import mysql from 'mysql';
import db from "../config/database.js"
import { v4 as uuidv4 } from 'uuid';


export const userSignup = async(req,res) => {
    try{
        console.log('req.body', req.body);
        const {name, phone, email, password } = req.body;

       db.query(`SELECT * FROM users WHERE email_id = ?`,[email], async (err, result) => {
            if(err) {
                console.log('Error querying in database', err.message);
                return res.status(500).json({message:'Internal server error'});
            }
        if (result.length > 0) {
            console.log('Email already exists');
            return res.status(401).json('Email already exists');  
        }
        const hash = await bcrypt.hash(password, 10);
        
            const sql = `INSERT INTO users (username, phone_no, email_id, password) VALUES (?,?,?,?)`;
            db.query(sql, [name, phone, email, hash], (err, result) => {
                if(err) {
                    console.error('Error inserting into database', err.message);
                    return res.status(500).json({message:'Internal error'});
                }
          
            console.log('user registered successfully');

            return res.status(201).json({message: 'user created successfully'});
            });
        });
        }catch (error) {
        console.error('error', error.message);
        return res.status(500).json('Internal server error');
    }
};
      
export const userSignin = (req, res) => {
 try{
   console.log('req.body', req.body);
   const {email, password} = req.body;
   db.query(`SELECT * FROM users WHERE email_id = ?`, [email], (err,result) => {
    if(err) {
        console.log('Error querying in database', err.message);
        return res.status(500).json({message:'Internal server error'});
    }
    if(result.length === 0) {
        console.log('Email not found');
        return res.status(401).json('Email not found');
    }
    const user = result[0];
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if(!isValidPassword) {
        console.log('Invalid password');
        return res.status(401).json('Invalid password');
    }
    console.log('user logged in successfully');
    return res.status(200).json({message: 'user logged in successfully'});
});
 } catch(error) {
    console.error('error', error.message);
    return res.status(500).json('Internal server error');
 }
}

export const productsList = (req, res) => {
    const sql = `SELECT id, name, imgSrc, price, about from products`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
}

export const orderProduct = (res, req) => {
    console.log('request body:', req.body);
   const {name, mobile, pinCode, locality, address, city, state, cartItems, totalPrice, totalQuantity, totalDiscountPrice, totalSavings } = req.body;

if(!name || !mobile || !pinCode || !locality || !address || !city || !state || !cartItems || !totalPrice || !totalQuantity || !totalDiscountPrice || !totalSavings) {
    return res.status(400).json({message: 'Please fill all the fields'});
}

   const orderID = uuidv4();
   const sql = 'INSERT INTO orders (orderID, name, mobile, pinCode, locality, address, city, state, cartItems, totalPrice, totalQuantity, totalDiscountPrice, totalSavings) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

   const values = [orderID, name, mobile, pinCode, locality, address, city, state, JSON.stringify(cartItems), totalPrice, totalQuantity, totalDiscountPrice, totalSavings];

   db.query(sql, values, (err, result) => {
    if(err) throw err;
        res.send({message: 'Order saved', orderID});
   });
}






// export const insertProducts = async(req, res) => {
//    const products = req.body;
//    const sql = `INSERT INTO products(id, title, price) VALUES ?`;
//    const values = products.map(product => [product.id, product.title, product.price]);

//    db.query(sql, [values], (err, results) => {
//     if(err) {
//         return res.status(500).send(err);
//     }
//     res.json({message: 'Products inserted', insertedRows: results.affectedRows});
//    });
// }

// export const orderProduct = (req, res) => {
//     try{
//       console.log('req.body:', req.body);
//       const {product_id, product_name, price, quantity, total_price} = req.body;
     
//       if(!product_id || !product_name || !price || !quantity || !total_price ){
//         return res.status(400).send('All fields are required');
//       }
//       const now = new Date();
//       const date_time = now.toLocaleString('en-IN', {timeZone:'ASIA/Kolkata', hour12: false});

//       const query = `INSERT INTO products (product_id, product_name, price, quantity, total_price, date_time) VALUES (?, ?, ?, ?, ?, ?)`;
//       db.query(query, [product_id, product_name, price, quantity, total_price, date_time],(error, result) => {
//         if(error){
//             console.error('Database insertion error:', error.message);
//             return res.status(500).send('Database insertion error');
//         }
//         res.status(201).send('Order placed successfully');
//       });
//     }catch(error){
//         console.error('error', error.message);
//         res.status(500).send('Internal server error');
//     }
// }
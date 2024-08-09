import express from "express";
import { userSignup, userSignin, productsList, orderProduct } from '../userController/userController.js';


const router = express.Router();

// routers.get("/api", (req, res) =>{
//     res.json({message:"Hello nodejs Ashish"});
// });

router.get('/api/v1/getProducts', productsList)
router.post('/api/v1/signup', userSignup);
router.post('/api/v1/signin', userSignin);
router.post('/api/v1/orderItem', orderProduct);

export default router;
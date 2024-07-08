import express from 'express';
import {RegisterUser, LoginUser, getUser,LogoutUser} from '../controllers/authController.js'
import {authMiddleware, permisionUser} from '../middleware/authMiddleware.js'
const router = express.Router()


//post api register 
router.post('/register', RegisterUser)
//post api login
router.post('/login', LoginUser)
//post api logout
router.get('/logout', LogoutUser)
//post api get user
router.get('/getUSer', authMiddleware, getUser)

router.get('/test', authMiddleware, permisionUser("admin"),(req, res,)=> {
    res.send("berhasil")
})

export default router

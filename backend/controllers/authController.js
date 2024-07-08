import User from "../models/user.js"; // Mengubah 'user' menjadi 'User' untuk konsistensi dengan penggunaan nama kelas/model
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '6d'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + 6 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // Mengubah 'security' menjadi 'secure' dan menyesuaikan kondisinya
    };
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined; // Menghapus password dari respons

    res.status(statusCode).json({
        data: user
    });
};

export const RegisterUser = asyncHandler(async (req, res) => {
    const isFirstAcount = (await User.countDocuments()) === 0

    const role = isFirstAcount ? "admin" : "user"


    const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role
    })

    createSendToken(createUser, 201, res);
})

export const LoginUser = asyncHandler(async (req, res) => {
    // Validasi jika email dan password tidak diisi
    if (!req.body.email || !req.body.password) {
        res.status(400);
        throw new Error("Inputan email dan password tidak boleh kosong");
    }

    // Cek apakah email terdaftar di database atau tidak
    const userData = await User.findOne({ email: req.body.email });

    if (userData && (await userData.comparePassword(req.body.password))) {
        createSendToken(userData, 200, res)
    } else {
        res.status(400);
        throw new Error("Pengguna tidak valid");
    }
});

export const LogoutUser = (req, res) => {
    res.cookie('jwt', '',{
        expire : new Date(0),
        httpOnly : true,
        security : false
    })
    res.status(200).json({
        message : "logout berhasil"
    })
};

export const getUser = async(req, res) => {
    const user  = await User.findById(req.user.id).select({password : 0 })

    if (user){
        return res.status(200).json({
            user 
        })
    }
    return res.status(401).json({
        message : 'user tidak di temukan'
    })
}

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "username harus di input"],
        unique: [true, "username sudah di gunakan"]
    },
    email : {
        type : String,
        required : [true, "email harus di input"],
        unique: [true, "email sudah di gunakan"],
        validate :{
            validator : validator.isEmail,
            message : "inputan harus berupa email"
        }
        },
    password : {
        type : String,
        required :[true, 'password harus di isi'],
        minlength : 6
    },
    role :{
        type : String,
        enum: ["user","admin"],
        default : "user"
    }
})

userSchema.methods.comparePassword = async function(reqPassword){
    return await bcrypt.compare(reqPassword, this.password)
}

userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model("User", userSchema)

export default User
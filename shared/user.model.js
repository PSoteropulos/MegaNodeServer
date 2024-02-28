const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "Username is required."],
        minLength:[6, "Username must be longer than 5 characters."],
        maxLength:[25," Username can not exceed 25 characters."],
        trim:true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        // validate: {
        //     validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        //     message: "Please enter a valid email"
        // }
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "Invalid email format."]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, {timestamps:true})

// this is to use comfirm password validations but not save the field to db
UserSchema.virtual('confirmPassword')
.get(()=>this._confirmPassword)
.set(value=>this._confirmPassword = value)


// Mongoose middleware
UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Password and Confirm Password must match.')
    }
    next()
})


UserSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password,10)
        console.log('Hashed password:', hashedPassword)
        this.password = hashedPassword
        next()
    }catch{
        console.log('Error in save', error)
    }
})

UserSchema.plugin(uniqueValidator, { message: 'Username must be unique.' })

module.exports = mongoose.model('User', UserSchema)
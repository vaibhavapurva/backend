import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    date:String,
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
});

autoIncrement.initialize(mongoose.connection)
userSchema.plugin(autoIncrement.plugin, "user");

userSchema.pre('save', async function (next) {
    console.log("inside");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})
userSchema.methods.generateAuthToken = async function () {
    console.log("inside JWT 1");
    try {
        console.log("inside JWT 2");
        const token = jwt.sign({ _id: this._id }, 'mynameisvaibhavapurvaufvibhu');
        console.log("inside JWT 3");
        this.tokens = this.tokens.concat({ token: token });
        console.log("inside JWT 4");
        await this.save();
        console.log("inside JWT 5");
        return token;

    } catch (err) {
        console.log("6")
        console.log(err);
    }
}
const user = new mongoose.model('user' , userSchema);
 export default user;

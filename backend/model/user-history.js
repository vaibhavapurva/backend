import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
const userHistory = new mongoose.Schema({
    email:String,
    city:String,
    date:String,
    weather:Object,
    // main:String,
    // description:String,
});

autoIncrement.initialize(mongoose.connection)
userHistory.plugin(autoIncrement.plugin, "history");

const history = new mongoose.model('history' , userHistory);
export default history;
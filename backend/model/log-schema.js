import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"


const LogSchema = new mongoose.Schema({
    email:String,
    date:String
});

autoIncrement.initialize(mongoose.connection)
LogSchema.plugin(autoIncrement.plugin, "log");

const log = new mongoose.model("log" , LogSchema);
export default log;
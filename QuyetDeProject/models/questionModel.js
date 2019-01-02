const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    yes: {type : Number,default: 0},  // cach viet yes no la cach khai bao dang number
    no: {type : Number,default: 0},
    content: {type : String, required: true, unique: true}  //kiểu String, required: not null, unique: duy nhất
},{
    timestamps: true    //auto fill in createdAt and updatedAt
})

module.exports = mongoose.model("Question", QuestionSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
   
   player1: { name: { type: String }, score: { type: Array }},
   player2: { name: { type: String }, score: { type: Array }},
   player3: { name: { type: String }, score: { type: Array }},
   player4: { name: { type: String }, score: { type: Array }}
},{
    timestamps: true    
});

module.exports = mongoose.model("Game", GameSchema);
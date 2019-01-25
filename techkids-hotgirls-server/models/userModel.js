const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	avatar: { type: String, required: true }
});
UserSchema.pre("save", function(next){
	console.log(this);
	const { password } = this;
	if(password) {
		const salt = bcrypt.genSaltSync(12);
		this.password = bcrypt.hashSync (password, salt);
	}
	next();
})

module.exports = mongoose.model("user", UserSchema);
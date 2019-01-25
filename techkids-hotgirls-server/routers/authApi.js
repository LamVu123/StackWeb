const express = require('express');
const AuthApi = express.Router();;
const bcrypt = require('bcryptjs');

const UserModel = require("../models/userModel");

AuthApi.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username })
        .then(userFound => {
            if (!userFound) res.send({ error: "user not exist" });
            else {
                if (bcrypt.compareSync(password, userFound.password)) {
                    res.send({ data: true });
                }
                else res.send({ data: false });
            }
        })
        .catch(err => res.send(err));
});

module.exports = AuthApi;

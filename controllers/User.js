const Users = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
module.exports.getUsers = (req, res) => {
    Users.findAll({
        attributes:['id','name','email']
    })
        .then(result => {
            res.status(200).json({
                message : "Data Berhasil Diget!",
                code : 200,
                data: result
            })           
        })
}
 
module.exports.Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({mesasge: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    Users.create({
        name: name,
        email: email,
        password: hashPassword
    })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Register Berhasil",
                data: {name, email}
            });
        })
}
 
module.exports.Login = async(req, res) => {
        Users.findAll({
            where:{
                email: req.body.email
            }
        })
            .then(result => {
                bcrypt.compare(req.body.password, result[0].password)
                    .then(match => {
                        if(!match) return res.status(400).json({message: "Wrong Password"});
                    })

                const userId = result[0].id;
                const name = result[0].name;
                const email = result[0].email;
                const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: '20s'
                });
                const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn: '1d'
                });

                Users.update({refresh_token: refreshToken},{
                    where:{
                        id: userId
                    }
                })
                    .then(result => {
                        res.cookie('refreshToken', refreshToken,{
                            httpOnly: true,
                            maxAge: 24 * 60 * 60 * 1000
                        });
                        res.json({ accessToken })
                    })
            })
}
 
module.exports.Logout = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    })
        .then(result => {
            if(!result[0]) return res.sendStatus(204);
            const userId = result[0].id;
            Users.update({refresh_token: null},{
                where:{
                    id: userId
                }
            })
                .then(result => {
                    res.clearCookie('refreshToken');
                    res.status(200).json({
                        message: "Berhasil Logout!"
                    })
                })
        })
}
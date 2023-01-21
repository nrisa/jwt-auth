const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");
 
const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true,
    timestamps: true
});
 
// (async () => {
//     await db.sync();
// })();
 
module.exports = Users;
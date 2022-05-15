const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true


    },
    Rol: {
        type: String,
    },
    Password: {
        type: String,
        require: true
    },
    Fecha: {
        type: String
    }
})
UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

// crear modelo
const User = mongoose.model('User', UserSchema);

module.exports = User;
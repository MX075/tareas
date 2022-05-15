const mongoose = require("mongoose");


const RegistrarUser = (req, res) => {
    try {
        res.render('register');
    } catch (e) {
        res.redirect('/api/tareas')

    }

}

const LoginUser = (req, res) => {

    res.render('login')
}
const Home = async(req, res) => {
    res.render('Home')
}
const New = async(req, res) => {
    res.render('New')
}
module.exports = { RegistrarUser, LoginUser, Home, New }
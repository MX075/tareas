const express = require('express')
const passport = require('passport');
const fs = require('fs')
const passportLocal = require('passport-local').Strategy;
const router = express.Router()
const { RegistrarUser, LoginUser, Home, New, EditTarea, Guardar, GuardarEdit, Eliminar } = require('../controllers/tareas')

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user._id);
})
passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user)
})
passport.use('local-signup', new passportLocal({
    username: 'username',
    password: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    //se crear el objeto usuario
    const user = new User();
    user.Username = username,

        user.Fecha = req.body.Date,
        // se encripta la contraseña
        user.Password = user.encryptPassword(password)
    console.log('ver usuarios', user)
    await user.save()

    done(null, user)
}))
passport.use('local-signin', new passportLocal({
        username: 'username',
        password: 'password',
        passReqToCallback: true
    }, async(req, username, password, done) => {
        // se valida si el usario existe
        const user = await User.findOne({ Username: username });
        const pass = await User.findOne({ Password: password });

        if (user) {
            done(null, user);
        } else {
            return done(null, false);
        }
    }))
    //
router.get('/', LoginUser)
router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/api/tareas/Home',
    failureRedirect: '/api/tareas',
    failureFlash: true
}), async(req, res) => {
    res.redirect('/api/tareas');

})
router.get('/Registro', RegistrarUser)
router.post('/Registro', passport.authenticate('local-signup', {
    successRedirect: '/api/tareas/Home',
    failureRedirect: '/api/tareas/Registro',
    failureFlash: true
}));
//HOME
router.get('/Home', isAuthenticated, Home)
    //CREAR NUEVA TAREA
router.get('/New', isAuthenticated, New)
router.post('/New', isAuthenticated, Guardar)
    //EDITAR TAREA
router.get('/EditTarea/:id', isAuthenticated, EditTarea)
router.put('/EditTarea/:id', isAuthenticated, GuardarEdit)

//Eliminar tarea
router.delete('/Eliminar/:id', isAuthenticated, Eliminar)



router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/Control');
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}
module.exports = router
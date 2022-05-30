const mongoose = require("mongoose");
const Tarea = require('../models/Tareas')

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
        const Tareas = await Tarea.find().sort({ Fecha: -1 })
        res.render('Home', { Tareas })
    }
    //crear tarea
const New = async(req, res) => {
    res.render('New')
}
const Guardar = async(req, res) => {
        const { Name, Description, Fecha } = req.body
        const newTarea = new Tarea({
            Name,
            Avance: '0',
            Description,
            Fecha
        })
        await newTarea.save()
        res.redirect('/api/tareas/Home')

    }
    //editar tarea
const EditTarea = async(req, res) => {
    const id = req.params.id
    const TareaEdit = await Tarea.findOne({ _id: id })
    res.render('edit', { TareaEdit })
}
const GuardarEdit = async(req, res) => {
    const id = req.params.id
    const body = req.body
    const TareaEdit = await Tarea.findByIdAndUpdate(id, body, { useFindAndModify: false })
    res.json({ estado: true })
}


//eliminar
const Eliminar = async(req, res) => {
    const id = req.params.id
    console.log(id)
    await Tarea.findByIdAndDelete({ _id: id })
    res.json({ estado: true })

}
module.exports = { RegistrarUser, LoginUser, Home, New, EditTarea, Guardar, GuardarEdit, Eliminar }
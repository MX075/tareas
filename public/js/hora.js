function hora() {
    const hoy = new Date()
    const mescorregido = hoy.getMonth()
    const suma = mescorregido + 1
    const fechasHoy = hoy.getDate() + "/" + suma + "/" + hoy.getFullYear() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds()
    const fechaUser = document.getElementById('fecha')
    fechaUser.value = fechasHoy

}
setInterval('hora()', 1000)
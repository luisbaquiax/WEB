function camposLlenos(formulario) {
    var nombre = formulario.nombre;
    var contraseña = formulario.contraseña;

    if (nombre == "") {
        nombre.focus();
        nombre.select();
        return false;
    } else if (contraseña == "") {
        contraseña.focus();
        contraseña.select();
        return false;
    }
    return true;
}
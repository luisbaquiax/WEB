/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function camposLlenos(formulario) {
    var nombre = formulario.usuario;

    if (nombre.value == "") {
        alert('Debe llenar los campos obligatorios');
        nombre.focus();
        nombre.select();
        return false;
    }
    var contraseña = formulario.contraseña;
    if (contraseña.value == "") {
        alert('Debe llenar los campos obligatorios');
        contraseña.focus();
        contraseña.select();
        return false;
    }
}
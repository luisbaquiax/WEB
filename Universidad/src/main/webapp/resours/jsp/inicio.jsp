<%-- 
    Document   : inicio
    Created on : 6 jun. 2021, 1:18:56
    Author     : Luis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Universidad</title>
        <link rel="stylesheet" href="../css/style-login.css" type="text/css"/>
        <script type="text/javascript" src="recursos/funciones.js"></script>
    </head>
    <body>
        <form action="menu.jsp" method="POST" onclick="camposLlenos(this)">
            <div class="et">
                <h1 class="etiqueta" >Universidad</h1>
            </div>

            <div class="contendor">
                <h1>Login</h1>
                <div class="box box-usuario">
                    <label for="" class="label">Nombre</label>
                    <input type="text" name="usuario" class="input input-name" required="">
                </div>
                <div class="box box-contraseña">
                    <label for="" class="label">Contraseña</label>
                    <input type="password" name="contraseña" class="input input-contraseña">
                </div>
                <div class="box box-button">
                    <button type="submit" class="button-ingresar">Ingresar
                    </button>
                </div>
            </div>
        </form>
    </body>
</html>

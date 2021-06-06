<%-- 
    Document   : menu
    Created on : 5 jun. 2021, 0:56:53
    Author     : Luis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="../css/menu.css" rel="stylesheet" type="text/css"/>
        <script src="../js/listadoProfesores.js" type="text/javascript"></script>
        <link href="../css/menu.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div class="box-conteiner">
            <nav>
                <ul>
                    <li><a href="menu.jsp" class="menu menu-teacher" onclick="listarProfesores()">Profesores</a></li>
                    <li><a href="menu.jsp" class="menu menu-student" onclick="saludar()">Estudiantes</a></li>
                    <li><a href="menu.jsp" class="menu menu-courses">Cursos</a></li>
                    <li><a href="menu.jsp" class="menu menu-reports">Reportes</a></li>
                    <li><a href="menu.jsp" class="menu menu-register">Registrar profesor</a></li>
                    <li><a href="menu.jsp" class="menu menu-register">Registrar estudiante</a></li>
                    <li><a href="inicio.jsp" class="menu menu-salir">Salir</a></li>
                </ul>
            </nav>
        </div>
        <div class="container-tabla">por aca la tabla</div>
    </body>
</html>

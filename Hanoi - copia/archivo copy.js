window.addEventListener("load", ingresarFichas, false);

const altura = "40px";

var cuerpo;

var cuadro1 = new Cuadro(true);
var cuadro2 = new Cuadro(false);
var cuadro3 = new Cuadro(false);

var fichaSeleccionada;
var origen;
var destino;

var movimientoJuego = 0;
var cantidadFichas;

function iniciar() {
  cuerpo = document.getElementsByTagName("body")[0];
  cuerpo.style.textAlign = "center";

  cuerpo.appendChild(cuadro1.caja);
  cuerpo.appendChild(cuadro2.caja);
  cuerpo.appendChild(cuadro3.caja);


  cuadro1.caja.addEventListener("mouseover", pasarMouseSobreUnElemento1, false);
  cuadro2.caja.addEventListener("mouseover", pasarMouseSobreUnElemento2, false);
  cuadro3.caja.addEventListener("mouseover", pasarMouseSobreUnElemento3, false);

  cuadro1.caja.addEventListener("mouseout", quitarMouse1, false);
  cuadro2.caja.addEventListener("mouseout", quitarMouse2, false);
  cuadro3.caja.addEventListener("mouseout", quitarMouse3, false);

  cuadro1.caja.addEventListener("click", click1, false);
  cuadro2.caja.addEventListener("click", click2, false);
  cuadro3.caja.addEventListener("click", click3, false);

  var texto = document.createTextNode("Movimientos: "+this.movimientoJuego);
  var parrafo = document.createElement("p");
  parrafo.style.clear = "both";
  //depende del tipo de font seleccionada en pixeles
  parrafo.style.paddingTop = "3em";
  parrafo.setAttribute("id", "contador");
  parrafo.appendChild(texto);
  cuerpo.appendChild(parrafo);
}

function ingresarFichas() {
  var fichas = document.getElementById("fichas").value;
  this.cantidadFichas = parseInt(fichas);
  if(cantidadFichas >= 5 && cantidadFichas <=10){
    iniciar();
  }else{
    alert("Seleccione fichas en el rango ");
  }
}

/*eventos*/
function pasarMouseSobreUnElemento(cuadro){
  cuadro.caja.style.backgroundColor = "#dfdfdd";
}

function pasarMouseSobreUnElemento1(){
  pasarMouseSobreUnElemento(cuadro1);
}
function pasarMouseSobreUnElemento2(){
  pasarMouseSobreUnElemento(cuadro2);
}
function pasarMouseSobreUnElemento3(){
  pasarMouseSobreUnElemento(cuadro3);
}

function quitarMouse(cuadro){
   cuadro.caja.style.backgroundColor = "#cce7e8";
}

function quitarMouse1(){
  quitarMouse(cuadro1);
}


function quitarMouse2(){
  quitarMouse(cuadro2);
}

function quitarMouse3(){
  quitarMouse(cuadro3);
}

function click(cuadro){
  if(cuadro.elegido){
    selecionarOrigenDestino(cuadro);
    //alert(cuadro.tieneFichas());
  }else{
    cuadro.caja.style.borderColor = "black";
    reiniciarOrigenDestino();
  }
}

function click1(){
  cuadro1.elegido = !cuadro1.elegido;
  click(cuadro1);
}

function click2(){
  cuadro2.elegido = !cuadro2.elegido;
  click(cuadro2);
}

function click3(){
  cuadro3.elegido = !cuadro3.elegido;
  click(cuadro3);
}

function crearDivision() {
  var caja = document.createElement("div");
  return caja;
}

function Cuadro(cajaInicio) {
  this.caja = crearDivision();
  this.caja.style.width = "28%";
  this.caja.style.height = "400px";
  this.caja.style.marginLeft = "4%";
  this.caja.style.borderWidth = "2%";
  this.caja.style.border = "solid black";
  this.caja.style.float = "left";
  this.elegido = false;
  this.contenido;

  if(cajaInicio){
    this.contenido = rellenarFichas2();
  }else{
    this.contenido = rellenarContenido2();
  }

  for (var i = 0; i < this.contenido.length; i++) {
    this.caja.appendChild(this.contenido[i].caja);
  }

  this.tieneFichas = function(){
    var rellenos = 0;
    for (var i = 0; i < this.contenido.length; i++) {
      if(this.contenido[i] instanceof Relleno){
        rellenos++;
      }
    }
    if(rellenos == this.contenido.length){
        return false;
    }else{
        return true;
    }
  };

  this.obtenerFichaSuperior = function(){
    for (var i = 0; i < this.contenido.length; i++) {
      if(!(this.contenido[i] instanceof Relleno)){
        return this.contenido[i];
      }
    }
  };

  this.quitarFichaSuperior = function(){
    for (var i = 0; i < this.contenido.length; i++) {
      if(!(this.contenido[i] instanceof Relleno)){
        fichaSeleccionada = this.contenido[i];
        this.contenido[i] = new Relleno();
        break;
      }
    }
  };

  this.insertarFichaSuperior = function(){
    for (var i = (this.contenido.length -1); i >=0; i--) {
      if(this.contenido[i] instanceof Relleno){
        this.contenido[i] = fichaSeleccionada;
        break;
      }
    }
  };

  this.redibujarCaja = function(){
    while(this.caja.hasChildNodes()){
      this.caja.removeChild(this.caja.lastChild);
    }
    for (var i = 0; i < this.contenido.length; i++) {
      this.caja.appendChild(this.contenido[i].caja);
    }
  };
}

function selecionarOrigenDestino(cuadro){
  //origen no definido
  if(origen == undefined){
    if(cuadro.tieneFichas()){
      cuadro.caja.style.borderColor = "red";
      origen = cuadro;
      origen.elegido = true;
    }
  }else if(origen != undefined && destino == undefined){
    destino = cuadro;
    destino.elegido = true;
    if(origen != destino){
      if(!destino.tieneFichas() || origen.obtenerFichaSuperior().valor < destino.obtenerFichaSuperior().valor){
          origen.quitarFichaSuperior();
          origen.redibujarCaja();
          destino.insertarFichaSuperior();
          destino.redibujarCaja();
          movimientoJuego++;
          actualizarContador();
      }
    }
  }
  if((destino != undefined) && (origen != undefined)){
    reiniciarOrigenDestino();
  }

  if(comprobarVictoria2()){
    victoria();
  }
}

function comprobarVictoria2(){

}

function comprobarVictoria(){
  if(cuadro3.contenido[0] instanceof Relleno
      && (cuadro3.contenido[1] instanceof FichaS)
      && (cuadro3.contenido[2] instanceof FichaM)
      && (cuadro3.contenido[3] instanceof FichaL)
      && (cuadro3.contenido[4] instanceof FichaXL)){
    return true;
  }else if(cuadro3.contenido[0] instanceof Relleno
      && (cuadro2.contenido[1] instanceof FichaS)
      && (cuadro2.contenido[2] instanceof FichaM)
      && (cuadro2.contenido[3] instanceof FichaL)
      && (cuadro2.contenido[4] instanceof FichaXL)){
    return true;
  }else{
    return false;
  }
}

function victoria(){
  var ganado = document.createTextNode("Has ganado.");
  var movimientoRealizados = document.createTextNode("Movimientos realizados: "+ this.movimientoJuego);
  var sugerencia = document.createTextNode("PULSE F5 PARA JUGAR DE NUEVO.");

  //se remueve todo lo que esta en body de html
  cuerpo.removeChild(cuadro1.caja);
  cuerpo.removeChild(cuadro2.caja);
  cuerpo.removeChild(cuadro3.caja);
  cuerpo.removeChild(document.getElementById("contador"));

  var titulo = document.createElement("h1");
  titulo.style.color = "#195e83";
  titulo.appendChild(ganado);

  var titulo2 = document.createElement("h2");
  titulo2.style.color = "#e07b39";
  titulo2.appendChild(movimientoRealizados);

  var titulo3 = document.createElement("h3");
  titulo3.style.color = "#d30400";
  titulo3.appendChild(sugerencia);

  cuerpo.appendChild(titulo);
  cuerpo.appendChild(titulo2);
  cuerpo.appendChild(titulo3);
}

function reiniciarOrigenDestino(){
  if(origen != undefined){
    origen.caja.style.borderColor = "black";
    origen.elegido = false;
  }

  if(destino != undefined){
    destino.caja.style.borderColor = "black";
    destino.elegido = false;
  }


  origen = undefined;
  destino = undefined;

  cuadro1.elegido = false;
  cuadro2.elegido = false;
  cuadro3.elegido = false;
}

function actualizarContador(){
    var parrafo = document.getElementById("contador");
    //se accede al contenido que tiene "parrafo"
    parrafo.innerHTML = "Movimientos: " + movimientoJuego;
}

function rellenarFichas2(){
  var fichas = new Array();
  for (var i = 0; i < cantidadFichas; i++) {
    if(i == 0){
      fichas[i] = new Relleno();
    }else{
      var anchoInt = (i+1)*10;
      var anchoString = anchoInt+"%";
      var valor = i+1;
      fichas[i] = new Ficha(anchoString, altura,valor);
    }
  }
  return fichas;
}

function rellenarFichas() {
  var contenido = new Array();

  contenido[0] = new Relleno();
  contenido[1] = new FichaS();
  contenido[2] = new FichaM();
  contenido[3] = new FichaL();
  contenido[4] = new FichaXL();

    return contenido;
}

function rellenarContenido2(){
  var contenido2 = new Array();
  for (var i = 0; i < cantidadFichas; i++) {
    contenido2[i] = new Relleno();    
  }
  return contenido2;
}

function rellenarContenido() {
  var contenido = new Array();
  for(var i = 0; i < 5; i++){
    contenido[i] = new Relleno();
  }
    return contenido;
}

function Relleno(){
  this.caja = crearDivision();
  this.caja.style.width = "100%";
  this.caja.style.height = altura;
}

function Ficha(ancho, alturaP, valor) {
  this.caja = crearDivision();
  this.caja.style.width = ancho;
  this.caja.style.height = alturaP;
  this.caja.style.backgroundColor = "#edb879";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.valor2 = valor;
}

function FichaS() {
  this.caja = crearDivision();
  this.caja.style.width = "10%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#edb879";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.valor = 0;
}

function FichaM() {
  this.caja = crearDivision();
  this.caja.style.width = "30%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#44bcd8";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.valor = 1;
}

function FichaL() {
  this.caja = crearDivision();
  this.caja.style.width = "50%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#1979a9";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.valor = 2;
}

function FichaXL() {
  this.caja = crearDivision();
  this.caja.style.width = "100%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#042f66";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.valor = 3;
}

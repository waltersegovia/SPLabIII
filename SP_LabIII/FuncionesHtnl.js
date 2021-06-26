/// <reference path="auto.ts" />
/// <reference path="camioneta.ts" />
var general;
(function (general) {
    window.addEventListener("load", function () {
        //Formulario 1
        document.getElementById("btnGuardarFormulario1").addEventListener("click", general.guardarFormularioUno);
        document.getElementById("btnAbrirFormulario1").addEventListener("click", general.abrirFormularioUno);
        document.getElementById("btnCerrarFormulario1").addEventListener("click", general.cerrarFormularioUno);
        document.getElementById("limpiarFormulario1").addEventListener("click", general.limpiarFormularioUno);
        //Formulario 2
        document.getElementById("btnGuardarFormulario2").addEventListener("click", general.guardaFormularioDos);
        document.getElementById("btnAbrirFormulario2").addEventListener("click", general.abrirFormularioDos);
        document.getElementById("btnCerrarFormulario2").addEventListener("click", general.cerrarFormularioDos);
        document.getElementById("limpiarFormulario2").addEventListener("click", general.limpiarFormularioDos);
        // Para calcular y buscar
        document.getElementById("btnPromedio").addEventListener("click", general.procesarPromedio);
        document.getElementById("btnPromedioSalir").addEventListener("click", general.limpiarPromedio);
        document.getElementById("btnSalirBusqueda").addEventListener("click", general.SalirBusqueda);
        document.getElementById("tecla").addEventListener("keypress", buscarEnAtributo);
        //Oculta campos
        document.getElementById("idCheck").addEventListener("change", camposMostrados);
        document.getElementById("marcaCheck").addEventListener("change", camposMostrados);
        document.getElementById("modeloCheck").addEventListener("change", camposMostrados);
        document.getElementById("precioCheck").addEventListener("change", camposMostrados);
    });
    var listaVehiculos = new Array();
    var listaAuto = new Array();
    var listaCamioneta = new Array();
    var textoBuscar = '';
    function buscarEnAtributo(letra) {
        var txtTecla = document.getElementById("tecla");
        textoBuscar = txtTecla.value + letra.key;
        console.log(textoBuscar);
        if (textoBuscar != "") {
            //console.log("If");
            var contenedorPrincipalTabla = document.getElementById("contenedorPrincipalTabla");
            contenedorPrincipalTabla.hidden = true;
            var TablaBusqueda = document.getElementById("ContenedorTablaBusqueda");
            TablaBusqueda.hidden = false;
            var listaResultado = listaVehiculos.filter(function (objetoVehiculo) {
                return objetoVehiculo.getMarca() == textoBuscar;
            });
            //Borramos Grilla 
            var tbody = document.getElementById("cuerpoBusqueda");
            var tablaBusqueda = document.getElementById("grillaBusqueda");
            if (tbody.hasChildNodes()) {
                tablaBusqueda.removeChild(tbody);
                var tbodyBusqueda = document.createElement("tbody");
                tbodyBusqueda.setAttribute("id", "cuerpoBusqueda");
                tablaBusqueda.appendChild(tbodyBusqueda);
            }
            buscarNombreFromulario1(textoBuscar);
            buscarNombreFromulario2(textoBuscar);
        }
    }
    general.buscarEnAtributo = buscarEnAtributo;
    function SalirBusqueda() {
        console.log("SalirBusqueda");
        var TablaBusqueda = document.getElementById("ContenedorTablaBusqueda");
        TablaBusqueda.hidden = true;
        var contenedorPrincipalTabla = document.getElementById("contenedorPrincipalTabla");
        contenedorPrincipalTabla.hidden = false;
        var elementoBusqueda = document.getElementById("tecla");
        elementoBusqueda.value = "";
    }
    general.SalirBusqueda = SalirBusqueda;
    function buscarNombreFromulario1(textoBuscar) {
        //console.log("Entro a Fromulario 1");
        var listaResultadoFormulario1 = listaAuto.filter(function (objetoFormulario) {
            return objetoFormulario.getMarca() == textoBuscar;
        });
        console.log(listaResultadoFormulario1);
        armarGrillaFromulario1(listaResultadoFormulario1);
    }
    general.buscarNombreFromulario1 = buscarNombreFromulario1;
    function buscarNombreFromulario2(textoBuscar) {
        //console.log("Entro a Fromulario 2");
        var listaResultadoFormulario2 = listaCamioneta.filter(function (objeto) {
            return objeto.getMarca() == textoBuscar;
        });
        console.log(listaResultadoFormulario2);
        armarGrillaFromulario2(listaResultadoFormulario2);
    }
    general.buscarNombreFromulario2 = buscarNombreFromulario2;
    function agregarUnElemento1Grilla(miAuto, nombreTabla) {
        var tbody = document.getElementById(nombreTabla);
        //Creo la fila
        var tr = document.createElement("tr");
        //Creamos las colunmnas
        var td0 = document.createElement("td");
        td0.setAttribute("name", "idTabla");
        var nodotext0 = document.createTextNode(miAuto.getId());
        td0.appendChild(nodotext0);
        tr.appendChild(td0);
        var td1 = document.createElement("td");
        td1.setAttribute("name", "marcaTabla");
        var nodotext1 = document.createTextNode(miAuto.getMarca());
        td1.appendChild(nodotext1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.setAttribute("name", "modeloTabla");
        var nodotext2 = document.createTextNode(miAuto.getModelo());
        td2.appendChild(nodotext2);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.setAttribute("name", "precioTabla");
        var nodotext3 = document.createTextNode(miAuto.getPrecio().toString());
        td3.appendChild(nodotext3);
        tr.appendChild(td3);
        var TablaContenedor = document.getElementById("TablaContenedor");
        if (TablaContenedor.hidden == true) {
            var td4 = document.createElement("td");
            td4.setAttribute("name", "accion");
            var nodotext4 = document.createTextNode("Eliminar");
            var nodoBoton = document.createElement("button");
            nodoBoton.setAttribute("class", "cerrar");
            nodoBoton.setAttribute("name", "botonEliminar");
            nodoBoton.appendChild(nodotext4);
            td4.appendChild(nodoBoton);
            tr.appendChild(td4);
            tr.addEventListener("click", clickGrilla);
        }
        tbody.appendChild(tr);
    }
    function agregarUnElemento2Grilla(miCamioneta, nombreTabla) {
        var tbody = document.getElementById(nombreTabla);
        //Creo la fila
        var tr = document.createElement("tr");
        //Creamos las colunmnas
        var td0 = document.createElement("td");
        td0.setAttribute("name", "idTabla");
        var nodotext0 = document.createTextNode(miCamioneta.getId());
        td0.appendChild(nodotext0);
        tr.appendChild(td0);
        var td1 = document.createElement("td");
        td1.setAttribute("name", "marcaTabla");
        var nodotext1 = document.createTextNode(miCamioneta.getMarca());
        td1.appendChild(nodotext1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.setAttribute("name", "modeloTabla");
        var nodotext2 = document.createTextNode(miCamioneta.getModelo());
        td2.appendChild(nodotext2);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.setAttribute("name", "precioTabla");
        var nodotext3 = document.createTextNode(miCamioneta.getPrecio().toString());
        td3.appendChild(nodotext3);
        tr.appendChild(td3);
        var td4 = document.createElement("td");
        td4.setAttribute("name", "accion");
        var nodotext4 = document.createTextNode("Eliminar");
        var nodoBoton = document.createElement("button");
        nodoBoton.setAttribute("class", "cerrar");
        nodoBoton.setAttribute("name", "botonEliminar");
        nodoBoton.appendChild(nodotext4);
        td4.appendChild(nodoBoton);
        tr.appendChild(td4);
        tr.addEventListener("click", clickGrilla);
        tbody.appendChild(tr);
    }
    function armarGrillaFromulario1(listaResultado) {
        //Cargamos Grilla
        listaResultado.forEach(function (miAuto) {
            agregarUnElemento1Grilla(miAuto, "cuerpoBusqueda");
        });
    }
    function armarGrillaFromulario2(listaResultado) {
        //Cargamos Grilla
        listaResultado.forEach(function (miCamioneta) {
            agregarUnElemento2Grilla(miCamioneta, "cuerpoBusqueda");
        });
    }
    //Formulario 1
    function abrirFormularioUno() {
        //Elementos Ocultados
        //Boton Abrir Formularios
        var btnAbrirFormulario2 = document.getElementById("btnAbrirFormulario2");
        btnAbrirFormulario2.hidden = true;
        var btnAbrirFormulario1 = document.getElementById("btnAbrirFormulario1");
        btnAbrirFormulario1.hidden = true;
        //Campo Buscar
        var btnTecla = document.getElementById("btnTecla");
        btnTecla.hidden = true;
        //Boton Salir Busqueda
        var btnSalirBusqueda = document.getElementById("btnSalirBusqueda");
        btnSalirBusqueda.hidden = true;
        //Lista
        var TablaContenedor = document.getElementById("TablaContenedor");
        TablaContenedor.hidden = true;
        //Muestra 
        var contFormulario1 = document.getElementById("contFormulario1");
        contFormulario1.hidden = false;
    }
    general.abrirFormularioUno = abrirFormularioUno;
    function cerrarFormularioUno() {
        //Elementos Mostrados
        //Boton Abrir Formularios
        var btnAbrirFormulario2 = document.getElementById("btnAbrirFormulario2");
        btnAbrirFormulario2.hidden = false;
        var btnAbrirFormulario1 = document.getElementById("btnAbrirFormulario1");
        btnAbrirFormulario1.hidden = false;
        //Campo Buscar
        var btnTecla = document.getElementById("btnTecla");
        btnTecla.hidden = false;
        //Boton Salir Busqueda
        var btnSalirBusqueda = document.getElementById("btnSalirBusqueda");
        btnSalirBusqueda.hidden = false;
        //Lista
        var TablaContenedor = document.getElementById("TablaContenedor");
        TablaContenedor.hidden = false;
        //Ocultar
        var contFormulario1 = document.getElementById("contFormulario1");
        contFormulario1.hidden = true;
        limpiarFormularioUno();
    }
    general.cerrarFormularioUno = cerrarFormularioUno;
    function limpiarFormularioUno() {
        //var campo0 = <HTMLInputElement>document.getElementById("IdAuto");
        var campo1 = document.getElementById("marca");
        var campo2 = document.getElementById("modelo");
        var campo3 = document.getElementById("precio");
        var campo4 = document.getElementById("cantidadPuerta");
        //campo0.value = "";
        campo1.value = "";
        campo2.value = "";
        campo3.value = "";
        campo4.value = "";
    }
    general.limpiarFormularioUno = limpiarFormularioUno;
    function guardarFormularioUno() {
        var campo0 = document.getElementById("IdAuto");
        var campo1 = document.getElementById("marca");
        var campo2 = document.getElementById("modelo");
        var campo3 = document.getElementById("precio");
        var campo4 = document.getElementById("cantidadPuerta");
        var atributo0 = parseInt(campo0.value);
        var atributo1 = campo1.value;
        var atributo2 = campo2.value;
        var atributo3 = parseInt(campo3.value);
        var atributo4 = parseInt(campo4.value);
        //Vemos si calcula ID
        var idCalculado = calcularaID();
        atributo0 = idCalculado;
        console.log("ID " + idCalculado);
        console.log(listaVehiculos);
        //
        var miAuto = new general.Auto(atributo0, atributo1, atributo2, atributo3, atributo4);
        listaVehiculos.push(miAuto);
        listaAuto.push(miAuto);
        agregarUnElemento1Grilla(miAuto, "cuerpo");
        limpiarFormularioUno();
    }
    general.guardarFormularioUno = guardarFormularioUno;
    //Formulario 2
    function abrirFormularioDos() {
        //Elementos Ocultados
        //Boton Abrir Formularios
        var btnAbrirFormulario2 = document.getElementById("btnAbrirFormulario2");
        btnAbrirFormulario2.hidden = true;
        var btnAbrirFormulario1 = document.getElementById("btnAbrirFormulario1");
        btnAbrirFormulario1.hidden = true;
        //Campo Buscar
        var btnTecla = document.getElementById("btnTecla");
        btnTecla.hidden = true;
        //Boton Salir Busqueda
        var btnSalirBusqueda = document.getElementById("btnSalirBusqueda");
        btnSalirBusqueda.hidden = true;
        //Lista
        var TablaContenedor = document.getElementById("TablaContenedor");
        TablaContenedor.hidden = true;
        //Muestra 
        var contFormulario2 = document.getElementById("contFormulario2");
        contFormulario2.hidden = false;
    }
    general.abrirFormularioDos = abrirFormularioDos;
    function cerrarFormularioDos() {
        //Elementos Mostrados
        //Boton Abrir Formularios
        var btnAbrirFormulario2 = document.getElementById("btnAbrirFormulario2");
        btnAbrirFormulario2.hidden = false;
        var btnAbrirFormulario1 = document.getElementById("btnAbrirFormulario1");
        btnAbrirFormulario1.hidden = false;
        //Campo Buscar
        var btnTecla = document.getElementById("btnTecla");
        btnTecla.hidden = false;
        //Boton Salir Busqueda
        var btnSalirBusqueda = document.getElementById("btnSalirBusqueda");
        btnSalirBusqueda.hidden = false;
        //Lista
        var TablaContenedor = document.getElementById("TablaContenedor");
        TablaContenedor.hidden = false;
        //Ocultar
        var contFormulario2 = document.getElementById("contFormulario2");
        contFormulario2.hidden = true;
        limpiarFormularioUno();
    }
    general.cerrarFormularioDos = cerrarFormularioDos;
    function limpiarFormularioDos() {
        //var campo0 = <HTMLInputElement>document.getElementById("IdCamioneta");
        var campo1 = document.getElementById("marcaCamioneta");
        var campo2 = document.getElementById("modeloCamioneta");
        var campo3 = document.getElementById("precioCamioneta");
        var campo4 = document.getElementById("tipo");
        //campo0.value = "";
        campo1.value = "";
        campo2.value = "";
        campo3.value = "";
        campo4.value = "";
    }
    general.limpiarFormularioDos = limpiarFormularioDos;
    function guardaFormularioDos() {
        var campo0 = document.getElementById("IdCamioneta");
        var campo1 = document.getElementById("marcaCamioneta");
        var campo2 = document.getElementById("modeloCamioneta");
        var campo3 = document.getElementById("precioCamioneta");
        var campo4 = document.getElementById("tipo");
        var atributo0 = parseInt(campo0.value);
        var atributo1 = campo1.value;
        var atributo2 = campo2.value;
        var atributo3 = parseInt(campo3.value);
        if (campo4.value == "SI") {
            var atributo4 = true;
        }
        else {
            var atributo4 = false;
        }
        //calcula ID
        var idCalculado = calcularaID();
        atributo0 = idCalculado;
        console.log("ID " + idCalculado);
        console.log(listaVehiculos);
        var miCamioneta = new general.Camioneta(atributo0, atributo1, atributo2, atributo3, atributo4);
        listaVehiculos.push(miCamioneta);
        listaCamioneta.push(miCamioneta);
        agregarUnElemento2Grilla(miCamioneta, "cuerpo");
        limpiarFormularioDos();
    }
    general.guardaFormularioDos = guardaFormularioDos;
    function calcularaID() {
        //El id se debe calcular buscando el id más alto de la lista de vehiculos y sumándole 1 (Utilizar reduce).
        var arrayID = listaVehiculos.reduce(function (idMayor, num) {
            if (idMayor < num.getId()) {
                idMayor = num.getId();
            }
            return idMayor;
        }, 0);
        return arrayID + 1;
    }
    function camposMostrados() {
        var id = document.getElementById("idCheck");
        var marca = document.getElementById("marcaCheck");
        var modelo = document.getElementById("modeloCheck");
        var precio = document.getElementById("precioCheck");
        if (id.checked) {
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(function (x) { x.hidden = false; });
        }
        else {
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(function (x) { x.hidden = true; });
        }
        ;
        if (marca.checked) {
            var tablaMarca = document.getElementsByName("marcaTabla");
            tablaMarca.forEach(function (x) { x.hidden = false; });
        }
        else {
            var tablaMarca = document.getElementsByName("marcaTabla");
            tablaMarca.forEach(function (x) { x.hidden = true; });
        }
        ;
        if (modelo.checked) {
            var tablaModelo = document.getElementsByName("modeloTabla");
            tablaModelo.forEach(function (x) { x.hidden = false; });
        }
        else {
            var tablaModelo = document.getElementsByName("modeloTabla");
            tablaModelo.forEach(function (x) { x.hidden = true; });
        }
        ;
        if (precio.checked) {
            var tablaPrecio = document.getElementsByName("precioTabla");
            tablaPrecio.forEach(function (x) { x.hidden = false; });
        }
        else {
            var tablaPrecio = document.getElementsByName("precioTabla");
            tablaPrecio.forEach(function (x) { x.hidden = true; });
        }
        ;
    }
    general.camposMostrados = camposMostrados;
    function clickGrilla(event) {
        var tdAccion = event.target.parentNode;
        var trClick = tdAccion.parentNode;
        //alert(trClick.childNodes[0].innerHTML);
        trClick.remove();
    }
    function procesarPromedio() {
        var resultado = calcularPromedio();
        var campoResultado = document.getElementById("promedio");
        campoResultado.value = resultado.toString();
    }
    general.procesarPromedio = procesarPromedio;
    function calcularPromedio() {
        var totalPrecio = listaVehiculos.reduce(function (total, num) {
            return total += num.getPrecio();
        }, 0);
        return totalPrecio / listaVehiculos.length;
    }
    general.calcularPromedio = calcularPromedio;
    function limpiarPromedio() {
        var elementoCalculado = document.getElementById("promedio");
        elementoCalculado.value = "";
    }
    general.limpiarPromedio = limpiarPromedio;
})(general || (general = {}));

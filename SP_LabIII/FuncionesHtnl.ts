/// <reference path="auto.ts" />
/// <reference path="camioneta.ts" />

namespace general{
    window.addEventListener("load", function () {
        //Formulario 1
        document.getElementById("btnGuardarFormulario1").addEventListener("click",general.guardarFormularioUno);
        document.getElementById("btnAbrirFormulario1").addEventListener("click", general.abrirFormularioUno);
        document.getElementById("btnCerrarFormulario1").addEventListener("click", general.cerrarFormularioUno);
        document.getElementById("limpiarFormulario1").addEventListener("click", general.limpiarFormularioUno);
        //Formulario 2
        document.getElementById("btnGuardarFormulario2").addEventListener("click",general.guardaFormularioDos);
        document.getElementById("btnAbrirFormulario2").addEventListener("click", general.abrirFormularioDos);
        document.getElementById("btnCerrarFormulario2").addEventListener("click", general.cerrarFormularioDos);
        document.getElementById("limpiarFormulario2").addEventListener("click", general.limpiarFormularioDos);
        // Para calcular y buscar
        document.getElementById("btnPromedio").addEventListener("click",general.procesarPromedio);
        document.getElementById("btnPromedioSalir").addEventListener("click",general.limpiarPromedio);
        document.getElementById("btnSalirBusqueda").addEventListener("click",general.SalirBusqueda);
        document.getElementById("tecla").addEventListener("keypress",buscarEnAtributo); 
        //Oculta campos
        document.getElementById("idCheck").addEventListener("change", camposMostrados);
        document.getElementById("marcaCheck").addEventListener("change", camposMostrados);
        document.getElementById("modeloCheck").addEventListener("change", camposMostrados);
        document.getElementById("precioCheck").addEventListener("change", camposMostrados);
    });
    
    var listaVehiculos: Array<Vehiculo> = new Array<Vehiculo>();
    var listaAuto: Array<Auto> = new Array<Auto>();
    var listaCamioneta: Array<Camioneta> = new Array<Camioneta>();
    
    var textoBuscar = ''
    
    
    export function buscarEnAtributo(letra){
        
        var txtTecla = <HTMLInputElement>document.getElementById("tecla");
        textoBuscar = txtTecla.value+letra.key;
        console.log(textoBuscar);
        if (textoBuscar != "") {
            //console.log("If");
            var contenedorPrincipalTabla = document.getElementById("contenedorPrincipalTabla");
            contenedorPrincipalTabla.hidden = true;
            var TablaBusqueda = document.getElementById("ContenedorTablaBusqueda");
            TablaBusqueda.hidden = false;
            var listaResultado = listaVehiculos.filter(objetoVehiculo => {
                return objetoVehiculo.getMarca() == textoBuscar;
            })
            //Borramos Grilla 
            var tbody = document.getElementById("cuerpoBusqueda");
            var tablaBusqueda = document.getElementById("grillaBusqueda");

            if (tbody.hasChildNodes()) {
                
                tablaBusqueda.removeChild(tbody);
                var tbodyBusqueda = document.createElement("tbody");
                tbodyBusqueda.setAttribute("id","cuerpoBusqueda");
                tablaBusqueda.appendChild(tbodyBusqueda);
            }
            buscarNombreFromulario1(textoBuscar);
            buscarNombreFromulario2(textoBuscar);
        }
    }
    export function SalirBusqueda(){
        console.log("SalirBusqueda");
        var TablaBusqueda = document.getElementById("ContenedorTablaBusqueda");
        TablaBusqueda.hidden = true;
        var contenedorPrincipalTabla = document.getElementById("contenedorPrincipalTabla");
        contenedorPrincipalTabla.hidden = false;
        var elementoBusqueda = <HTMLInputElement>document.getElementById("tecla");
        elementoBusqueda.value = "";
    }

    export function buscarNombreFromulario1(textoBuscar){
        //console.log("Entro a Fromulario 1");
        var listaResultadoFormulario1 = listaAuto.filter(objetoFormulario => {
            return objetoFormulario.getMarca() == textoBuscar;
        })
        console.log(listaResultadoFormulario1);
        armarGrillaFromulario1(listaResultadoFormulario1);
    }

    export function buscarNombreFromulario2(textoBuscar){
        //console.log("Entro a Fromulario 2");
        var listaResultadoFormulario2 = listaCamioneta.filter(objeto => {
            return objeto.getMarca() == textoBuscar;
        })
        console.log(listaResultadoFormulario2);
        armarGrillaFromulario2(listaResultadoFormulario2);
    }

    function agregarUnElemento1Grilla(miAuto,nombreTabla){
        var tbody = document.getElementById(nombreTabla);
        //Creo la fila
        var tr = document.createElement("tr");
        //Creamos las colunmnas
        var td0 = document.createElement("td");
        td0.setAttribute("name","idTabla");
        var nodotext0 = document.createTextNode(miAuto.getId());
        td0.appendChild(nodotext0);
        tr.appendChild(td0);

        var td1 = document.createElement("td");
        td1.setAttribute("name","marcaTabla");
        var nodotext1 = document.createTextNode(miAuto.getMarca());
        td1.appendChild(nodotext1);
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.setAttribute("name","modeloTabla");
        var nodotext2 = document.createTextNode(miAuto.getModelo()); 
        td2.appendChild(nodotext2);
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.setAttribute("name","precioTabla");
        var nodotext3 = document.createTextNode(miAuto.getPrecio().toString());
        td3.appendChild(nodotext3);
        tr.appendChild(td3);
        
        var TablaContenedor = document.getElementById("TablaContenedor");       
        
        if(TablaContenedor.hidden == true){
            var td4 = document.createElement("td");
            td4.setAttribute("name","accion");
            var nodotext4 = document.createTextNode("Eliminar");
            var nodoBoton = document.createElement("button");
            nodoBoton.setAttribute("class","cerrar");
            nodoBoton.setAttribute("name","botonEliminar");
            nodoBoton.appendChild(nodotext4);
            td4.appendChild(nodoBoton);
            tr.appendChild(td4);

            tr.addEventListener("click",clickGrilla);
        }
        
        tbody.appendChild(tr); 
    }

    function agregarUnElemento2Grilla(miCamioneta,nombreTabla){
        var tbody = document.getElementById(nombreTabla);
        //Creo la fila
        var tr = document.createElement("tr");
        //Creamos las colunmnas
        var td0 = document.createElement("td");
        td0.setAttribute("name","idTabla");
        var nodotext0 = document.createTextNode(miCamioneta.getId());
        td0.appendChild(nodotext0);
        tr.appendChild(td0);

        var td1 = document.createElement("td");
        td1.setAttribute("name","marcaTabla");
        var nodotext1 = document.createTextNode(miCamioneta.getMarca());
        td1.appendChild(nodotext1);
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.setAttribute("name","modeloTabla");
        var nodotext2 = document.createTextNode(miCamioneta.getModelo()); 
        td2.appendChild(nodotext2);
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.setAttribute("name","precioTabla");
        var nodotext3 = document.createTextNode(miCamioneta.getPrecio().toString());
        td3.appendChild(nodotext3);
        tr.appendChild(td3);
        
        var td4 = document.createElement("td");
        td4.setAttribute("name","accion");
        var nodotext4 = document.createTextNode("Eliminar");
        var nodoBoton = document.createElement("button");
        nodoBoton.setAttribute("class","cerrar");
        nodoBoton.setAttribute("name","botonEliminar");
        nodoBoton.appendChild(nodotext4);
        td4.appendChild(nodoBoton);
        tr.appendChild(td4);

        tr.addEventListener("click",clickGrilla);
        tbody.appendChild(tr); 
    }

    function armarGrillaFromulario1(listaResultado:Array<Auto>){
        //Cargamos Grilla
        listaResultado.forEach(function(miAuto ){
            agregarUnElemento1Grilla(miAuto,"cuerpoBusqueda");
        })
    }

    function armarGrillaFromulario2(listaResultado:Array<Camioneta>){
        //Cargamos Grilla
        listaResultado.forEach(function(miCamioneta ){
            agregarUnElemento2Grilla(miCamioneta,"cuerpoBusqueda");
        })
    }

    //Formulario 1
    export function abrirFormularioUno() {
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
    export function cerrarFormularioUno() {
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
    
    export function limpiarFormularioUno() {
        //var campo0 = <HTMLInputElement>document.getElementById("IdAuto");
        var campo1 = <HTMLInputElement>document.getElementById("marca");
        var campo2 = <HTMLInputElement>document.getElementById("modelo");
        var campo3 = <HTMLInputElement>document.getElementById("precio");
        var campo4 = <HTMLInputElement>document.getElementById("cantidadPuerta");
        
        //campo0.value = "";
        campo1.value = "";
        campo2.value = "";
        campo3.value = "";
        campo4.value = "";
    }

    export function guardarFormularioUno(){
        var campo0 = <HTMLInputElement>document.getElementById("IdAuto");
        var campo1 = <HTMLInputElement>document.getElementById("marca");
        var campo2 = <HTMLInputElement>document.getElementById("modelo");
        var campo3 = <HTMLInputElement>document.getElementById("precio");
        var campo4 = <HTMLInputElement>document.getElementById("cantidadPuerta");
        
        var atributo0:number = parseInt(campo0.value);
        var atributo1:string = campo1.value;
        var atributo2:string = campo2.value;
        var atributo3:number = parseInt(campo3.value);
        var atributo4:number = parseInt(campo4.value);
        //Vemos si calcula ID
        var idCalculado = calcularaID();
        atributo0 = idCalculado;
        console.log("ID " + idCalculado);
        console.log(listaVehiculos);
        //
        var miAuto:Auto = new Auto(atributo0,atributo1,atributo2,atributo3,atributo4);
        listaVehiculos.push(miAuto);
        listaAuto.push(miAuto);
        
        agregarUnElemento1Grilla(miAuto,"cuerpo");
        limpiarFormularioUno();
    }

    //Formulario 2
    export function abrirFormularioDos() { 
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
    export function cerrarFormularioDos() {
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
    
    export function limpiarFormularioDos() {
        //var campo0 = <HTMLInputElement>document.getElementById("IdCamioneta");
        var campo1 = <HTMLInputElement>document.getElementById("marcaCamioneta");
        var campo2 = <HTMLInputElement>document.getElementById("modeloCamioneta");
        var campo3 = <HTMLInputElement>document.getElementById("precioCamioneta");
        var campo4 = <HTMLInputElement>document.getElementById("tipo");
        
        //campo0.value = "";
        campo1.value = "";
        campo2.value = "";
        campo3.value = "";
        campo4.value = "";
    }

    export function guardaFormularioDos(){
        var campo0 = <HTMLInputElement>document.getElementById("IdCamioneta");
        var campo1 = <HTMLInputElement>document.getElementById("marcaCamioneta");
        var campo2 = <HTMLInputElement>document.getElementById("modeloCamioneta");
        var campo3 = <HTMLInputElement>document.getElementById("precioCamioneta");
        var campo4 = <HTMLInputElement>document.getElementById("tipo");
        
        var atributo0:number = parseInt(campo0.value);
        var atributo1:string = campo1.value;
        var atributo2:string = campo2.value;
        var atributo3:number = parseInt(campo3.value);
        if (campo4.value == "SI") {
            var atributo4:boolean = true;
        } else {
            var atributo4:boolean = false;
        }
        //calcula ID
        var idCalculado = calcularaID();
        atributo0 = idCalculado;
        console.log("ID " + idCalculado);
        console.log(listaVehiculos);
        
        var miCamioneta:Camioneta = new Camioneta(atributo0,atributo1,atributo2,atributo3,atributo4);
        listaVehiculos.push(miCamioneta);
        listaCamioneta.push(miCamioneta);
        agregarUnElemento2Grilla(miCamioneta,"cuerpo");
        limpiarFormularioDos();
    }

    function calcularaID():number{
        //El id se debe calcular buscando el id más alto de la lista de vehiculos y sumándole 1 (Utilizar reduce).
        var arrayID = listaVehiculos.reduce(function(idMayor,num){
            if (idMayor < num.getId()) {
                idMayor=num.getId();
            }
            return idMayor;
            },0);
        return arrayID+1;  
    }

    export function camposMostrados() {
        var id = <HTMLInputElement>document.getElementById("idCheck");
        var marca = <HTMLInputElement>document.getElementById("marcaCheck");
        var modelo = <HTMLInputElement>document.getElementById("modeloCheck");
        var precio = <HTMLInputElement>document.getElementById("precioCheck");
        
        if (id.checked){
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(x => { x.hidden = false; })
        } else {
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(x => { x.hidden = true; })        
        };

        if (marca.checked) {
            var tablaMarca = document.getElementsByName("marcaTabla");
            tablaMarca.forEach(x => { x.hidden = false; })
        } else {
            var tablaMarca = document.getElementsByName("marcaTabla");
            tablaMarca.forEach(x => { x.hidden = true; })
        };

        if (modelo.checked) {
            var tablaModelo = document.getElementsByName("modeloTabla");
            tablaModelo.forEach(x => { x.hidden = false; })
        } else {
            var tablaModelo = document.getElementsByName("modeloTabla");
            tablaModelo.forEach(x => { x.hidden = true; })
        };
        
        if (precio.checked) {
            var tablaPrecio = document.getElementsByName("precioTabla");
            tablaPrecio.forEach(x => { x.hidden = false; })
        } else {
            var tablaPrecio = document.getElementsByName("precioTabla");
            tablaPrecio.forEach(x => { x.hidden = true; })
        };
    }

    function clickGrilla(event){
        var tdAccion = event.target.parentNode;
        var trClick = tdAccion.parentNode; 
        //alert(trClick.childNodes[0].innerHTML);
        trClick.remove();
    }
    
    export function procesarPromedio(){
      var resultado = calcularPromedio();
      var campoResultado = <HTMLInputElement>document.getElementById("promedio");
      campoResultado.value = resultado.toString();
    }

    export function calcularPromedio()
    {
        var totalPrecio:number = listaVehiculos.reduce(function(total,num){ 
            return total += num.getPrecio()
        },0);             
        return totalPrecio / listaVehiculos.length;
    }
   

    export function limpiarPromedio(){
        var elementoCalculado = <HTMLInputElement>document.getElementById("promedio");
        elementoCalculado.value = "";
    }
}
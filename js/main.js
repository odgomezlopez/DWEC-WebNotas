//Importamos utilidades
import * as Utils from './Utils/utils.mjs'

//Importamos componentes
import {Notes} from './Components/Notes.mjs';

//Almacenado
import {LocalStorageHandle} from './DataManager/Local/LocalStorageHandle.mjs';

//Variables
let notas;
let notasLocal;
let storeKey="misNotas";

//Init
window.addEventListener("load", init);

//Función de init
function init() {
    //Obtengo referencias a los elementos
    let lista = document.getElementById("misNotas");
    let areaTexto = document.getElementById("nuevaNota");
    let botonAnadir = document.getElementById("anadir");
    let botonBorrarTodas = document.getElementById("borrarNotas");

    //Inicializamos
    notas=new Notes(lista,areaTexto,botonAnadir,botonBorrarTodas);
    notasLocal=new LocalStorageHandle(storeKey);

    //Cargamos notas
    cargarNotas();

    //Ejemplo de uso de eventos del navegador

   //1. Detectamos cierre pestaña
   window.addEventListener("beforeunload",guardarNotas);

   //2. Detectar entrada de nuevo en la pestaña y recargar. No se usa para guardar, pues a veces hay un poco de lag.
   Utils.detectarCambioVisibilidad(cargarNotas);

   //3. Detectar cambios bajo un nodo
   Utils.activarObservador(lista,guardarNotas);
}

//Funciones de conexión entre Notes y NotesStorageLocal
function cargarNotas(){
    notas.fromJSON(notasLocal.load());
}

function guardarNotas(){
    notasLocal.save(notas.toJSON());
}



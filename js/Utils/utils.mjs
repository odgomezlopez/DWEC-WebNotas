//crearNodo

function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result 
    template.innerHTML = html;
    return template.content.firstChild;
}

//detectar cambio de visibilidad
function detectarCambioVisibilidad(onEnter,onExit=function(){}){
    document.addEventListener("visibilitychange", () => { 
        if (document.hidden) {
            onExit();
        } else {
            onEnter();
        }
    });
}

//trabajo con observadores

function activarObservador(nodoAObservar,funcion){
    const targetNode = nodoAObservar; //Nodo a observar
    const config = { attributes: true, childList: true, subtree: true }; // Que observo de ese nodo
    const callback = funcion; //Función a llamar cuando ese cambio sucede

    let observer = new MutationObserver(callback); //Inicializo el observador
    observer.observe(targetNode, config); //Lo pongo en funcionamiento
    return observer
    //observer.disconnect();     // Paro de observar
    //observer.connect();
}

function desactivarObservador(observer){
    observer.disconnect();
}

//Trabajo con cache
/*storage = localStorage; //sessionStorage

function guardarCache(clave,contenido) {
    storage.setItem(clave, contenido);//JSON.stringify(notas)
}

function consultarCache(clave) {     
    return JSON.parse(storage.getItem('notasGuardadas'));
}*/

export {htmlToElement,detectarCambioVisibilidad,activarObservador,desactivarObservador};
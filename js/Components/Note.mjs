import { htmlToElement } from "../Utils/utils.mjs";

class Note {
    constructor(texto, destacada = false) {
        if (texto == "") throw new Error('No se pueden generar notas vacias');

        this.texto = texto;
        this.destacada = destacada;
        
        this.element = this.#createNoteNode(this.texto,this.destacada);
    }
    static newNoteNode(texto, destacada = false){
        return new Note(texto,destacada).element;
    }

    #createNoteNode(texto, destacada = false) {
        //1. Diseñamos el HTML y CSS. Se recomienda diseñarlo en la web y una vez listo moverlo aquí
        var html = /*html*/`<li class="cartaLi flex-grow-1">
            <div class="card p-2 my-2">
                <div class="card-body">
                    <p class="card-title">${texto}</p>
                    <button class="btn btn-secondary destacar"></a>
                    <button class="btn btn-secondary eliminar"></a>
                    <button class="btn btn-secondary subirNota"></a>
                    <button class="btn btn-secondary bajarNota"></a>
                </div>
            </div>
        </li>`;

        //2. Convertimos el HTML a un nodo
        let nodo = htmlToElement(html);

        //3. Asociamos eventos al nodo
        nodo.querySelector(".destacar").addEventListener("click", this.cambiarColor);
        nodo.querySelector(".eliminar").addEventListener("click", this.borrarNota);
        nodo.querySelector(".subirNota").addEventListener("click", this.subirNota);
        nodo.querySelector(".bajarNota").addEventListener("click", this.bajarNota);

        //4. Comprobamos si hay que cambiar el estilo
        if (destacada) this.cambiarColor();

        return nodo;
    }

    //Eventos. 
    cambiarColor(event) {
        event.target.parentNode.parentNode.classList.toggle('notaDestacada');
    }

    borrarNota(event) {
        let nodoBorrar = event.target.parentNode.parentNode.parentNode;
        nodoBorrar.parentNode.removeChild(nodoBorrar);
    }

    subirNota(event) {
        //muevo el nodo en el dom
        let nodoAMover = event.target.parentNode.parentNode.parentNode;
        let lista= nodoAMover.parentNode;

        if (nodoAMover.previousElementSibling != null) {
            lista.insertBefore(nodoAMover, nodoAMover.previousElementSibling);
        }
    }

    bajarNota(event) {
        let nodoAMover = event.target.parentNode.parentNode.parentNode;
        let lista= nodoAMover.parentNode;

        if (nodoAMover.nextElementSibling != null) {
            lista.insertBefore(nodoAMover, nodoAMover.nextElementSibling.nextElementSibling);
        }
    }
}

export { Note };
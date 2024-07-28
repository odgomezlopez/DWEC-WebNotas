import { Note } from './Note.mjs';
import * as SL from '../Utils/sort-list.mjs';

class Notes {
    #notesArea;
    #addButton;
    #removeAllButton;
    #textArea;

    constructor(notesArea, textArea, addButton, removeAllButton) {
        //Inicializaciones
        this.#notesArea = notesArea;
        this.#textArea = textArea;
        this.#addButton = addButton;
        this.#removeAllButton = removeAllButton;

        //===Asociacion de eventos===        

        //Nota trabajar con eventos en JS vanilla dentro de clases es algo "dificil", pues se solapan el this (de la clase) con el this (del nodo que lanzó el evento)

        //Opción 1. Bind https://www.w3schools.com/js/js_function_bind.asp
        this.#addButton.addEventListener('click', this.newNoteFromDOM.bind(this));
        this.#removeAllButton.addEventListener('click', this.deleteAllNotes.bind(this));

        //Opción 2. Funciones flecha
        //2.1. Uso directo de funciones flecha
        this.#textArea.addEventListener("input", () => this.checkTextArea());
        this.checkTextArea();

        //2.2. Declarar las funciones anonimas + flecha (https://dev.to/alecodesdancer/el-mundo-de-las-funciones-en-javascript-16n ): 
        //Ej. autoResize = () => { ... }
        this.#textArea.addEventListener('input', this.autoResize);
        this.autoResize();
    }


    //FUNCIONES PRINCIPALES
    newNoteFromDOM(event) {
        var texto = this.#textArea.value.replace(/\n\r?/g, '<br />');
        this.newNote(texto);
    }

    newNote(text, destacada = false) {
        //var nodo=new Note(text,destacada).element;
        var nodo = Note.newNoteNode(text, destacada);//Usando estaticos

        this.#notesArea.appendChild(nodo)
        SL.slist(this.#notesArea);
    }


    //borrar todas las notas
    deleteAllNotes(event) {
        while (this.#notesArea.firstChild) {
            this.#notesArea.removeChild(this.#notesArea.firstChild);
        }
    }

    //FUNCIONES DE USABILIDAD

    checkTextArea() {
        this.#addButton.disabled = (this.#textArea.value.length == 0);
    }

    autoResize = () => {
        var nodo = this.#textArea;
        var lineas = Math.max(nodo.value.split('\n').length, 3);
        nodo.setAttribute("rows", lineas);
    }

    //Funcionalidades de comunicación
    toJSON() {
        //1. Creamos una estructura de datos.
        const notesData = [];

        //2. Recorremos los hijos y recuperamos la información de las notas. Alternativamente, se podría tener una estructura paralela donde se guarde el estado en todo momento.
        for(let noteNode of this.#notesArea.childNodes){
            const text = noteNode.innerText.replace(/<br \/>/g, '\n'); // Convert <br /> back to newline
            const destacada = noteNode.classList.contains('notaDestacada'); // Check if note is highlighted

            notesData.push({ text, destacada });
        }

        //3. Convertimos a JSON.
        return JSON.stringify(notesData);
    }

    fromJSON(jsonString) {
        // 1. Parseamos el JSON
        const notesData = JSON.parse(jsonString);

        // 2. Limpiamos las notas actuales
        this.deleteAllNotes();

        // 3. Iteramos y añadimos
        for (let n of notesData) {
            this.newNote(n.text, n.destacada);
        }
    }
}

export { Notes };
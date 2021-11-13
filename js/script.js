// template per oggetto ToDo
class ToDo {
    title;
    description;
    state;
    expiry;

    constructor(title, description, state, expiry) {
        this.title = title;
        this.description = description;
        this.state = state;
        this.expiry = expiry;
    }
};

//possibili stati del ToDo
const states = {
    0: "inserito",
    1: "in elaborazione",
    2: "completato"
}

// array di ToDo
let toDoList = [];

//stampa in tabella ogni ToDo contenuto in toDoList
function printList() {
    toDoList.forEach((toDo) => {
        document.getElementById("toDoTable").innerHTML +=
            `<tr>
                <td> ${toDo.title} </td>
                <td> ${toDo.description} </td>
                <td> ${states[toDo.state]} </td>
                <td> ${toDo.expiry} </td>
            </tr>`;
    });
}

//chiude modal
function closeModal() {
    const modalForm = document.getElementById("modalForm");
    const modal = bootstrap.Modal.getInstance(modalForm);    
    modal.hide();
}

//ottiene input, crea ToDo e lo aggiunge alla toDoList
function createToDo() {

    // ottiene valori input
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const state = document.getElementById("state").value;
    const expiry = document.getElementById("expiry").value;

    // crea e aggiunge ad array 
    toDoList.push(new ToDo(title, description, state, expiry));

    //ristampa toDoList
    printList();

    closeModal();
}

function getToday() {

    // data giorno attuale
    let today = new Date();

    // ottiene giorno, mese, anno
    const dd = today.getDate();
    const mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();

    //formatta data
    if(dd < 10) dd='0'+dd;

    if(mm<10) mm='0'+mm;
    
    return mm + '-' + dd + '-' + yyyy;
}

//validazioni input

//controlli su data: min e default = oggi
function setDate() {
    let today = new Date();
    today = today.toISOString().split('T')[0];

    document.getElementById("expiry").value = today;
    document.getElementById("expiry").min = today;
}

setDate();
printList();


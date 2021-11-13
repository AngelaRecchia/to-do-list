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
    document.getElementById("tableBody").innerHTML = "";
    toDoList.forEach((toDo,index) => {
        document.getElementById("tableBody").innerHTML +=
            `<tr>
                <td> ${toDo.title} </td>
                <td> ${toDo.description} </td>
                <td> ${states[toDo.state]} </td>
                <td> ${toDo.expiry} </td>
                <td  class="actions">
                    <button type="button" class="btn btn-danger btn-sm" onClick="deleteToDo(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                <td>
            </tr>`;
    });
}

//chiude modal
function closeModal() {
    const modalForm = document.getElementById("modalForm");
    const modal = bootstrap.Modal.getInstance(modalForm);    
    modal.hide();
}

//ottiene input, crea ToDo, lo aggiunge alla toDoList
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

    clearForm();
    closeModal();
}

function deleteToDo(index) {
    toDoList.splice(index, 1);
    printList();
}

//cancella campi input
function clearForm() {
    document.getElementById("toDoForm").reset();
    setDate();
    return false;
}

//controlli su data: min e default = oggi
function setDate() {
    let today = new Date();
    today = today.toISOString().split('T')[0];

    document.getElementById("expiry").value = today;
    document.getElementById("expiry").min = today;
}


setDate();
printList();


// ToDos container
let toDoList = [];

// inputs html elements
let domEl = {
    title: document.getElementById("title"),
    description: document.getElementById("description"),
    state: document.getElementById("state"),
    expiry: document.getElementById("expiry")
}

// ToDo template
class ToDo {
    constructor(title, description, state, expiry) {
        //assign values to ToDo properties
        this.title = title;
        this.description = description;
        this.state = state;
        this.expiry = expiry;
    }

    //get ToDo position in array
    getIndex() {
        return toDoList.indexOf(this);
    }

    //prints a ToDO in table
    print() {
        const index = this.getIndex();
        document.getElementById("tableBody").innerHTML +=
            `<tr data-index=${index}>
                <td> ${this.title} </td>
                <td> ${this.description} </td>
                <td> ${this.state} </td>
                <td> ${this.expiry} </td>
                <td  class="actions">
                    <button type="button" class="btn btn-danger btn-sm" onClick="removeToDo(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalForm" onClick="setViewForm(${index})">
                        <i class="fas fa-eye"></i>
                    </button>
                <td>
            </tr>`;
    }

    //update ToDo after edit, validation
    edit() {
        const index = this.getIndex();
        const [...input] = getInputs();
        if (validate()) {
            this.title = title.value;
            this.description = description.value;
            this.state = state.value;
            this.expiry = expiry.value;
            this.printUpdated(index);
            closeModal();
        }       
    }

    //update changes to printed ToDo in table
    printUpdated(index) {
        const tableRow = document.querySelector("[data-index='" + index + "']");
            tableRow.innerHTML =
                `<td> ${this.title} </td>
                <td> ${this.description} </td>
                <td> ${this.state} </td>
                <td> ${this.expiry} </td>
                <td  class="actions">
                    <button type="button" class="btn btn-danger btn-sm" onClick="removeToDo(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalForm" onClick="setViewForm(${index})">
                        <i class="fas fa-eye"></i>
                    </button>
                    
                <td>`;
    }
};

//add ToDo to toDoList and print it, clear inputs fields and close modal with form
function createToDo() {
    const input = getInputs();

    if (validate()) {
        document.getElementById("toDoForm").classList.remove("was-validated");
        const toDo = new ToDo(...input);
        toDoList.push(toDo);
        toDo.print();
        closeModal();
    } 
}

//deletes ToDo from array, remove from screen
function removeToDo(index) {
    toDoList[index] = "";
    //delete from array: manage data-index in table row
    // toDoList.splice(index, 1);
    const tableRow = document.querySelector("[data-index='" + index + "']");
    tableRow.remove();  
}

function setCreateForm() {

    // clear form
    document.getElementById("toDoForm").reset();

    // set today date
    setDate();

    // set title
    document.getElementById("modalFormLabel").innerHTML = "Nuovo To-Do";

    // set action on save button
    document.getElementById("btnAction").onclick = createToDo;
    document.getElementById("btnAction").innerHTML = "Salva";

    setEditable();
    
}

// inject toDo info in modal - view 
function setViewForm(index) {
    
    setReadOnly();

    // get ToDo object
    const ToDo = toDoList[index];
    
    // set input values 
    document.getElementById("modalFormLabel").innerHTML = "Il tuo To-Do";
    
    domEl.title.value = ToDo.title;
    domEl.description.value = ToDo.description;
    domEl.state.value = ToDo.state;
    domEl.expiry = ToDo.expiry;

    // set edit button
    const setEditParams = function () {
        setEditForm(index);
    };
    
    document.getElementById("btnAction").onclick = setEditParams;
    document.getElementById("btnAction").innerHTML= "Modifica"; 
}

function setEditForm(index) {

    // get ToDo object
    const ToDo = toDoList[index];

    // set save button
    const goEdit = function () {
        ToDo.edit();
    };
    document.getElementById("btnAction").onclick = goEdit;
    document.getElementById("btnAction").innerHTML = "Salva";
    
    setEditable();
}

// set inputs as editable
function setEditable() {
    domEl.title.disabled = false;
    domEl.description.disabled = false;
    domEl.state.disabled = false;
    document.getElementById("expiry").disabled = false;
}

// set inputs as readonly
function setReadOnly() {
    document.getElementById("title").disabled = true;
    domEl.title.disabled = true;
    domEl.description.disabled = true;
    domEl.state.disabled = true;
    document.getElementById("expiry").disabled = true;
}

//chiude modal
function closeModal() {
    const modalForm = document.getElementById("modalForm");
    const modal = bootstrap.Modal.getInstance(modalForm);    
    modal.hide();
}

function getInputs() {
    // get inputs from form as elements
    const toDoForm = document.getElementById("toDoForm").elements;
    const { title, description, state, expiry } = toDoForm;
    
    return [ title.value, description.value, state.value, expiry.value ];
}


//datepicker: default  disables unaivailable dates
function setDate() {
    // get today date object
    let today = new Date();

    //format date
    today = today.toISOString().split('T')[0];

    //set default value
    document.getElementById("expiry").value = today;

    //disable dates older than today
    document.getElementById("expiry").min = today;
}

//validate form: title and description
function validate() {

    const [title, description] = getInputs();
    let valid = true;

    //title: required, max 100 characters
    if (!title || title.length > 100) {
        domEl['title'].classList.add("invalid");
        valid = false;
    } else domEl['title'].classList.add("valid");

    //description: required, max 500 characters
    if (!description|| description.length > 500) {
        domEl['description'].classList.add("invalid");
        valid = false;
    } else domEl['description'].classList.add("valid");

    if (!valid) document.getElementById("toDoForm").classList.add("was-validated");

    return valid;
}

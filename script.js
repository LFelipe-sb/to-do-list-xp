window.addEventListener('load', () => {
    preventFormSubmit();
    activateInput();
    render();
});

const inputName = document.querySelector('[data-new-list-input]');
let toDoItems = [];
let isEditable = false;
let currentIndex = null;

function preventFormSubmit() {
    function handleSubmit(event) {
        event.preventDefault();
    }
    document.querySelector('[data-new-list-form]')
    .addEventListener('submit', handleSubmit);
}

function activateInput() {
    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function handleTyping(event) {
    if(event.key === "Enter") {
        if(!inputName.value.trim()) {
            alert('Por favor, preencha um valor para adicinar!')
        } else if(isEditable) {
            toDoItems[currentIndex] = inputName.value;
        } else {            
            toDoItems.push(inputName.value);  
        }
        inputName.value = '';
        isEditable = false;
    } 
    render();
}

function buttonEdit(currentName, index) {
    function editItem() {
        isEditable = true;
        currentIndex = index;
        inputName.value = currentName;
        inputName.focus();
    }

    function deleteItem() {
        toDoItems.splice(index, 1);
        render();
    }

    const div = document.createElement('div');
    
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Editar';
    btnEdit.classList.add('btnEdit');  
    btnEdit.addEventListener('click', editItem);

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Remover';
    btnDelete.classList.add('btnDelete');  
    btnDelete.addEventListener('click', deleteItem);
    
    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    return div;
}

function nameSpan(currentName) {
    const span = document.createElement('span');
    span.textContent = currentName;
    return span;
}

function render() {
    const toDoList = document.querySelector('[data-lists]');
    toDoList.innerHTML = '';
    const ul = document.createElement('ul');
    for(let i = 0; i < toDoItems.length; i++) {
        const currentName = toDoItems[i];
        const li = document.createElement('li');
        const btnsActions = buttonEdit(currentName, i);
        const span = nameSpan(currentName);
        
        li.appendChild(btnsActions);
        li.appendChild(span);
        ul.appendChild(li);
    }
    toDoList.appendChild(ul);
}
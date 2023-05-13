import { toDoList } from "./src/js'/templates";

const input = document.querySelector("#input");
const createBtn = document.querySelector("#create");
const todosWrapper =document.querySelector("#todos-wrapper");


const api = "https://mega-to-do-app-61f0f-default-rtdb.asia-southeast1.firebasedatabase.app/todos";

// Events
createBtn.addEventListener("click", createToDo);
window.addEventListener("load", fetchTodos);
todosWrapper,addEventListener("click", complateTask)

// Functions
// -> post
async function createToDo(){
    const value = input.value.trim();
    if(!value) return;
    

    const res = await fetch(`${api}.json`, {
        method:"POST",
        headers:{
            "Content-type": "application/json",
        },

        body: JSON.stringify({
            task: value,
            done: false,
        })
    });

    const data = await res.json();
    input.value = "";
    
    fetchTodos()
}



// -> get
async function fetchTodos() {
    const res = await fetch (`${api}.json`);
    const data = await res.json();
    todosWrapper.innerHTML = ""
    for(let key in data) {
     todosWrapper.innerHTML += toDoList(data[key],key);
    }

}

// -> Put
async function complateTask (e) {
    const todoItem = e.target.parentElement.parentElement;
    if(!e.target.classList.contains("fa-check-circle"))return; 

    const complateStatus = JSON.parse(todoItem.getAttribute("done"));
    


    const res = await fetch(`${api}/${todoItem.id}.json`, {
        method:"PATCH",
        body: JSON.stringify({done: !complateStatus}),
    });

    fetchTodos()
}
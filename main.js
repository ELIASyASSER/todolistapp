const btnEl =  document.getElementById("btn");
const val = document.getElementById("inp");
const listEl = document.getElementById("items");



function handle(){
    if(val.value!== ''){
        toDoList(val.value.trim())
        val.value = ""

    }else{
        alert('ENTER A VALID VALUE')
    }
    
}

let tasks = [];

//check if there is tasks in local storage
if(localStorage.getItem('task')){
    tasks = JSON.parse(localStorage.getItem("task"))
}

function toDoList(task) {
    let taskobj = {
        id:Date.now(),
        title:task,
        completed:false
    }
    tasks.push(taskobj);

    addtasks(tasks);
    //add tasks to local storage
    addDataToLocalStorageFrom(tasks)
}

listEl.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete")){
        //remove it from the page
        e.target.parentElement.remove();
        //remove it from local storage
        deleteElementWith(e.target.parentElement.getAttribute('data-id'));
    }

    if(e.target.classList.contains("show")){
        e.target.classList.toggle("comp")
        // console.log(tasks);
        toggleStatuswith(e.target.getAttribute('data-id'));
    }
});

function addtasks(tasks){
    listEl.innerHTML = '';    
    
    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.classList.add("show");
        
        //check if the task is done
        if(task.completed){
            li.className = "show comp";    
        }
        li.setAttribute("data-id",task.id);
        li.appendChild(document.createTextNode(task.title));
                let btn = document.createElement('button');
                btn.classList.add('delete');
                btn.appendChild(document.createTextNode("Delete"));
                li.appendChild(btn);
                listEl.appendChild(li)
                
                });
            }
            
function addDataToLocalStorageFrom(arrayOfTasks){
        window.localStorage.setItem("task",JSON.stringify(arrayOfTasks))
}
            
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("task");
    if(data){
        let tasks = JSON.parse(data)
        // console.log(tasks);
        addtasks(tasks);
        
    }
}

getDataFromLocalStorage();




function deleteElementWith(id){
// console.log(tasks);
tasks = tasks.filter((t)=>   t.id != id);
addDataToLocalStorageFrom(tasks);

}
function toggleStatuswith(id){
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].id == id){
            tasks[i].completed == false ? (tasks[i].completed = true):(tasks[i].completed = false);
        };
        
    }
    addDataToLocalStorageFrom(tasks);
}

function delli() {
    listEl.innerHTML  ="";
    window.localStorage.clear();
}
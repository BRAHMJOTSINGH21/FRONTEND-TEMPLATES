var button = document.getElementById("btn");
var item = document.getElementById("item");
var ul = document.getElementById("ul");

var stored_text = localStorage.getItem("todoapp");
var array = [];
if (stored_text) {
    array = JSON.parse(stored_text);
}

array.forEach(function(todo) {
    addToDoDom(todo);
})
button.onclick = function() {
    var text = item.value;
    if (text) {
        addtext(text);
    }
}

item.addEventListener("keyup", function(event) {
    var text = item.value;

    if (text && event.keyCode === 13) {
        addtext(text)
    }
})


function addtext(text) {
    array.push(text);
    localStorage.setItem("todoapp", JSON.stringify(array));
    addToDoDom(text);
    item.value = "";
}

function addToDoDom(text) {
    var element = document.createElement("Li");
    element.innerText = text;

    var read = document.createElement("button");
    read.innerText = "Task Completed"

    read.addEventListener("click", readTodo)

    var delete_todo = document.createElement("button");
    delete_todo.innerText = "Delete"

    delete_todo.addEventListener("click", function(event) {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);

        var index = array.indexOf(text);
        array.splice(index, 1);

        localStorage.setItem("todoapp", JSON.stringify(array));
    })
    ul.appendChild(element);
    element.appendChild(read);
    element.appendChild(delete_todo);


}

function readTodo(event) {
    event.target.parentNode.style.textDecoration = "line-through";
    event.target.parentNode.removeChild(event.target);
}
document.addEventListener("DOMContentLoaded", function () {
  var todos = [];
  var filter = "all";

  const all = document.getElementById("all");
  const completed = document.getElementById("completed");

  all.addEventListener("click", function () {
    filter = "all";
    loadTodo();
  });

  completed.addEventListener("click", function () {
    filter = "completed";
    loadTodo();
  });

  function loadTodo() {
    if (filter === "all") {
      todoList.innerHTML = "";
      todos.forEach((e, i) => createTodoItem(e.title, e.status));
    } else if (filter === "completed") {
      todoList.innerHTML = "";
      const fil = todos.filter((t) => t.status === true);
      fil.forEach((e, i) => createTodoItem(e.title, e.status));
    }
  }
  var todoList = document.querySelector(".todo-list");

  todoList.addEventListener("click", handleTaskClick);

  var addTodoButton = document.querySelector(".add-todo");
  var addTodoInput = document.querySelector(".add-todo-input");

  addTodoButton.addEventListener("click", function () {
    var newTask = addTodoInput.value.trim();
    if (newTask !== "") {
      todos.push({ status: false, title: newTask });
      todos.sort((a, b) => {
        if (a.status) {
          return 1;
        }
        if (b.status) {
          return -1;
        }
      });
      loadTodo();
      addTodoInput.value = "";
    }
  });

  function createTodoItem(task, c) {
    var li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
        <input value=${task} type="checkbox">
        <p id=${task}>${task}</p>
        <i value=${task} class="material-icons">delete</i>
      `;
    if (c) {
      li.classList.add("checked");
    }
    todoList.appendChild(li);
  }

  function handleTaskClick(event) {
    var target = event.target;
    if (target.tagName === "INPUT" && target.type === "checkbox") {
      let todo = todos.find((t) => t.title === event.target.value);
      todo.status = true;
      todos.sort((a, b) => {
        if (a.status) {
          return 1;
        }
        if (b.status) {
          return -1;
        }
      });
      console.log(todos);

      var listItem = target.closest("li");
      if (listItem) {
        listItem.classList.toggle("checked");
      }
      loadTodo();
    } else if (target.tagName === "I" && target.innerText === "delete") {
      let todo = todos.find((t) => t.title === target.getAttribute("value"));
      console.log(todo);
      todos = todos.filter((t) => t.title != todo.title);
      console.log(todos);
      loadTodo();
      var listItem = target.closest("li");
      if (listItem) {
        listItem.remove();
      }
    }
  }
});

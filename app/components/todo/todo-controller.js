import TodoService from "./todo-service.js";

const _todoService = new TodoService()

function _drawTime() {
   // var myVar =
    setInterval(myTimer, 1000);

    function myTimer() {
        var d = new Date();
        document.getElementById("time").innerHTML = d.toLocaleTimeString();
    }
}

function _drawTodos() {
    let todos = _todoService.Todos
    let template = ""
    for (var j = 0; j < todos.length; j++) {
        var todoItem = todos[j]
        if (todoItem.completed == false) {
            template += `
				<div><input type="checkbox" id="${todoItem._id}" onclick="app.controllers.todoController.toggleTodoStatus('${todoItem._id}')"> ${todoItem.description}</div>
				`
        } else {
            template += `
				<div><input type="checkbox" id="${todoItem._id}" onclick="app.controllers.todoController.toggleTodoStatus('${todoItem._id}')" checked><span class="todoFormat"> ${todoItem.description.strike()}</span>
				<i onclick="app.controllers.todoController.removeTodo('${todoItem._id}')"class="fas fa-trash-alt"></i></div>
				`
        }
    }
    document.getElementById('todolist').innerHTML = template
	//WHAT IS MY PURPOSE?
}

function _drawError() {
	console.error('[TODO ERROR]', _todoService.TodoError)
	//document.querySelector('#todo-error').textContent = `${_todoService.TodoError.message}`
}


export default class TodoController {
	constructor() {
       // _todoService.addSubscriber('error', _drawError)
        _todoService.addSubscriber('todos', _drawTodos)
        _todoService.getTodos()
        _drawTime()
		// Don't forget to add your subscriber
	}

    addTodo(e) {
        e.preventDefault()
        var form = e.target
        // TAKE THE INFORMATION FORM THE FORM
        var todo = {
            description: form.description.value,
            completed: false,
            user: 'Jasper'
            // DONT FORGET TO BUILD YOUR TODO OBJECT
        }
        form.reset()
        //PASSES THE NEW TODO TO YOUR SERVICE
        //DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
        //YOU SHOULDN'T NEED TO CHANGE THIS
        //^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT

        _todoService.addTodo(todo)
    }

	toggleTodoStatus(todoId) {
		// asks the service to edit the todo status
        _todoService.toggleTodoStatus(todoId)
    }

    removeTodo(todoId) {
		// ask the service to run the remove todo with this id
        _todoService.removeTodo(todoId)
    }



}

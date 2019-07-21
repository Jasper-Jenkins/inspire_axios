import Todo from "../../models/todo.js";

// @ts-ignore
const todoApi = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Jasper/todos',
	timeout: 5000
});

let _state = {
	todos: [],
	error: {},
}
let _subscribers = {
	todos: [],
	error: []
}

function deleteElemFromArray(arr, objId) {
    var i = arr.length
    for (var j = 0; j < i; j++) {
        let objectId = arr[j]._id
        if (objectId == objId) { 
            arr.splice(j, 1)
            break;
        }    
    }
    return arr
}
function _setState(prop, data) {

	_state[prop] = data
    _subscribers[prop].forEach(fn => fn())

    console.log("Current State", _state)
}

export default class TodoService {
    
	get TodoError() {
		return _state.error
    }

    get Todos() {
        console.log("GET TODOS from class state", _state.todos)
        return _state.todos
    }
    
	addSubscriber(prop, fn) {
		_subscribers[prop].push(fn)
	}

	getTodos() {
		console.log("Getting the Todo List")
		todoApi.get()
            .then(res => {
                console.log("Here is the GET request for todos", res.data.data)
                let todos = res.data.data.map(t => new Todo(t))
                _setState("todos", todos)
				// WHAT DO YOU DO WITH THE RESPONSE?
			})
            .catch(err => _setState('error', err.response.data))
	}

    addTodo(todo) {
        console.log("Post request starting in the service")
        todoApi.post('', todo)
            .then(res => {
              //  console.log("Here is the POST request response: ", res.data.data)
               // let newTodo = res.data.data.map(t => new newTodo(t))
            //    let newTodos = this.Todos()
           //     newTodos.push(newTodo)
              // _setState("todos", newTodos)
              //  console.log("Response being mapped: ", newTodo);
                //   WHAT DO YOU DO AFTER CREATING A NEW TODO?
            })
			.catch(err => _setState('error', err.response.data))
	}

	toggleTodoStatus(todoId) {
		let todo = _state.todos.find(todo => todo._id == todoId)
		// Be sure to change the completed property to its opposite
		// todo.completed = !todo.completed <-- THIS FLIPS A BOOL
        todo.completed = !todo.completed
		todoApi.put(todoId, todo)
			.then(res => {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
			})
			.catch(err => _setState('error', err.response.data))
	}

	removeTodo(todoId) {
		// This one is on you to write.... 
		// The http method is delete at the todoId
        _setState("todos", deleteElemFromArray(this.Todos, todoId))
        todoApi.delete(todoId)
            .then(res => {
                console.log("Response from delete: ", res)
         //       _state.todos = deleteElemFromArray(todos, objId)
            })
            .catch(err => _setState('error', err.response.data))
	}

}

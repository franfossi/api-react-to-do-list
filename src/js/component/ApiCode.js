const fetch = require("node-fetch");
const baseUrl = "https://assets.breatheco.de/apis/fake/todos";
const getTodos = async (username) => {
    const response = await fetch(`${baseUrl}/user/${username}`);
    try {
        if (response.ok) {
            const todoList = await response.json();
            console.log(todoList);
        } else {
            console.log(`response: ${response.status} ${response.statusText}`);
        }
    } catch(error) {
        console.log(`error!!!!!: ${error}`);
    }
}

const createList = async (username) => {
    const response = await fetch(`${baseUrl}/user/${username}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json"
        }
    });
    try {
        if (response.ok) {
            getTodos(username);
        } else {
            console.log(`response: ${response.status} ${response.statusText}`);
        }
    } catch(error) {
        console.log(`error!!!!!: ${error}`);
    }
}

const updateList = async (username, todos) => {
    const response = await fetch(`${baseUrl}/user/${username}`, {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
            "Content-Type": "application/json"
        }
    });
    try {
        if (response.ok) {
            getTodos(username);
        } else {
            console.log(`response: ${response.status} ${response.statusText}`);
        }
    } catch(error) {
        console.log(`error!!!!!: ${error}`);
    }
}
updateList("ernestom5584", [
    {
        label: "tarea 1",
        done: false
    },
    {
        label: "tarea 2",
        done: false
    }
]);
// createList("ernestom5584");
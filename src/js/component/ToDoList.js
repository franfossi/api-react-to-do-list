import React, { useState, useEffect } from "react";

// No es necesario => const fetch = require("node-fetch");

// Direccion de end-point base de la API
const baseURL = "https://assets.breatheco.de/apis/fake/todos/";

//create your first component
export function ToDoList(props) {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [userIsReady, setUserIsReady] = useState(false);

	// En esta constante se guardan las tareas
	//const handleSubmit = () => {
	//	setTasks([...tasks, task]);
	//	setTask("");
	//};

	// Aqui seleccionamos la tarea a borrar

	//const handleDelete = indexToDelete => {
	//	const newTasks = tasks.filter((task, index) => {
	//		return index != indexToDelete;
	//	});
	//	setTasks(newTasks);
	//};

	// Funciones para la API

	// Agregar nuevas tareas
	const addNewTask = async () => {
		// fetch PUT con la lista + tarea nueva
		try {
			console.log(`data antes de actualizar la api: ${tasks}`);
			let response = await fetch(`${baseURL}user/franfossi`, {
				//mode: "no-cors",
				method: "PUT",
				body: JSON.stringify([...tasks, { label: task, done: false }]),
				headers: {
					"Content-Type": "application/json"
					//"Access-Control-Allow-Origin": "*"
				}
			});
			if (response.ok) {
				// hago fetch y actualizo el estado tasks
				let responseII = await fetch(`${baseURL}user/franfossi`);
				// verificamos la respuesta del get
				if (responseII.ok) {
					// desjsonificamos el body de la respuesta
					let updatedTasks = await responseII.json();
					// actualizamos el estado tasks
					setTasks(updatedTasks);
					setTask("");
				} else {
					alert("Algo pasó con el GET!");
				}
			} else {
				// alert que hay un error
				alert("Algo pasó con el PUT!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Eliminar una tarea
	async function handleDelete(key) {
		let filteredList = tasks.filter((currentValue, index) => {
			return index != key;
		});
		let response = await fetch(`${baseURL}user/franfossi`, {
			//mode: "no-cors",
			method: "PUT",
			body: JSON.stringify(filteredList),
			headers: {
				"Content-Type": "application/json"
				//"Access-Control-Allow-Origin": "*"
			}
		});
		if (response.ok) {
			// hago fetch y actualizo el estado tasks
			let responseII = await fetch(`${baseURL}user/franfossi`);
			// verificamos la respuesta del get
			if (responseII.ok) {
				// desjsonificamos el body de la respuesta
				let updatedTasks = await responseII.json();
				// actualizamos el estado tasks
				setTasks(updatedTasks);
			} else {
				alert("Algo pasó con el GET!");
			}
		} else {
			// alert que hay un error
			alert("Algo pasó con el PUT!");
		}
	}

	// Eliminar todas las tareas
	async function deleteAll() {
		try {
			let response = await fetch(`${baseURL}user/franfossi`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				setTasks([]);
				setUserIsReady(false);
			} else {
				alert("Delete all es un problema");
			}
		} catch (error) {
			console.log(error);
		}
	}

	// Chequear si el usuario existe o agregar uno nuevo
	useEffect(
		() => {
			console.log("SOY EL USE-EFFECT DE TODOLIST");
			// verificar si existe el usuario.
			const getTasksForUser = async () => {
				// actualizar la lista de tareas de ese usuario.
				let getResponse = await fetch(`${baseURL}user/franfossi`);
				// verificamos la respuesta del get
				if (getResponse.ok) {
					// desjsonificamos el body de la respuesta
					let updatedTasks = await getResponse.json();
					// actualizamos el estado tasks
					setTasks(updatedTasks);
				} else {
					alert("Algo pasó con el GET del use effect!");
				}
			};
			const verifyUser = async () => {
				try {
					let response = await fetch(`${baseURL}user/franfossi`);
					if (response.status == 404) {
						// crear el usuario
						console.log("el usuario no existe, se creará");
						let createUserResponse = await fetch(
							`${baseURL}user/franfossi`,
							{
								//mode: "no-cors",
								method: "POST",
								headers: {
									"Content-Type": "application/json"
									//"Access-Control-Allow-Origin": "*"
								},
								body: JSON.stringify([])
							}
						);
						if (!createUserResponse.ok) {
							alert("algo salió mal creando al usuario.");
						}
					}
					setUserIsReady(true);
					getTasksForUser();
				} catch (error) {
					console.log(error);
					return false;
				}
			};
			if (!userIsReady) {
				verifyUser();
			} else {
				getTasksForUser();
			}
		},
		[userIsReady, baseURL]
	);

	useEffect(() => {
		console.log("useEffect que solo se ejecuta la primera vez");
	}, []);

	//useEffect(() => {
	//	console.log("useEffect que se ejecuta siempre!!");
	//});

	return (
		<div className="container">
			<div className="d-flex flex-column justify-content-center p-5 mt-5">
				<h1 className="m-auto text-center p-1 title">
					<font size="+6">to-dos</font>
				</h1>

				<div className="col todoList">
					<ul className="m-auto list-group list-group">
						<li className="list-group-item d-flex justify-content-between align-items-center liHeader">
							<input
								type="text"
								placeholder="What's to be done?"
								value={task}
								onChange={e => setTask(e.target.value)}
							/>

							<button
								type="button"
								className="btn btn-light btn-sm"
								onClick={e => addNewTask()}>
								{"Add"}
							</button>
						</li>

						{tasks.map((task, index) => {
							return (
								<div key={"index"}>
									<li
										className="list-group-item d-flex justify-content-between align-items-center myLI"
										onClick={event => handleDelete(index)}>
										{task.label}
										<span className="badge badge-light badge-pill">
											X
										</span>
									</li>
								</div>
							);
						})}

						<li className="list-group-item d-flex justify-content-between align-items-center liFooter">
							<span>
								<small>{tasks.length} </small>
								items Left
							</span>
							<button
								type="button"
								className="btn btn-light btn-sm"
								onClick={e => deleteAll()}>
								{"Delete all"}
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

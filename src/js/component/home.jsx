import React, { useEffect, useState } from "react";//include images into your bundle//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDos, setToDos] = useState([]);
	useEffect(() => {
		takeList() }, [])
	useEffect(() => { 
		sendList() }, [toDos]);

	const takeList = async () => {
		try {
			const previewResponse = await fetch(
				'https://playground.4geeks.com/apis/fake/todos/user/pametr88'
			)
			if (!previewResponse.ok) {
				throw Error(previewResponse.statusText);
			}
			const transform = await previewResponse.json()
			setToDos(transform)
		}
		catch (e) {
			console.log("error", e)
		}
	}
	const sendList = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/pametr88', {
				
				method: "PUT",
				body: JSON.stringify(toDos),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (!response.ok) {
				throw Error(response.statusText);
			} 
			const transform = await response.json()
			console.log(transform.msg)

			return transform
		}
		catch (e) { }
	}
	const pressEnter = async (e) => {
		try {
			if (e.key === "Enter" && inputValue !== "") {

				let obj = {
					label: inputValue,
					done: false
				}
				
				setToDos([...toDos, obj]);
				setInputValue(""); 
				
				const final = await sendList()
				console.log("informacion enviada", final)
			}
		}
		catch (e) {
			console.log("Hubo un error", e)
		}
	}

	return (<div className="Container">
				<h1 className="title">To Do List</h1>
				<ul className="list-group">
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => pressEnter(e)}
						placeholder="What do you need to do?" />
						
					{toDos.map((item, index) => (
					<li className="list-group-item li-c" key={index}>
						{item.label}
						<button onClick={() => {
							const updatedToDos = toDos.filter(
								(_, currentIndex) => index != currentIndex
							); 
						
						setToDos(updatedToDos);
						}}>
						<i className= "fa-solid fa-trash-can"></i>
						</button>
					</li>
					))}
				</ul>
				<div className="items">{toDos.length} items left</div>
			</div>
	    );
};
export default Home;
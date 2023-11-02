import React, { useState, useEffect } from "react";
const Home = () => {
//include images into your bundle
const [task, setTask] = useState({ "label": "", "done": false })
const [taskList, setTaskList] = useState([])
// const cambio = (e) => {
// 	setTask({ ...task, "label": e.target.value }
// 	)
// }
const getTask = async () => {
	try {
		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/pametr88");
		if(response.ok){
			let data = await response.json();
			setTaskList(data)
		}
	}
	catch (error) {
		console.log("Error:", error);
	}
}
useEffect(() => {
	getTask();
}, [])
//create your first component

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">TO DO LIST</h1>
			<input type="text" placeholder="agrega la tarea"/>
			<ul>
				{taskList.map((item,index)=>{
					return (
						<li key={index}>{item.label}</li>
					)
				})}				
			</ul>
		</div>
	);
};

export default Home;

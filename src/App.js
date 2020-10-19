import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";


function App() {

  const url = 'http://localhost:4500'
  const [dogs, setDogs] = useState([]);
  
  //for form
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }
  //for update
  const [selectedDog, setSelectedDog] = useState(emptyDog);

  const getDogs = () => {fetch(url + '/dog/')
  .then(res => res.json())
  .then(data=>{
    setDogs(data)
  })
  }

  useEffect(()=>getDogs(), [])

  //handleCreate functions for creating new dogs in form.js
  const handleCreate = newDog => {
    fetch(url + '/dog/', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog)
    })
    .then((res)=>{
      //don't need response from the post but will be using .then to update the list
      getDogs()
    })
  }

  //handleUpdate function for updating dogs
  const handleUpdate = (dog) => {
    fetch(url+'/dog/'+dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    }).then((res)=>{
      getDogs()
    })
  }

  const selectDog = (dog) => {
    setSelectedDog(dog)
  }

  return (
		<div className='App'>
			<h1>DOG LISTING SITE</h1>
			<hr />
      <Link to='/create'>
        <button>CREATE A DOG</button>
      </Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => <Display {...rp} dogs={dogs} selectDog={selectDog} />}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form {...rp} label='create' dog={emptyDog} handleSubmit={handleCreate} />
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form {...rp} label='update' dog={selectedDog} handleSubmit={handleUpdate} />
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;

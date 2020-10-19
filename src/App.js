import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";


function App() {

  const url = 'http://localhost:4500'
  const [dogs, setDogs] = useState([]);

  const getDogs = () => {fetch(url + '/dog/')
  .then(res => res.json())
  .then(data=>{
    setDogs(data)
  })
  }

  useEffect(()=>getDogs(), [])



  return (
		<div className='App'>
			<h1>DOG LISTING SITE</h1>
			<hr />
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => <Display {...rp} dogs={dogs} />}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form {...rp} label='create' dog={{}} handleSubmit={() => {}} />
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form {...rp} label='update' dog={{}} handleSubmit={() => {}} />
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;

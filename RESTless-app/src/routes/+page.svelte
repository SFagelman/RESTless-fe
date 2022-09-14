<script>
	import Nav from '../nav.svelte';
	import Login from '../Login.svelte';
	import { setContext } from 'svelte';
	import { Router, Link, Route } from 'svelte-routing';
	import Explore from './Explore.svelte';
	import Home from './Home.svelte';
	import Workouts from './Workouts.svelte';
	import CurrentWorkout from './Current-Workout.svelte';
	import AddNewWorkout from './Add-New-Workout.svelte';
	import EditWorkout from './Edit-workout.svelte';

	setContext('activeUser', { _id: 'none', user_name: 'None', user_password: 'none' });
	export let url = '';
</script>

<div class="home-container">
	<Router {url}>
		<Nav />
		<Login />
		<Route path="/"><Home /></Route>
		<Route path="workouts" component={Workouts} />
		<Route path="explore" component={Explore} />
		<Route path="current-workout" component={CurrentWorkout} />
		<Route path="edit-workout" component={EditWorkout} />
		<Route path="add-new-workout" component={AddNewWorkout} />
	</Router>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		text-align: center;
		font-family: 'Raleway', sans-serif;
		text-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
	}

	.home-container {
		justify-content: center;
		background-position: center;
		padding: 3vw;
		width: 360px;
		height: 740px;
		background-color: #ffffff;
		background-image: url('../diamond-upholstery.png');
	}

	:global(.main-panel) {
		color: lightgrey;
		background-color: rgb(143, 52, 52);
		text-decoration: none;
		width: 100%;
		padding: 0.5rem;
		border-radius: 0.3cm;
	}

	:global(.sub-panel) {
		color: black;
		background-color: lightgrey;
		text-decoration: none;
		width: 80%;
		padding: 0.3rem;
		border-radius: 0.9cm;
	}

	:global(.panel) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: #8f3434;
		border-radius: 4px;
		text-decoration: none;
		text-transform: capitalize;
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		border: 2px solid #000000;
		border-radius: 0.3cm;
	}

	:global(button) {
		width: 100%;
		padding: 0.5rem;
		color: black;
		font-size: 1rem;
	}

	:global(*::-webkit-scrollbar) {
		width: 10px;
	}

	:global(*::-webkit-scrollbar-track) {
		background: rgb(100, 100, 100);
		border-radius: 10px;
	}

	:global(*::-webkit-scrollbar-thumb) {
		background-color: #8f3434;
		border-radius: 30px;
	}
</style>

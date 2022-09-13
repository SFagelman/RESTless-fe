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
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		text-align: center;
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
			sans-serif;
	}

	.home-container {
		justify-content: center;
		background: whitesmoke;
		min-height: 100vh;
		padding: 5vw;
	}

	:global(.main-panel) {
		color: white;
		background-color: red;
		text-decoration: none;
		width: 100%;
		padding: 0.5rem;
	}

	:global(.sub-panel) {
		color: black;
		background-color: lightgrey;
		text-decoration: none;
		width: 100%;
		padding: 0.5rem;
	}

	:global(.panel) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: red;
		text-decoration: none;
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.5rem;
	}

	:global(button) {
		width: 100%;
		padding: 0.5rem;
		color: black;
		font-size: 1rem;
	}
</style>

<script>
	import Nav from '../nav.svelte';
	import Login from '../Login.svelte';
	import {setContext} from 'svelte';
	import { Router, Link, Route} from "svelte-routing"
	import Explore from './Explore.svelte';
	import Home from './Home.svelte';
import Workouts from './Workouts.svelte';
import CurrentWorkout from './Current-Workout.svelte';
import AddNewWorkout from './Add-New-Workout.svelte';
import EditWorkout from './Edit-workout.svelte';

	setContext('activeUser',{_id: 'none', user_name: 'None', user_password: 'none'});
	export let url = "";
</script>

<div class="home-container">

	<Router url="{url}">
	<Nav />
	<Login/>
	<Route path="/"><Home/></Route>
	<Route path="workouts" component="{Workouts}"/>
	<Route path="explore" component="{Explore}"/>
	<Route path="current-workout" component="{CurrentWorkout}"/>
	<Route path="edit-workout" component="{EditWorkout}"/>
	<Route path="add-new-workout" component="{AddNewWorkout}"/>
	</Router>
	<h1>Home</h1>
	<div class="button-container">
		<button class="home-buttons"><a href="/workouts">Choose Workout</a></button>
		<button class="home-buttons explore"><a href="/explore">Explore</a></button>
	</div>
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.home-container {
		justify-content: center;
		background: grey;
		min-height: 100vh;
	}

	.home-buttons {
		display: block;
		padding: 2rem 6rem;
		font-size: 1.8rem;
		font-family: 'Courier New', Courier, monospace;
		background: #00adb5;
		border-color: #eeeeee;
		border-radius: 12px;
		margin: 15px 0px;
		width: 100%;
	}
	.button-container {
		padding: 0px 20px;
	}
</style>

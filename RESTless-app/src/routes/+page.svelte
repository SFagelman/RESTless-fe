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
		padding: 5vw;
	}
</style>

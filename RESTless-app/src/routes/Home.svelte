<script>
	import { onMount } from 'svelte';
	import {fetchAllExercises} from '../api';
	import {Link} from "svelte-routing"
	let data = [];

	onMount(async () => {
		const result = await fetchAllExercises();
		data = result.data;
		
	});

</script>

<div class="home-container">
	<h1>Home</h1>
	<Link to="/workouts">Choose Workout</Link>
	<Link to="/explore">Explore</Link>
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
	.filter-title{
		text-align: center;
	}
	.filter-exercises{
		border: 3px black solid;
		display: flex;
		justify-content: space-between;
		padding: 2px;

	}
	.dropdown{
		width: 90px;
		margin: 2px;
	}

	.exercises-list{
		font-size: 1rem;
		font-family: 'Courier New', Courier, monospace;
		list-style: none;
	
 	}

	.exercises-list li{
		border: 3px black solid;
		display: flex;
		justify-content: space-between;
		margin: 10px;
	

	}
	.exercises-list section{
		display: flex;
		flex-direction: column;
	
	}
	
	.exercises-list li img{
		width: 100px;
		padding-bottom: 2px;
		
		
	}
	
</style>

<script>
import { afterUpdate, getContext, onMount } from "svelte";
import { Link } from "svelte-routing";
import { fetchAllWorkouts } from "../api";

let data = [];

let currentUser = getContext('activeUser');

onMount(async () => {
		
		const result = await fetchAllWorkouts(currentUser.user_name);
		console.log(result);
		data = result.data;
		
	});

</script>

<div class="home-container">

	<h1>Workouts Selection</h1>
	<div class="button-container">
		<Link to="current-workout">Select</Link>
		<Link to="edit-workout">Edit</Link>
		<button class="home-buttons">Workout 2</button>
		<Link to="add-new-workout">Add New</Link>
	</div>

	<ul class="exercises-list" {data}>
		{#each data as workout}

		<li>
		<section>
		<h3>{workout.name}</h3>
		</li>
			
		{/each}
	</ul>
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

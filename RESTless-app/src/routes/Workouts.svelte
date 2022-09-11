<script>
import { Link } from "svelte-routing";
import { fetchAllWorkouts } from "../api";
import {currentUser, currentWorkout} from "../stores.js";
import {link, navigate} from "svelte-routing"


$: data = fetchAllWorkouts($currentUser.user_name).then((result) => {
	if(result.data.workouts){
		return result.data.workouts;
	} else {
		return [];
	}
})

const setWorkoutAndRedirect = (workout,route) => {
	$currentWorkout = workout;
	navigate(route);
}


</script>

<div class="home-container">

	<h1>Workouts Selection</h1>

	{#await data}
		<p>Getting workouts</p>
	{:then data}
		{#if $currentUser.user_name === 'None'}
			<p>Please login to view workouts</p>
		{:else}
			<ul class="exercises-list" {data}>
				{#each data as workout}

				<li class="panel">
					<h3>{workout.workout_name}</h3>
					<section>
						<button on:click={() => setWorkoutAndRedirect(workout,'current-workout')}>Select</button>
						<button on:click={() => setWorkoutAndRedirect(workout,'edit-workout')}>Select</button>
					</section>
				</li>
				{/each}
				<Link to="add-new-workout">Add New</Link>
			</ul>
		{/if}
	{:catch error}
		<p style="color:red">{error.message}</p>
	{/await}

	
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

	.panel {
		border: 3px black solid;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2px;
	}

	.panel section {
		display: flex;
		width: 100%;
		border: 2px solid red;
		justify-content: space-around;
	}
	
</style>

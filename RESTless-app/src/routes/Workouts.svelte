<script>
import { fetchAllWorkouts, postNewWorkout, fetchWorkoutPlans } from "../api";
import {currentUser, currentWorkout} from "../stores.js";
import {navigate} from "svelte-routing"
import { useForm, validators, HintGroup, Hint, required } from "svelte-use-form";


$: data = fetchAllWorkouts($currentUser.user_name).then((result) => {
	if(result.data.workouts){
		return result.data.workouts;
	} else {
		return [];
	}
})

$: plansData = fetchWorkoutPlans().then((result) => {
	return result.data.workoutPlans;
})

let premadeWorkoutsVisible = "Show";

const togglePremadeWorkouts = () => {
	if(premadeWorkoutsVisible === "Show"){
		premadeWorkoutsVisible = "Hide";
	} else {
		premadeWorkoutsVisible = "Show";
	}
}

const setWorkoutAndRedirect = (workout,route) => {
	$currentWorkout = workout;
	navigate(route);
}

let newWorkoutPanel = false;
const showHideNewWorkout = () => {
	newWorkoutPanel = !newWorkoutPanel;
}

const form = useForm();
let postWorkoutError = false;

const handleOnSubmit = async (event) => {
		event.preventDefault();
		const workoutName = event.target[0].value;
		const userName = $currentUser.user_name;
		const restTimer = event.target[1].value;
		await postNewWorkout(workoutName,userName,restTimer).then((res)=>{
			data = data;
			postWorkoutError = false;
			newWorkoutPanel = false;
		}).catch(()=> {
			postWorkoutError = true;
		});
	}

</script>

<div class="home-container">

	<button on:click={() => togglePremadeWorkouts()}>{premadeWorkoutsVisible} pre-made workouts</button>
	
	{#await plansData}
		<p>Loading pre-made workout plans</p>
	{:then plansData}


		{#if premadeWorkoutsVisible === "Hide"}
		<h1 class="main-panel">Pre-Made Workouts</h1>
			
		<ul class="workout-list">
			{#each plansData as workout}
			<li class="panel">
				<h3>{workout.workout_name}</h3>
				<section>
					<button on:click={() => setWorkoutAndRedirect(workout,'current-workout')}>Select</button>
					<button on:click={() => setWorkoutAndRedirect(workout,'edit-workout')}>Edit</button>
				</section>
			</li>
			{/each}
		</ul>
		{/if}

	{:catch error}
		<p style="color:red">{error.message}</p>
	{/await}

	{#await data}
		<p>Getting workouts</p>
	{:then data}

	{#if $currentUser.user_name === 'None'}
		<p class="sub-panel">Please login to view personal workouts</p>
	{:else}
		<h1 class="main-panel">My Workouts</h1>
		<ul class="workout-list" {data}>
			{#each data as workout}

			<li class="panel">
				<h3>{workout.workout_name}</h3>
				<section>
					<button on:click={() => setWorkoutAndRedirect(workout,'current-workout')}>Select</button>
					<button on:click={() => setWorkoutAndRedirect(workout,'edit-workout')}>Edit</button>
				</section>
			</li>
			{/each}

			<button class="new-workout-button" on:click={() => showHideNewWorkout()}>New Workout</button>
			
			{#if newWorkoutPanel}
			<form on:submit={handleOnSubmit} use:form>
				<label for="workoutName">Workout name</label>
				<input type="workoutName" name="workoutName" use:validators={[required]} />
				<HintGroup for="workoutName">
					<Hint on="required">This is a mandatory field</Hint>
				</HintGroup>
				<label for="defaultRestTimer">Rest Timer</label>
				<input type="defaultRestTimer" name="defaultRestTimer" use:validators={[required]} />
				<Hint for="defaultRestTimer" on="required">This is a mandatory field</Hint>
				
				<button disabled={!$form.valid}>Add Workout</button>
			</form>
				{#if postWorkoutError}
					<p>Workout failed to post - please check name is unique and try again</p>
				{/if}
			{/if}
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
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}

	.workout-list {
		display: flex;
		flex-direction: column;
	}

	ul {
		width: 100%;
	}

	.panel section {
		display: flex;
		width: 100%;
		border: 2px solid red;
		justify-content: space-around;
	}

	form {
		display: flex;
		flex-direction: column;
	}
	
</style>

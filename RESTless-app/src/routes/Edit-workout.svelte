<script>
	import { patchCurrentWorkout } from '../api.js';
	import { link } from 'svelte-routing';
	import { currentWorkout, currentUser } from '../stores.js';
	import { useForm } from 'svelte-use-form';

	const form = useForm();

	const handleSetChange = (exerciseId) => {
		$currentWorkout.exercises.forEach((elem, index, arr) => {
			if (elem._id === exerciseId) {
				if (elem.NumberOfSets < elem.sets.length) {
					do elem.sets.pop();
					while (elem.sets.length > elem.NumberOfSets);
				} else {
					do elem.sets.push({ weight: 10, reps: 10, time: 'null' });
					while (elem.sets.length < elem.NumberOfSets);
				}
			}
		});
		patchCurrentWorkout($currentWorkout, $currentUser.user_name);
		$currentWorkout = $currentWorkout;
	};

	const handleWeightChange = () => {
		patchCurrentWorkout($currentWorkout, $currentUser.user_name);
		$currentWorkout = $currentWorkout;
	};

	const handleRepsChange = () => {
		patchCurrentWorkout($currentWorkout, $currentUser.user_name);
		$currentWorkout = $currentWorkout;
	};

	const handleDelete = (exercise) => {
		$currentWorkout.exercises.forEach((elem, index) => {
			if (elem._id === exercise._id) $currentWorkout.exercises.splice(index, 1);
		});
		patchCurrentWorkout($currentWorkout, $currentUser.user_name);
		$currentWorkout = $currentWorkout;
	};

	let changeSets = false;
	const toggleChangeSets = () => (changeSets = !changeSets);

	let changeWeightAndReps = false;
	const toggleChangeWeightAndReps = () => (changeWeightAndReps = !changeWeightAndReps);
</script>

<div class="home-container">
	<h1>{$currentWorkout.workout_name} workout!</h1>
	<ul class="exercises-list">
		{#each $currentWorkout.exercises as exercise}
			<li>
				<section>
					<h3>{exercise.name}</h3>
					<p>Equipment: {exercise.equipment}</p>
					<p>Target: {exercise.target}</p>
					<p on:click={toggleChangeSets}>Sets: {exercise.NumberOfSets}</p>
					{#if changeSets}
						<input
							on:change={() => handleSetChange(exercise._id)}
							type="range"
							bind:value={exercise.NumberOfSets}
							min="0"
							max="20"
						/>
					{/if}
					{#each exercise.sets as set}
						<p on:click={toggleChangeWeightAndReps}>
							{exercise.sets.indexOf(set) + 1}. set, weight: {set.weight}kg reps: {set.reps}
						</p>
						{#if changeWeightAndReps}
							Modify Weight:
							<input
								on:change={() => handleWeightChange()}
								type="range"
								min="0"
								max="150"
								step="0.25"
								bind:value={set.weight}
							/>
							Modify Reps :<input
								on:change={() => handleRepsChange()}
								type="range"
								min="0"
								max="40"
								bind:value={set.reps}
							/>
						{/if}
					{/each}
					<button on:click={() => handleDelete(exercise)}>Delete Exercise</button>
				</section>
				<img src={exercise.gifUrl} alt={exercise.name} />
			</li>
		{/each}
	</ul>

	<a href="explore" class="link" use:link>Add exercises</a>
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

	.exercises-list {
		font-size: 1rem;
		list-style: none;
	}

	.exercises-list li {
		border: 3px black solid;
		display: flex;
		justify-content: space-between;
		margin: 10px;
	}
	.exercises-list section {
		display: flex;
		flex-direction: column;
	}

	.exercises-list li img {
		width: 100px;
		padding-bottom: 2px;
	}
</style>

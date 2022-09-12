<script>
	// import { onMount } from 'svelte';
	import { Link } from 'svelte-routing';
	// import { fetchExerciseById } from '../api.js';
	import { currentWorkout } from '../stores.js';

	const handleClick = (exercise) => {
		$currentWorkout.exercises.forEach((elem, index) => {
			if (elem._id === exercise._id) $currentWorkout.exercises.splice(index, 1);
		});

		$currentWorkout = $currentWorkout;
	};
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
					<p>Sets: {exercise.NumberOfSets}</p>
					{#each exercise.sets as set}
						<div>
							{exercise.sets.indexOf(set) + 1}. set, weight: {set.weight}kg reps: {set.reps}
						</div>
					{/each}
					<button on:click={() => handleClick(exercise)}>Delete</button>
				</section>
				<img src={exercise.gifUrl} alt={exercise.name} />
			</li>
		{/each}
	</ul>
	<p>Under the list</p>
	<Link to="/explore">Add an exercise</Link>
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
		font-family: 'Courier New', Courier, monospace;
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

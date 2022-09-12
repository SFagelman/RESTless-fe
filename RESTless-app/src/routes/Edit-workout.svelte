<script>
	import { patchCurrentWorkout } from '../api.js';
	import { link } from 'svelte-routing';
	import { currentWorkout, currentUser } from '../stores.js';
	import { useForm } from 'svelte-use-form';

	const form = useForm();

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const newNumberOfSets = event.target[0].value;
		const exerciseId = event.target[1].value;

		$currentWorkout.exercises.forEach((elem, index, arr) => {
			if (elem._id === exerciseId) {
				elem.sets = [];
				for (let i = 0; i < newNumberOfSets; i++) {
					elem.sets.push({ weight: 0, reps: 0, time: 'null' });
				}
				elem.NumberOfSets = newNumberOfSets;
			}
		});
		patchCurrentWorkout($currentWorkout, $currentUser.user_name);
		$currentWorkout = $currentWorkout;
	};

	const handleDelete = (exercise) => {
		console.log(exercise);
		$currentWorkout.exercises.forEach((elem, index) => {
			if (elem._id === exercise._id) $currentWorkout.exercises.splice(index, 1);
		});
		patchCurrentWorkout($currentWorkout, $currentUser.user_name);
		$currentWorkout = $currentWorkout;
	};

	let changeSets = false;
	const toggleChangeSets = () => (changeSets = !changeSets);

	console.log($currentWorkout.exercises);
</script>

<div class="home-container">
	<h1>{$currentWorkout.workout_name} workout!</h1>
	<ul class="exercises-list">
		{#each $currentWorkout.exercises as exercise}
			<li>
				<section>
					<h3>in each loop</h3>
					<h3>{exercise.name}</h3>
					<p>Equipment: {exercise.equipment}</p>
					<p>Target: {exercise.target}</p>
					<p on:click={toggleChangeSets}>Sets: {exercise.NumberOfSets}</p>
					{#if changeSets}
						<form on:submit={handleOnSubmit} use:form>
							<input type="number" bind:value={exercise.NumberOfSets} min="0" max="50" />
							<input type="hidden" bind:value={exercise._id} />
							<button>Set</button>
						</form>
					{/if}
					{#each exercise.sets as set}
						<div>
							{exercise.sets.indexOf(set) + 1}. set, weight: {set.weight}kg reps: {set.reps}
						</div>
					{/each}
					<button on:click={() => handleDelete(exercise)}>Delete</button>
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

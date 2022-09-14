<script>
	import { patchCurrentWorkout } from '../api.js';
	import { link } from 'svelte-routing';
	import { currentWorkout, currentUser } from '../stores.js';

	let isLoading = false;
	let loadingError = false;

	const handleSetChange = async (exerciseId) => {
		isLoading = true;

		await patchCurrentWorkout($currentWorkout, $currentUser.user_name)
			.then(() => {
				isLoading = false;
				loadingError = false;
			})
			.catch(() => {
				loadingError = true;
				isLoading = false;
			});

		if (!loadingError) {
			$currentWorkout.exercises.forEach((elem) => {
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
		}
		$currentWorkout = $currentWorkout;
	};

	const handleChange = async () => {
		isLoading = true;
		await patchCurrentWorkout($currentWorkout, $currentUser.user_name)
			.then(() => {
				isLoading = false;
				loadingError = false;
			})
			.catch(() => {
				loadingError = true;
				isLoading = false;
			});
		$currentWorkout = $currentWorkout;
	};

	const handleDelete = async (exercise) => {
		isLoading = true;
		$currentWorkout.exercises.forEach((elem, index) => {
			if (elem._id === exercise._id) $currentWorkout.exercises.splice(index, 1);
		});
		await patchCurrentWorkout($currentWorkout, $currentUser.user_name)
			.then(() => {
				isLoading = false;
				loadingError = false;
			})
			.catch(() => {
				loadingError = true;
				isLoading = false;
			});
		$currentWorkout = $currentWorkout;
	};

	let change = false;
	const toggleChange = () => {
		isLoading = false;
		change = !change;
	};
</script>

<div class="home-container">
	<h1>{$currentWorkout.workout_name} workout!</h1>
	<p>Rest time: {$currentWorkout.rest_timer} sec.</p>
	{#if change && !isLoading}
		<input
			on:change={() => handleChange()}
			type="range"
			bind:value={$currentWorkout.rest_timer}
			min="0"
			max="300"
		/>
	{/if}
	<button on:click={toggleChange}>Edit</button>
	{#if change}
		<a href="explore" class="link" use:link>Add exercises</a>
	{/if}
	{#if loadingError}
		<p>Network error, try again!</p>
	{/if}
	<ul class="exercises-list">
		{#each $currentWorkout.exercises as exercise}
			<li>
				<section>
					<h3>{exercise.name}</h3>
					<p>Equipment: {exercise.equipment}</p>
					<p>Target: {exercise.target}</p>
					<p>Sets: {exercise.NumberOfSets}</p>
					{#if change && !isLoading}
						<input
							on:change={() => handleSetChange(exercise._id)}
							type="range"
							bind:value={exercise.NumberOfSets}
							min="0"
							max="20"
						/>
					{/if}
					{#each exercise.sets as set}
						<p>
							{exercise.sets.indexOf(set) + 1}. set: weight: {set.weight}kg Reps: {set.reps}
						</p>
						{#if change && !isLoading}
							Modify Weight:
							<input
								on:change={() => handleChange()}
								type="range"
								min="0"
								max="150"
								step="0.25"
								bind:value={set.weight}
							/>
							Modify Reps :<input
								on:change={() => handleChange()}
								type="range"
								min="0"
								max="40"
								bind:value={set.reps}
							/>
						{/if}
					{/each}
					{#if change}
						<button on:click={() => handleDelete(exercise)}>Delete Exercise</button>
					{/if}
				</section>
				<img src={exercise.gifUrl} alt={exercise.name} />
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

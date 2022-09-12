<script>
	import { onMount } from 'svelte';
	import { fetchAllExercises, fetchAllBodyParts, fetchAllEquipment, fetchAllTargets } from '../api';
	import { currentUser, currentWorkout } from '../stores';

	let allExercises = [];
	let allBodyParts = [];
	let allTargets = [];
	let allEquipment = [];

	onMount(async () => {
		const exercises = await fetchAllExercises();
		const bodyparts = await fetchAllBodyParts();
		const targets = await fetchAllTargets();
		const equipment = await fetchAllEquipment();
		allExercises = exercises.data;
		allBodyParts = bodyparts.data;
		allTargets = targets.data;
		allEquipment = equipment.data;
	});

	let selectedBodyPart = 'blank';
	let selectedTarget = 'blank';
	let selectedEquipment = 'blank';

	$: filteredExercises = allExercises;

	const filterByBodyPart = () => {
		filteredExercises = allExercises;
		filteredExercises = filteredExercises.filter((e) => e.bodyPart === selectedBodyPart);
		if (selectedTarget != 'blank') {
			filteredExercises = filteredExercises.filter((e) => e.target === selectedTarget);
		}
		if (selectedEquipment != 'blank') {
			filteredExercises = filteredExercises.filter((e) => e.equipment === selectedEquipment);
		}
	};

	const filterByTarget = () => {
		filteredExercises = allExercises;
		filteredExercises = filteredExercises.filter((e) => e.target === selectedTarget);
		if (selectedBodyPart != 'blank') {
			filteredExercises = filteredExercises.filter((e) => e.bodyPart === selectedBodyPart);
		}
		if (selectedEquipment != 'blank') {
			filteredExercises = filteredExercises.filter((e) => e.equipment === selectedEquipment);
		}
	};
	const filterByEquipment = () => {
		filteredExercises = allExercises;
		filteredExercises = filteredExercises.filter((e) => e.equipment === selectedEquipment);
		if (selectedBodyPart != 'blank') {
			filteredExercises = filteredExercises.filter((e) => e.bodyPart === selectedBodyPart);
		}
		if (selectedTarget != 'blank') {
			filteredExercises = filteredExercises.filter((e) => e.target === selectedTarget);
		}
	};

	console.log(selectedBodyPart, selectedEquipment, selectedTarget);

	// if (selectedBodyPart != 'blank') {
	// 	filteredExercises = filteredExercises.filter((e) => e.bodyPart === selectedBodyPart);
	// }

	// if (selectedTarget != 'blank') {
	// 	filteredExercises = filteredExercises.filter((e) => e.target === selectedTarget);
	// }

	// if (selectedEquipment != 'blank') {
	// 	filteredExercises = filteredExercises.filter((e) => e.equipment === selectedEquipment);
	// }

	const handleClick = (exercise) => {
		console.log($currentWorkout);
		$currentWorkout.exercises.push({
			...exercise,
			NumberOfSets: 2,
			feedback: '',
			sets: [
				{
					weight: 10,
					reps: 10,
					time: 'null'
				},
				{
					weight: 10,
					reps: 10,
					time: 'null'
				}
			]
		});
		console.log($currentWorkout);
	};
</script>

<div class="home-container">
	<h1>Explore</h1>

	<div class="button-container">
		<h2 class="filter-title">Filter Exercises</h2>

		<form class="filter-exercises">
			<div>
				<h3>Body Part</h3>
				<select class="dropdown" bind:value={selectedBodyPart} on:change={filterByBodyPart}>
					<option value="blank" />
					{#each allBodyParts as bodypart}
						<option value={bodypart.bodyPart}>{bodypart.bodyPart}</option>
					{/each}
				</select>
			</div>
			<div>
				<h3>Target</h3>
				<select class="dropdown" bind:value={selectedTarget} on:change={filterByTarget}>
					<option value="blank" />

					{#each allTargets as target}
						<option value={target.target}>{target.target}</option>
					{/each}
				</select>
			</div>
			<div>
				<h3>Equipment</h3>
				<select class="dropdown" bind:value={selectedEquipment} on:change={filterByEquipment}>
					<option value="blank" />

					{#each allEquipment as equipment}
						<option value={equipment.equipment}>{equipment.equipment}</option>
					{/each}
				</select>
			</div>
			<input type="reset" />
		</form>

		<ul class="exercises-list" {filteredExercises}>
			{#each filteredExercises as exercise}
				<li>
					<section>
						<h3>{exercise.name}</h3>
						<p>Equipment: {exercise.equipment}</p>
						<p>Target: {exercise.target}</p>

						{#if $currentUser._id && $currentWorkout.workout_name}
							<button on:click={() => handleClick(exercise)}> Add to you workout</button>
						{/if}
					</section>
					<img src={exercise.gifUrl} alt={exercise.name} />
				</li>
			{/each}
		</ul>
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
	.filter-title {
		text-align: center;
	}
	.filter-exercises {
		border: 3px black solid;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 2px;
	}
	.dropdown {
		width: 90px;
		margin: 2px;
		text-transform: capitalize;
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

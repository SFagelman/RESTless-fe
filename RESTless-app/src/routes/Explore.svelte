<script>
	import { onMount } from 'svelte';
	import {
		fetchAllExercises,
		fetchAllBodyParts,
		fetchAllEquipment,
		fetchAllTargets,
		patchCurrentWorkout,
		fetchFilteredExercises
	} from '../api';
	import { currentUser, currentWorkout } from '../stores';

	let allExercises = [];
	let allBodyParts = [];
	let allTargets = [];
	let allEquipment = [];

	$: currentExerciseList = $currentWorkout.exercises.map((elem) => elem._id);

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

	let isLoading = false;

	let selectedBodyPart = 'blank';
	let selectedTarget = 'blank';
	let selectedEquipment = 'blank';

	$: filteredExercises = allExercises;

	const handleFilter = async (event) => {
		event.preventDefault();
		filteredExercises = allExercises;
		isLoading = true;
		filteredExercises = await fetchFilteredExercises(
			selectedBodyPart,
			selectedEquipment,
			selectedTarget
		);
		isLoading = false;
	};

	const handleReset = () => {
		isLoading = true;
		selectedBodyPart = 'blank';
		selectedEquipment = 'blank';
		selectedTarget = 'blank';
		filteredExercises = allExercises;
		isLoading = false;
	};

	const handleClick = (exercise) => {
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
		patchCurrentWorkout($currentWorkout, $currentUser.user_name);
		currentExerciseList.push(exercise._id);
		currentExerciseList = currentExerciseList;
		$currentWorkout = $currentWorkout;
	};
</script>

<div class="explore-container">
	<h1>Explore</h1>

	<div class="button-container">
		<h2 class="filter-title">Filter Exercises By:</h2>
		<div class="filter-exercises">
			<form class="filter-form">
				<div class="dropdowns">
					<div>
						<h3>Body Part</h3>
						<select class="dropdown" bind:value={selectedBodyPart}>
							<option value="blank" />
							{#each allBodyParts as bodypart}
								<option value={bodypart.bodyPart}>{bodypart.bodyPart}</option>
							{/each}
						</select>
					</div>
					<div>
						<h3>Target</h3>
						<select class="dropdown" bind:value={selectedTarget}>
							<option value="blank" />
							{#each allTargets as target}
								<option value={target.target}>{target.target}</option>
							{/each}
						</select>
					</div>
					<div>
						<h3>Equipment</h3>
						<select class="dropdown" bind:value={selectedEquipment}>
							<option value="blank" />

							{#each allEquipment as equipment}
								<option value={equipment.equipment}>{equipment.equipment}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="buttons">
					<input class="filter-button" type="submit" value="Filter" on:click={handleFilter} />
					<input class="reset-button" type="reset" on:click={handleReset} />
				</div>
			</form>
		</div>

		<ul class="exercises-list" {filteredExercises}>
			{#if filteredExercises.length === 0 && isLoading === false}
				<p>No exercises match for these filters</p>
			{:else}
				{#each filteredExercises as exercise}
					<li>
						<section class="exercise-item">
							<h3>{exercise.name}</h3>
							<p>Equipment: {exercise.equipment}</p>
							<p>Body Part: {exercise.bodyPart}</p>
							<p>Target: {exercise.target}</p>

							{#if $currentUser._id && $currentWorkout.workout_name}
								{#if !currentExerciseList.includes(exercise._id)}
									<button on:click={() => handleClick(exercise)}> Add to your workout</button>
								{:else}
									<p>> Already in your workout</p>
								{/if}
							{/if}
						</section>
						<img src={exercise.gifUrl} alt={exercise.name} />
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.explore-container {
		justify-content: center;
	}

	.filter-title {
		text-align: left;
		font-size: 16px;
		padding: 8px;
	}
	.filter-exercises {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 6px;
		margin: 3px;
	}

	.filter-form {
		display: flex;
		flex-direction: column;
	}
	.dropdowns {
		display: flex;
		flex-direction: row;
		font-size: 15px;
	}
	.dropdown {
		width: 110px;
		margin: 3px;
		text-transform: capitalize;
		border: 1px solid black;
		text-overflow: ellipsis;
	}

	.exercises-list {
		font-size: 1rem;
		list-style: none;
		height: 410px;
		overflow-y: auto;
		/* border: 1px dashed; */
		border-radius: 0.1cm;
		/* margin: px; */
	}

	.exercise-item {
		text-transform: capitalize;
		width: 200px;
		padding: 10px;
		font-size: 15px;
		/* background-color: #8f3434; */
		color: #ffffff;
	}

	.exercises-list li {
		/* border: 3px black solid; */
		display: flex;
		justify-content: space-between;
		margin-top: 0px;
		margin-bottom: 10px;
		margin-left: 10px;
		margin-right: 10px;
		border: 2px solid;
		border-radius: 0.3cm;
		background-color: #8f3434;
	}
	.exercises-list section {
		display: flex;
		flex-direction: column;
	}

	.exercises-list li img {
		width: 130px;
		padding: 5px;
		border-radius: 0cm 0.3cm 0.3cm 0cm;
	}

	p {
		padding-top: 3px;
		padding-bottom: 3px;
	}

	button {
		padding: 1px;
	}

	input {
		padding: 2px;
	}
</style>

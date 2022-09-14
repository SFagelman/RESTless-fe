<script>
	import Timer from '../components/Timer.svelte';
	import { currentWorkout, currentWorkoutTracker } from '../stores';
    import { navigate } from 'svelte-routing';

    const navToExercise = () => {
		navigate('edit-workout');
	};
    
</script>

<div class="workout-container">
	<section class="current-exercise">
		<p>{$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].name}</p>
		<button on:click={() => navToExercise()}>Edit Exercise</button>
	</section>
	<section class="set-info">
		<p>
			Weight: {$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].sets[
				$currentWorkoutTracker.currentSet
			].weight}kg
		</p>
		<p>
			Reps: {$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].sets[
				$currentWorkoutTracker.currentSet
			].reps}
		</p>
		<p>
			Set: {$currentWorkoutTracker.currentSet + 1}/{$currentWorkout.exercises[
				$currentWorkoutTracker.currentExercise
			].NumberOfSets}
		</p>
	</section>
	<section class="timer">
		<Timer />
	</section>
	<section class="rating-title">
		<p>Workout Rating</p>
	</section>
	<section class="">
		<p>Feedback</p>
	</section>
	<section>
		{#if $currentWorkout.exercises[$currentWorkoutTracker.currentExercise + 1] !== undefined}
			<p>
				Next Exercise: {$currentWorkout.exercises[$currentWorkoutTracker.currentExercise + 1].name}
			</p>
		{:else}
			<p>Last Exercise</p>
		{/if}
	</section>
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		text-transform: capitalize;
	}
	.workout-container {
		justify-content: center;
		background: #d3d3d3;
		/* height: 580px; */
		/* margin-bottom: 5px; */
		font-size: 1.8rem;
		border: 2px solid black;
		border-radius: 0.3cm;
	}

	section {
		display: flex;
		flex-direction: row;
	}

	.timer {
		justify-content: center;
	}

	.workout-container button {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		font-size: 1.8rem;
		background: #808181;
		border-color: #eeeeee;
		border-radius: 12px;
		margin: 0.2em;
	}

	p {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: #8f3434;
		border-color: #eeeeee;
		border-radius: 12px;
		width: 100%;
		flex-grow: 1;
		margin: 0.2em;
		color: #ffffff;
		padding: 10px;
	}
</style>

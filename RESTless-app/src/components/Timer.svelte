<script>
	import { currentWorkout, currentWorkoutTracker } from '../stores';

	let isPaused = false;
	let countdown = $currentWorkout.rest_timer;
	let toggle = true;
	let timer;
	let endOfSets = false;
	$: {
		if (countdown === 0) {
			if (
				$currentWorkoutTracker.currentSet + 1 <
				$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].NumberOfSets
			) {
				if (timer) {
					$currentWorkoutTracker.currentSet += 1;
					countdown = $currentWorkout.rest_timer;
					isPaused = !isPaused;
				}
			} else if ($currentWorkoutTracker.currentExercise + 1 < $currentWorkout.exercises.length) {
				$currentWorkoutTracker.currentExercise += 1; //this will change the exercise - set to go AFTER feedback
				$currentWorkoutTracker.currentSet = 0;
				countdown = $currentWorkout.rest_timer;
				isPaused = !isPaused;
				endOfSets = true;
				//request feedback at this point
			} else {
				clearInterval(timer);
				timer = null;
			}
		}
	}
	function handleClick() {
		toggle = false;
		timer = setInterval(() => {
			if (!isPaused) countdown -= 1;
		}, 1000);
	}

	function play() {
		isPaused = false;
	}
	function pause() {
		isPaused = true;
	}
</script>

<div class="basic">
	{#if toggle}
		<button class="timer-button" on:click|once={handleClick}>Start</button>
	{:else if isPaused}
		<button class="timer-button" on:click={play}>Resume</button>
	{:else}
		<button class="timer-button" on:click={pause}>Pause</button>
	{/if}
	<h1>
		{countdown}
	</h1>
</div>

<style>
	.timer-button {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		background: #808181;
		border-color: #eeeeee;
		border-radius: 12px;
		margin: 0.2em;
	}
</style>

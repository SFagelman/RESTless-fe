<script>
	import { currentWorkout, currentWorkoutTracker } from '../stores';

	let isPaused = false;
	let countdown = $currentWorkout.rest_timer;
	let toggle = true;
	let timer;
	$: {
		if (countdown === 0) {
			if (
				$currentWorkoutTracker.currentSet + 1 <
				$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].NumberOfSets
			) {
				if (timer) {
					$currentWorkoutTracker.currentSet += 1;
					countdown = $currentWorkout.rest_timer;
				}
			} else if ($currentWorkoutTracker.currentExercise + 1 < $currentWorkout.exercises.length) {
				$currentWorkoutTracker.currentExercise += 1;
				$currentWorkoutTracker.currentSet = 0;
				countdown = $currentWorkout.rest_timer;
				isPaused = !isPaused;
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
		<button on:click|once={handleClick}>Finished Set</button>
	{:else if isPaused}
		<button on:click={play}>Resume</button>
	{:else}
		<button on:click={pause}>Pause</button>
	{/if}
	<h1>
		{countdown}
	</h1>
</div>

<style>
</style>

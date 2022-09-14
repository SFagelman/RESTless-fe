<script>
import Timer from "../components/Timer.svelte";
import {currentWorkout, currentWorkoutTracker} from "../stores"



</script>

<div class="workout-container">
	
	<section class="current-exercise">
        <p>{$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].name}</p>
        <button>Add Exercise</button>
    </section>
    <section class="set-info">
        <p>Weight: {$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].sets[$currentWorkoutTracker.currentSet].weight}kg</p>
        <p>Reps: {$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].sets[$currentWorkoutTracker.currentSet].reps}</p>
        <p>Set: {$currentWorkoutTracker.currentSet +1}/{$currentWorkout.exercises[$currentWorkoutTracker.currentExercise].NumberOfSets}</p>
    </section>
    <section>
        <Timer/>
    </section>
    <section>
        <p>Workout Rating</p>
    </section>
    <section>
        <p>Feedback</p>
    </section>
    <section>
        {#if 
        $currentWorkout.exercises[$currentWorkoutTracker.currentExercise+1] !== undefined
        }
        <p>Next Exercise: {$currentWorkout.exercises[$currentWorkoutTracker.currentExercise+1].name}</p>
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
	}
	.workout-container {
		justify-content: center;
		background: grey;
		min-height: 100vh;
        font-size: 1.8rem;
	}

    section {
        display: flex;
        flex-direction: row;
    }

    .workout-container button {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        font-size: 1.8rem;
        background: #00adb5;
        border-color: #eeeeee;
        border-radius: 12px;
        margin: 0.2em;
    }

    p {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: #00adb5;
        border-color: #eeeeee;
        border-radius: 12px;
        width: 100%;
        flex-grow: 1;
        margin: 0.2em;
    }
	
</style>

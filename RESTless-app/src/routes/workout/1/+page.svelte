<script>
import Nav from "../../../nav.svelte";


</script>

<div class="workout-container">
	<Nav/>
	<h1>Workouts/1 Selection</h1>
	<div class="workout-selection-container">
        <h1>Shoulder Press</h1>
		<button class="add-exercise-buttons">Add Exc</button>
        <section class="weight-reps">
            <div>
            <h2>Weight:</h2>
            </div>
            <div>
            <h2>Reps:</h2>
            </div>
            
        </section>
        <section class="sets">
            <h2>Next Set:</h2>
            <h2>Sets Remaining:</h2>
        </section>
        <section class="feedback">
            <h2>Workout Rating</h2>
            <h2>FEEDBACK</h2>
            <h2>Next Workout:</h2>
        </section>
	</div>
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
	}

	.add-exercise-buttons {
		
		font-size: 1.8rem;
		font-family: 'Courier New', Courier, monospace;
		background: #00adb5;
		border-color: #eeeeee;
		border-radius: 12px;
		margin: 15px 0px;
		width: 50%;
	}
    .weight-reps{
        border: black 2px solid;
        border-radius: 12px;
        margin: 10px;
    }
    .sets{
        border: black 2px solid;
        border-radius: 12px;
        margin: 10px;
    }
    .feedback{
        border: black 2px solid;
        border-radius: 12px;
        margin: 10px;
    }

	.workout-selection-container{
        padding: 0px 20px;
    }
 
	
</style>

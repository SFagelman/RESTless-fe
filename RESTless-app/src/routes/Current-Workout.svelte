<script>



</script>

<div class="workout-container">
	
	<section class="current-exercise">
        <p>Shoulder Press</p>
        <button>Add Exercise</button>
    </section>
    <section class="set-info">
        <p>Weight: 15kg</p>
        <p>Reps: 12</p>
        <p>Set: 1/3</p>
    </section>
    <section>
        <p>Timer</p>
    </section>
    <section>
        <p>Workout Rating</p>
    </section>
    <section>
        <p>Feedback</p>
    </section>
    <section>
        <p>Next Workout: Bench Press</p>
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

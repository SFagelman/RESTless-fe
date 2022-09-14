<script>
	import { link } from 'svelte-routing';

	import { currentWorkout } from './stores.js';

	$: activeWorkout = currentWorkout;
</script>

<div class="nav">
	<a href="/" class="link main-panel" use:link>RESTless</a>
	<p class="sub-panel">
		{$activeWorkout.workout_name}
	</p>
</div>

<style>
	.nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
		font-size: 2rem;
		border: #eeeeee;
		border-radius: 0.5cm;
	}

	a {
		font-size: 2rem;
	}

	p {
		font-size: 1.5rem;
		text-transform: capitalize;
	}
</style>

<script>
import { link } from "svelte-routing";

import { currentWorkout} from "./stores.js";

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
		color: #00adb5;
		font-size: 2rem;
		border: #eeeeee;
	}

	a {
		font-size: 3rem;
	}

	p {
		font-size: 2rem;
		text-transform: capitalize;
	}
</style>

<script>
import { Link } from "svelte-routing";
import { currentWorkout} from "./stores.js";

$: activeWorkout = currentWorkout;
</script>

<div class="nav">
	<Link to="/">RESTless</Link>
	{$activeWorkout.workout_name}
	

</div>

<style>
	.nav {
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		padding: 15px;
		color: #00adb5;
		font-size: 2rem;
		font-family: 'Courier New', Courier, monospace;
		border: #eeeeee;
	}
	a {
  color: black;
  text-decoration: none;

}
</style>

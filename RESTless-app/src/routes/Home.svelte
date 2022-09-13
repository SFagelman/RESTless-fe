<script>
	import { onMount } from 'svelte';
	import { fetchAllExercises } from '../api';
	import { link } from 'svelte-routing';
	let data = [];

	onMount(async () => {
		const result = await fetchAllExercises();
		data = result.data;
	});
</script>

<div class="home-container">
	<h1>Home</h1>
	<a href="workouts" class="link" use:link>Choose Workout</a>
	<a href="explore" class="link" use:link>Explore</a>
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.home-container {
		justify-content: center;
		background: grey;
		min-height: 100vh;
		border: 2px solid red;
	}
	.home-container h1 {
		border: 2px solid green;
		text-decoration: none;
	}

	.link {
		display: flex;
		justify-content: center;
		padding: 2rem 6rem;
		font-size: 1.8rem;
		background: #00adb5;
		border-color: #eeeeee;
		border-radius: 12px;
		margin: 15px 0px;
		width: 100%;
	}
</style>

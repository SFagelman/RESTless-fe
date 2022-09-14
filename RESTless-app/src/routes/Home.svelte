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
	}
	.home-container h1 {
		text-decoration: none;
	}

	.link,
	.link:visited {
		display: flex;
		justify-content: center;
		padding: 3rem 3rem;
		font-size: 1.8rem;
		/* background: #d3d3d3; */
		background: #8f3434;
		border-color: #eeeeee;
		border-radius: 12px;
		margin: 15px 0px;
		width: 100%;
		word-break: keep;
		text-decoration: none;
		/* color: #8f3434; */
		color: #d3d3d3;
	}
</style>

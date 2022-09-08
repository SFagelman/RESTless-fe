<script>
	import { onMount } from 'svelte';
	import Nav from "../../nav.svelte";
	import fetchAllExercises from '../../api';

	let data = [];

	onMount(async () => {
		const result = await fetchAllExercises();
		data = result.data;
	});

</script>

<div class="home-container">
	<Nav />
	<div class="button-container">
		<button class="home-buttons">Filter Exercises</button>
		<h2>Choose a Exercise</h2>

		<ul {data}>
			{#each data as exercise}
				<li>{exercise.name}</li>
			{/each}
		</ul>


	</div>
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
	}

	.home-buttons {
		display: block;
		padding: 2rem 6rem;
		font-size: 1.8rem;
		font-family: 'Courier New', Courier, monospace;
		background: #00adb5;
		border-color: #eeeeee;
		border-radius: 12px;
		margin: 15px 0px;
		width: 100%;
	}
	.button-container {
		padding: 0px 20px;
	}
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
</style>

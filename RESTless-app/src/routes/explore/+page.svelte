<script>
	import { onMount } from 'svelte';
<<<<<<< HEAD
	import Nav from "../../nav.svelte";
	import fetchAllExercises from '../../api';

	let data = [];

	onMount(async () => {
		const result = await fetchAllExercises();
		data = result.data;
=======
	import axios from "axios"

	let data = [];
	onMount(async () => {
		const res = await fetch("https://restless-be.fly.dev/api/exercises");

		const  exercises  = await res.json();
		data = exercises;
		console.log(data);
	
>>>>>>> b3ff3cd7611dd45abe34bed3f84b11b8ff564b69
	});

</script>

<div class="home-container">
	<Nav />
	<div class="button-container">
		<button class="home-buttons">Filter Exercises</button>
		<h2>Choose a Exercise</h2>

		<ul {data}>
<<<<<<< HEAD
			{#each data as exercise}
				<li>{exercise.name}</li>
=======
			{#each data as item}
				<li>{item.name} hello</li>
>>>>>>> b3ff3cd7611dd45abe34bed3f84b11b8ff564b69
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

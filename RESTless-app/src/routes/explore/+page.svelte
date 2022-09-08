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
	<h1>Explore</h1>
	<div class="button-container">
		<button class="home-buttons">Filter Exercises</button>
		

		
		<ul class="exercises-list" {data}>
			{#each data as exercise}

			<li>
			<section>
			<h3>{exercise.name}</h3>
			<p>Equipment: {exercise.equipment}</p>
			<p>Target: {exercise.target}</p>
			</section>	
			<img src={exercise.gifUrl} alt={exercise.name}/>
			</li>
				
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

	.exercises-list{
		font-size: 1rem;
		font-family: 'Courier New', Courier, monospace;
		list-style: none;
	
 	}

	.exercises-list li{
		border: 3px black solid;
		display: flex;
		justify-content: space-between;
		margin: 10px;
	

	}
	.exercises-list section{
		display: flex;
		flex-direction: column;
	
	}
	
	.exercises-list li img{
		width: 100px;
		padding-bottom: 2px;
		
		
	}
</style>

<script>
	import { onMount } from 'svelte';
	import {fetchAllExercises} from '../api';

	let data = [];

	onMount(async () => {
		const result = await fetchAllExercises();
		data = result.data;
		
	});

</script>

<div class="home-container">
	<h1>Explore</h1>
	
	<div class="button-container">
		
		<h2 class="filter-title" >Filter Exercises</h2>
		<div class="filter-exercises">
			<div>
				<h3>Body Part</h3>
				<select class="dropdown"> 
					<option>Arms</option>
					<option>Back</option>
					<option>Shoulder</option>


				</select>
			</div>
			<div>
				<h3>Target</h3>
				<select class="dropdown">
					<option>Triceps</option>
					<option>Traps</option>
					<option>Pectorals</option>
				</select>
			</div>
			<div>
				<h3>Equipment</h3>
				<select class="dropdown"> 
					<option>Band</option>
					<option>Cable</option>
					<option>Upper Body</option>
				</select>
			</div>
		</div>
		
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
	.filter-title{
		text-align: center;
	}
	.filter-exercises{
		border: 3px black solid;
		display: flex;
		justify-content: space-between;
		padding: 2px;

	}
	.dropdown{
		width: 90px;
		margin: 2px;
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

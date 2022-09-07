<script>
	import { onMount } from 'svelte';

	let data = [];
	onMount(async () => {
		const res = await fetch('https://zeshan-nc-news.herokuapp.com/api/topics');

		const { topics } = await res.json();
		data = topics;
	
	});
</script>

<div class="home-container">
	<h1 class="nav"><a href="/">RESTless</a></h1>
	<div class="button-container">
		<button class="home-buttons">Filter Exercises</button>
		<h2>Choose a Exercise</h2>

		<ul {data}>
			{#each data as item}
				<li>{item.slug} hello</li>
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

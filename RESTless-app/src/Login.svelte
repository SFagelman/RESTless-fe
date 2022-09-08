<script>
	import { getContext,onMount,setContext } from "svelte";
	import { useForm, validators, HintGroup, Hint, required } from "svelte-use-form";
	import { attemptUserLogin } from './api.js';

	const form = useForm();
	let currentUser = getContext('activeUser');
	let loginVisible = false;
	const toggleLoginVisible = () => loginVisible = !loginVisible;

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const username = event.target[0].value;
		const password = event.target[1].value;
		attemptUserLogin(username,password).then((res)=>{
			currentUser = res;
			console.log(currentUser);
		});
	}
</script>
<section class='Login'>
	<h1 on:click={toggleLoginVisible}>Current user : {currentUser.user_name}</h1>
	{#if loginVisible}
	<form on:submit={handleOnSubmit} use:form>
		<input type="username" name="username" use:validators={[required]} />
		<HintGroup for="username">
		  <Hint on="required">This is a mandatory field</Hint>
		  <Hint on="username" hideWhenRequired>Email is not valid</Hint>
		</HintGroup>
	  
		<input type="password" name="password" use:validators={[required]} />
		<Hint for="password" on="required">This is a mandatory field</Hint>
	  
		<button disabled={!$form.valid}>Login</button>
	  </form>
	  {/if}
	  <!-- <pre>
	  {JSON.stringify($form, null, " ")}
	  </pre> -->
</section>

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
	.Login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
		padding: 15px;
		color: #000000;
		font-size: 1rem;
		font-family: 'Courier New', Courier, monospace;
		border: #eeeeee;
	}
</style>

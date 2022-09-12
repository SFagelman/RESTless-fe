<script>
	import { useForm, validators, HintGroup, Hint, required } from "svelte-use-form";
	import { attemptUserLogin } from './api.js';
	import {currentUser} from './stores.js'

	const form = useForm();
	let loginError = false;
	let loginVisible = false;
	const toggleLoginVisible = () => loginVisible = !loginVisible;

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		const username = event.target[0].value;
		const password = event.target[1].value;
		await attemptUserLogin(username,password).then((res)=>{
			loginError = false;
			$currentUser = res;
		}).catch(()=> {
			loginError = true;
		});
	}
</script>
<section class='Login'>
	<h1 on:click={toggleLoginVisible}>Current user : {$currentUser.user_name}</h1>
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
		{#if loginError}
			<p>Invalid username / password. Please try again.</p>
		{/if}
	  </form>
	  {/if}
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

<script>
	import { useForm, validators, HintGroup, Hint, required } from 'svelte-use-form';
	import { attemptUserLogin } from './api.js';
	import { currentUser } from './stores.js';

	const form = useForm();
	let loginError = false;
	let loginVisible = false;
	const toggleLoginVisible = () => (loginVisible = !loginVisible);

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		const username = event.target[0].value;
		const password = event.target[1].value;
		await attemptUserLogin(username, password)
			.then((res) => {
				loginError = false;
				loginVisible = false;
				$currentUser = res;
			})
			.catch(() => {
				loginError = true;
			});
	};
</script>

<section class="Login">
	<h1 class="current-user" on:click={toggleLoginVisible}>
		Current user : {$currentUser.user_name}
	</h1>
	{#if loginVisible}
		<form on:submit={handleOnSubmit} use:form>
			<input type="username" name="username" use:validators={[required]} placeholder="Username" />
			<HintGroup for="username">
				<Hint on="required">This is a mandatory field</Hint>
				<Hint on="username" hideWhenRequired>Email is not valid</Hint>
			</HintGroup>

			<input type="password" name="password" use:validators={[required]} placeholder="Password" />
			<Hint for="password" on="required">This is a mandatory field</Hint>

			<button class="login-button" disabled={!$form.valid}>Login</button>
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
		flex-direction: row;
		justify-content: center;
		text-align: center;
		align-items: center;
		margin: 5px;
		padding: 5px 0px;
		color: #000000;
		font-size: 0.7rem;
		border: #eeeeee;
	}

	.login-button {
		width: 100px;
	}
</style>

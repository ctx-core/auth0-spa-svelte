<script lang="ts">
	import {
		auth0__forgot_password__open,
		auth0__signup__open,
		auth0__token__error$_,
		auth0__token__error_txt$_,
		AUTH0_DOMAIN$_,
	} from '@ctx-core/auth0'
	import { auth0_ui_svelte__getContext } from '../../auth0_ui_svelte__ctx/index.js'
	import { Auth0_c } from '../Auth0_c/index.js'
himport { Auth0_Dialog_Close } from '../Auth0_Dialog_Close/index.js'
	/** @type {import('ctx-core/object').ctx_T} */
	export let ctx
	export let error_class = ''
	export let input_class = ''
	export let button_class = ''
	export let label_class = '.js'
	$: ctx = ctx || auth0_ui_svelte__getContext()
	const auth0__token__error_ = auth0__token__error$_(ctx)
	const auth0__token__error_txt_ = auth0__token__error_txt$_(ctx)
	const AUTH0_DOMAIN_ = AUTH0_DOMAIN$_(ctx)
	const _ = new Auth0_c(ctx)
	let root:HTMLDivElement
	let username__input:HTMLInputElement, password__input:HTMLInputElement
	/** @type {string} */
	let username__error
	$: username__error = $auth0__token__error_?.username
	/** @type {string} */
	let password__error
	$: password__error = $auth0__token__error_?.password
</script>

<div bind:this={root} class="form {$$props.class||''}">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>
		<slot name="login_text">Welcome</slot>
	</h1>
	<form
		action="https://{$AUTH0_DOMAIN_}/oauth/token"
		accept-charset="UTF-8"
		method="post"
		on:submit={event =>
			_.login__onsubmit(event, {
				username__input,
				password__input,
			}, ()=>_.forms__clear__schedule(root))}
	>
		{#if $auth0__token__error_txt_}
			<ul>
				<li class="error {error_class}">
					{$auth0__token__error_txt_}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class={label_class}>Email</div>
				<input
					bind:this={username__input}
					placeholder="your@email.com"
					required="required"
					class="form-control {input_class}"
					class:invalid={username__error}
					type="email"
					id="username-login"
					name="username"/>
			</label>
			<label class="field">
				<div class={label_class}>Password</div>
				<input
					bind:this={password__input}
					placeholder="**********"
					required="required"
					class={input_class}
					class:invalid={password__error}
					id="password-login"
					type="password"
					name="password"/>
			</label>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Login"
				class="button {button_class}"
			/>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__signup__open(ctx)}
			>Don't have an account? Signup&hellip;</label>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__forgot_password__open(ctx)}
			>Forgot Password?</label>
		</footer>
	</form>
</div>

<script>
import { auth0__login__open, auth0__signup__open, auth0__token__error__, AUTH0_DOMAIN__ } from '@ctx-core/auth0'
import { auth0_ui_svelte__getContext } from '../../auth0_ui_svelte__ctx/index.js'
import { Auth0_c } from '../Auth0_c/index.js'
import { Auth0_Dialog_Close } from '../Auth0_Dialog_Close/index.js'
export let ctx, error_class = '', input_class = '', button_class = '', label_class = '.js'
$: ctx = ctx || auth0_ui_svelte__getContext()
const AUTH0_DOMAIN_ = AUTH0_DOMAIN__(ctx)
const auth0__token__error_ = auth0__token__error__(ctx)
const _ = new Auth0_c(ctx)
let email__input: HTMLInputElement, error: typeof $auth0__token__error_.error
$: error = $auth0__token__error_?.error
</script>

<div class="form forgot_password">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>Forgot Password</h1>
	<form
		action="https://{$AUTH0_DOMAIN_}/passwordless/start"
		accept-charset="UTF-8"
		method="post"
		on:submit={event => _.forgot_password__onsubmit(event, { email__input })}
	>
		{#if $auth0__token__error_}
			<ul>
				<li class="error {error_class}">
					{$auth0__token__error_.error}: {$auth0__token__error_.error_description}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class={label_class}>Email</div>
				<input
					bind:this={email__input}
					placeholder="your@email.com"
					required="required"
					class="form-control {input_class}"
					class:invalid={error}
					type="email"
					id="email-forgot_password"
					name="email"/>
			</label>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Reset Password"
				class="button {button_class}"
			/>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__login__open(ctx)}
			>Have an account? Log in&hellip;</label>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__signup__open(ctx)}
			>Don't have an account? Signup&hellip;</label>
		</footer>
	</form>
</div>

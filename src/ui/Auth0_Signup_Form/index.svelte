<script lang="ts">
import {
	auth0__forgot_password__open,
	auth0__login__open,
	auth0__token__error__,
	AUTH0_DOMAIN__,
} from '@ctx-core/auth0'
import { auth0_ui_svelte__getContext } from '../../auth0_ui_svelte__ctx/index.js'
import { Auth0_c } from '../Auth0_c/index.js'
import Auth0_Dialog_Close from '../Auth0_Dialog_Close/index.svelte'
export let ctx, error_class = '', input_class = '', button_class = '', label_class = '.js'
$: ctx = ctx || auth0_ui_svelte__getContext()
const AUTH0_DOMAIN_ = AUTH0_DOMAIN__(ctx)
const auth0__token__error_ = auth0__token__error__(ctx)
const _ = new Auth0_c(ctx)
let root:HTMLDivElement
let email__input:HTMLInputElement, password__input:HTMLInputElement, password_confirmation__input:HTMLInputElement
let username__error:string|undefined //region
$: username__error = $auth0__token__error_?.username //endregion
let password__error:string|undefined //region
$: password__error = $auth0__token__error_?.password //endregion
let password_confirmation__has_error:boolean //region
$: password_confirmation__has_error = !!$auth0__token__error_ //endregion
let error_text:string
$: {
	let error_text_a = []
	if ($auth0__token__error_) {
		for (let key in $auth0__token__error_) {
			error_text_a.push($auth0__token__error_[key])
		}
	}
	error_text = error_text_a.join('<br>') || ''
}
</script>

<div bind:this={root} class="form signup">
	<Auth0_Dialog_Close/>
	<h1><slot name="signup_text">Sign Up</slot></h1>
	<form
		action="https://{$AUTH0_DOMAIN_}/dbconnections/signup"
		accept-charset="UTF-8"
		method="post"
		on:submit={event =>
			_.signup__onsubmit(event, {
				email__input,
				password__input,
				password_confirmation__input,
			}, ()=>_.forms__clear__schedule(root))
		}
	>
		{#if $auth0__token__error_}
			<ul>
				<li class="error {error_class}">
					{error_text}
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
					autocomplete="email"
					class="form-control {input_class}"
					class:invalid={username__error}
					type="email"
					id="email-signup"
					name="email"/>
			</label>
			<label class="field">
				<div class={label_class}>Password</div>
				<input
					bind:this={password__input}
					placeholder="**********"
					required="required"
					class={input_class}
					class:invalid={password__error}
					id="password-signup"
					type="password"
					name="password"/>
			</label>
			<label class="field">
				<div class={label_class}>Confirm Password</div>
				<input
					bind:this={password_confirmation__input}
					placeholder="**********"
					required="required"
					class={input_class}
					class:invalid={password_confirmation__has_error}
					type="password"
					name="password_confirmation"
					id="password_confirmation-signup"/>
			</label>
			<slot name="tos__signup">
				<p>
					By clicking ‘Sign up’ you agree to the terms of this Website <br>
					<a href="." target="_blank">Terms of Service</a>
					and
					<a href="." target="_blank">Privacy Policy</a>
				</p>
			</slot>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Sign up"
				class="button {button_class}"
			/>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__login__open(ctx)}
			>Have an account? Log in&hellip;</label>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__forgot_password__open(ctx)}
			>Forgot Password?</label>
		</footer>
	</form>
</div>

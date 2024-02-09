<script>
	import { auth0__token__error$_, AUTH0_DOMAIN$_ } from '@ctx-core/auth0'
	import { createEventDispatcher } from 'svelte'
	import { auth0_ui_svelte__getContext } from '../../auth0_ui_svelte__ctx/index.js'
	import { Auth0_c } from '../Auth0_c/index.js'
	import { Auth0_Dialog_Close } from '../Auth0_Dialog_Close/index.js'
	const ctx = auth0_ui_svelte__getContext()
	const dispatch = createEventDispatcher()
	export let error_class = '', input_class = '', button_class = '', label_class = '.js'
	const AUTH0_DOMAIN_ = AUTH0_DOMAIN$_(ctx)
	const auth0__token__error_ = auth0__token__error$_(ctx)
	const _ = new Auth0_c(ctx)
	/** @type {HTMLDivElement} */
	let root
	/** @type {HTMLInputElement} */
	let password__input
	let password_confirmation__input
	let password__error
	$: password__error = $auth0__token__error_?.password
	/** @type {string} */
	let password_confirmation__error
	$: password_confirmation__error = $auth0__token__error_?.password_confirmation
	/**
	 * @param {FormDataEvent}event
	 */
	async function change_password__onsubmit(event) {
		dispatch(/** @type {any} */'submit__start')
		try {
			await _.change_password__onsubmit(event, {
				password__input,
				password_confirmation__input,
			}, ()=>_.forms__clear__schedule(root))
			dispatch(/** @type {any} */'success')
		} catch (error) {
			dispatch(/** @type {any} */'error', { error })
			throw error
		} finally {
			dispatch(/** @type {any} */'submit__end')
		}
	}
</script>

<div bind:this={root} class="form change_password Auth0_Change_Password_Form">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>Change Password</h1>
	<form
		action="https://{$AUTH0_DOMAIN_}/dbconnections/change_password"
		accept-charset="UTF-8"
		method="post"
		on:submit|preventDefault={change_password__onsubmit}
	>
		{#if $auth0__token__error_}
			<ul>
				{#if password__error}
					<li class="error {error_class}">
						{password__error}
					</li>
				{/if}
				{#if password_confirmation__error}
					<li class="error {error_class}">
						{password_confirmation__error}
					</li>
				{/if}
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class={label_class}>Password</div>
				<input
					bind:this={password__input}
					placeholder="**********"
					required="required"
					class={input_class}
					class:invalid={password__error}
					id="password-change_password"
					type="password"
					name="password"/>
			</label>
			<label class="field">
				<div class={label_class}>Confirm Password</div>
				<input
					bind:this={password_confirmation__input}
					type="password"
					id="password_confirmation-change_password"
					name="password_confirmation"
					class={input_class}
					class:invalid={password_confirmation__error}
					required="required"
					placeholder="**********"
				/>
			</label>
		</fieldset>
		<footer>
			<input type="submit" value="Change Password" class="button {button_class}"/>
		</footer>
	</form>
</div>

<script>
	import {
		auth0__change_password__opened$_,
		auth0__forgot_password__check_email__opened$_,
		auth0__forgot_password__opened$_,
		auth0__login__opened$_,
		auth0__opened__class$_,
		auth0__signup__opened$_,
	} from '@ctx-core/auth0'
	import { ctx__new } from 'ctx-core/be'
	import { auth0_ui_svelte__setContext } from '../../auth0_ui_svelte__ctx/index.js'
	import { Auth0_c } from '../Auth0_c/index.js'
	import Auth0_Change_Password_Form from '../Auth0_Change_Password_Form/index.js'
	import Auth0_Dialog_Close from '../Auth0_Dialog_Close/index.js'
	import Auth0_Forgot_Password_Check_Email_Form from '../Auth0_Forgot_Password_Check_Email_Form/index.js'
	import Auth0_Forgot_Password_Form from '../Auth0_Forgot_Password_Form/index.js'
	import Auth0_Login_Form from '../Auth0_Login_Form/index.js'
	import Auth0_Signup_Form from '../Auth0_Signup_Form/index.js'
	export let ctx = ctx__new(), dialog = false
	auth0_ui_svelte__setContext(ctx)
	const auth0__change_password__opened_ = auth0__change_password__opened$_(ctx)
	const auth0__opened__class_ = auth0__opened__class$_(ctx)
	const auth0__forgot_password__check_email__opened_ = auth0__forgot_password__check_email__opened$_(ctx)
	const auth0__forgot_password__opened_ = auth0__forgot_password__opened$_(ctx)
	const auth0__login__opened_ = auth0__login__opened$_(ctx)
	const auth0__signup__opened_ = auth0__signup__opened$_(ctx)
	const _ = new Auth0_c(ctx)
</script>

<div
	class="Auth0 {$auth0__opened__class_} {$$props.class || ''}"
	class:dialog
	class:visible={!!$auth0__opened__class_}
>
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	{#if $auth0__login__opened_}
		<Auth0_Login_Form {...$$props}></Auth0_Login_Form>
	{:else if $auth0__signup__opened_}
		<Auth0_Signup_Form {...$$props}>
			<div slot="tos__signup"></div>
		</Auth0_Signup_Form>
	{:else if $auth0__forgot_password__opened_}
		<Auth0_Forgot_Password_Form {...$$props}></Auth0_Forgot_Password_Form>
	{:else if $auth0__forgot_password__check_email__opened_}
		<Auth0_Forgot_Password_Check_Email_Form></Auth0_Forgot_Password_Check_Email_Form>
	{:else if $auth0__change_password__opened_}
		<Auth0_Change_Password_Form {...$$props}></Auth0_Change_Password_Form>
	{/if}
	<slot></slot>
</div>

<style lang="scss">
	:global(.Auth0) {
		display: block;
		overflow: hidden;
		&.dialog {
			:global(div) {
				:global(.close) {
					display: block;
				}
			}
		}
		:global(h1) {
			font-size: 2rem;
			text-align: center;
		}
		[name=auth_navigation] {
			display: none;
			~ .form {
				display: none;
			}
			&.auth_navigation-signup:checked {
				~ .signup {
					display: block;
				}
			}
			&.auth_navigation-login:checked {
				~ .login {
					display: block;
				}
			}
			&.auth_navigation-forgot_password:checked {
				~ .forgot_password {
					display: block;
				}
			}
			&.auth_navigation-forgot_password_check_email:checked {
				~ .forgot_password_check_email {
					display: block;
				}
			}
			&.auth_navigation-change_password:checked {
				~ .change_password {
					display: block;
				}
			}
		}
		:global(label.auth_navigation) {
			color: #3EBBC0;
			font-weight: bold;
			&:hover {
				text-decoration: underline;
			}
		}
		> :global(div) {
			position: relative;
			height: 100%;
			> :global(.close) {
				display: none;
				position: absolute;
				right: 0;
			}
		}
		:global(form) {
			:global(input) {
				line-height: 1.8rem;
				border-color: transparent;
				border-bottom: 2px solid lightgrey;
				&.invalid {
					border-color: red;
				}
			}
			:global(label) {
				display: block;
			}
			:global(fieldset) {
				clear: both;
				border: none;
				:global(.field) {
					width: 20em;
					margin: 0 auto;
					display: block;
					clear: both;
					text-align: left;
					:global(input) {
						display: block;
						width: 100%;
						padding: 0.2em;
						color: black;
					}
				}
				:global(p) {
					margin-bottom: 0;
					-webkit-margin-after: 0;
				}
			}
			:global(footer) {
				margin-top: 1rem;
				text-align: center;
				:global(.button) {
					float: none;
					width: 10em;
					padding: 0.4rem;
					color: white;
					background-color: #3EBBC0;
					border-radius: 5px;
					border: none;
					&:hover {
						background-color: #5CC6CA;
					}
				}
				:global(label) {
					margin-top: 1em;
				}
			}
		}
		:global(.error) {
			color: red;
		}
	}
</style>

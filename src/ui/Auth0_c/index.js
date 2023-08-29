import {
	auth0__body_,
	auth0__change_password__POST__fetch2,
	auth0__change_password__validate,
	auth0__close,
	auth0__dbconnections_signup__GET__fetch,
	auth0__forgot_password__check_email__open,
	auth0__forgot_password__validate,
	auth0__login__open,
	auth0__oauth_token__POST__fetch2,
	auth0__opened__class$_,
	auth0__passwordless_start__POST__fetch2,
	auth0__signup__validate,
	auth0__token__error__clear,
	auth0__token__error__logout,
	auth0__token__error__set,
	auth0__token__json__set,
	password_realm__body_
} from '@ctx-core/auth0'
import { dom_a_, has_dom } from '@ctx-core/dom'
import { noop } from '@ctx-core/function'
import { onDestroy } from 'svelte'
/** @typedef {import('@ctx-core/object').Ctx}Ctx */
/** @typedef {import('@ctx-core/auth0').auth0__client_id__body_T}auth0__client_id__body_T */
/** @typedef {import('@ctx-core/auth0').auth0__login_data_T}auth0__login_data_T */
/** @typedef {import('@ctx-core/auth0').auth0__signup_data_T}auth0__signup_data_T */
/** @typedef {import('./index.d.ts').change_password__onsubmit__o_T}change_password__onsubmit__o_T */
/** @typedef {import('./index.d.ts').forgot_password__onsubmit__o_T}forgot_password__onsubmit__o_T */
/** @typedef {import('./index.d.ts').login__onsubmit__o_T}login__onsubmit__o_T */
/** @typedef {import('./index.d.ts').signup__onsubmit__o_T}signup__onsubmit__o_T */
export class Auth0_c {
	/**
	 * @param ctx{Ctx}
	 */
	constructor(ctx) {
		this.ctx = ctx
		/**
		 * @param root{HTMLElement}
		 * @return {Promise<void>}
		 */
		this.onMount = async (root)=>{
			if (has_dom) {
				const unsubscribe =
					auth0__opened__class$_(ctx).subscribe(()=>
						this.forms__clear__schedule(root))
				onDestroy(unsubscribe)
			}
		}
		/**
		 * @param data{auth0__login_data_T}
		 * @param forms__clear__schedule{()=>void}
		 * @return {Promise<void>}
		 */
		this.login = async (data, forms__clear__schedule = ()=>{})=>{
			/** @type {auth0__login_data_T} */
			const body = password_realm__body_(
				this.ctx, auth0__body_(this.ctx, data))
			const [auth0__token, response] =
				await auth0__oauth_token__POST__fetch2(this.ctx, body)
			if (response.ok) {
				const auth0__token__json = JSON.stringify(auth0__token)
				auth0__token__json__set(ctx, auth0__token__json)
				forms__clear__schedule()
				auth0__close(this.ctx)
			} else {
				const auth0__token__error = auth0__token
				auth0__token__error__set(ctx, auth0__token__error)
				auth0__token__error__logout(this.ctx, auth0__token__error)
			}
		}
		/**
		 * @param data{auth0__signup_data_T}
		 * @param forms__clear__schedule{()=>void}
		 * @return {Promise<void>}
		 */
		this.signup = async (
			data,
			forms__clear__schedule = ()=>{}
		)=>{
			/** @type {auth0__signup_data_T} */
			const body =
				password_realm__body_(this.ctx, auth0__body_(this.ctx, data))
			const [auth0_userinfo] =
				await auth0__dbconnections_signup__GET__fetch(this.ctx, body)
			const auth0_userinfo_Auth0Error = auth0_userinfo
			const { statusCode } = auth0_userinfo_Auth0Error
			if (statusCode) {
				const { code, description } = auth0_userinfo_Auth0Error
				const email =
					code === 'user_exists'
					? 'This Email is already signed up'
					: description || ''
				const auth0_token_error = { email }
				auth0__token__error__logout(this.ctx, auth0_token_error)
				return
			}
			forms__clear__schedule()
			await this.login({
				username: data.email,
				password: data.password
			}, forms__clear__schedule)
		}
		/**
		 * @param form{{ password:string }}
		 * @param forms__clear__schedule{()=>void}
		 * @return {Promise<void>}
		 */
		this.change_password = async (
			form,
			forms__clear__schedule = ()=>{}
		)=>{
			const { password } = form
			let error
			try {
				const [
					response_json,
					response
				] = await auth0__change_password__POST__fetch2(this.ctx, password)
				if (!response.ok) {
					if (response.status == 401) {
						auth0__login__open(this.ctx)
						const auth0_token_error = {
							username: 'Authentication Error - Log in'
						}
						auth0__token__error__logout(this.ctx, auth0_token_error)
						return
					}
					error = response_json.error || 'Error changing Password'
				}
			} catch (e) {
				console.warn(e)
				error = e.message
			}
			if (error) {
				const auth0_token_error = {
					password: error
				}
				auth0__token__error__logout(this.ctx, auth0_token_error)
				return
			}
			forms__clear__schedule()
			auth0__close(this.ctx)
		}
		/**
		 * @param root{HTMLElement}
		 * @return {{()=>void}}
		 * @private
		 */
		this.forms__clear__schedule_ = (root)=>{
			return ()=>this.forms__clear__schedule(root)
		}
		/**
		 * @param root{HTMLElement}
		 */
		this.forms__clear__schedule = (root)=>{
			setTimeout(()=>{
				auth0__token__error__clear(this.ctx)
				inputs__clear([...dom_a_('input[type=text]', root)])
				inputs__clear([...dom_a_('input[type=password]', root)])
			}, 100)
		}
		/**
		 * @param event{Event}
		 * @param params{signup__onsubmit__o_T}
		 * @param forms__clear__schedule
		 * @return {Promise<boolean>}
		 */
		this.signup__onsubmit = async (
			event, params, forms__clear__schedule = ()=>{}
		)=>{
			event.preventDefault()
			const {
				email__input,
				password__input,
				password_confirmation__input
			} = params
			const email = email__input.value
			const password = password__input.value
			const password_confirmation = password_confirmation__input.value
			const auth0__token__error =
				auth0__signup__validate({
					email,
					password,
					password_confirmation
				})
			if (auth0__token__error) {
				auth0__token__error__logout(this.ctx, auth0__token__error)
				return false
			}
			await this.signup({
				email,
				password
			}, forms__clear__schedule)
			return true
		}
		/**
		 * @param event{Event}
		 * @param params{login__onsubmit__o_T}
		 * @param forms__clear__schedule{()=>void}
		 * @return {Promise<void>}
		 */
		this.login__onsubmit = async (
			event,
			params,
			forms__clear__schedule = ()=>{}
		)=>{
			event.preventDefault()
			const {
				username__input,
				password__input
			} = params
			const username = username__input.value
			const password = password__input.value
			await this.login({ username, password }, forms__clear__schedule)
		}
		/**
		 * @param event{Event}
		 * @param params{forgot_password__onsubmit__o_T}
		 * @return {Promise<void>}
		 */
		this.forgot_password__onsubmit = async (
			event,
			params
		)=>{
			event.preventDefault()
			const { email__input } = params
			const email = email__input.value
			const data = {
				connection: 'email',
				send: 'link',
				email
			}
			const auth0_token_error = auth0__forgot_password__validate(data)
			if (auth0_token_error) {
				auth0__token__error__logout(this.ctx, auth0_token_error)
				return
			}
			await auth0__passwordless_start__POST__fetch2(
				this.ctx,
				auth0__body_(this.ctx, data))
			auth0__forgot_password__check_email__open(this.ctx)
		}
		/**
		 * @param event{Event}
		 * @param params{change_password__onsubmit__o_T}
		 * @param forms__clear__schedule{()=>void}
		 * @return {Promise<void>}
		 */
		this.change_password__onsubmit = async (
			event, params, forms__clear__schedule = noop
		)=>{
			event.preventDefault()
			const { password__input, password_confirmation__input } = params
			const password = password__input.value
			const password_confirmation = password_confirmation__input.value
			const auth0_token_error = auth0__change_password__validate({
				password,
				password_confirmation
			})
			if (auth0_token_error) {
				auth0__token__error__logout(this.ctx, auth0_token_error)
				throw auth0_token_error
				throw auth0_token_error
			}
			return await this.change_password({
				password
			}, forms__clear__schedule)
		}
		/**
		 * @param event{MouseEvent}
		 * @return {Promise<void>}
		 */
		this.onclose = async (event)=>{
			event.preventDefault()
			auth0__close(this.ctx)
		}
	}
}
/**
 * @param inputs{HTMLInputElement[]}
 */
function inputs__clear(inputs) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i]
		input.value = ''
	}
}

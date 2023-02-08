import {
	auth0__body_,
	auth0__change_password__fetch_post,
	auth0__change_password__validate,
	type auth0__client_id__body_T,
	auth0__close,
	auth0__dbconnections_signup__fetch_get,
	auth0__forgot_password__check_email__open,
	auth0__forgot_password__validate,
	type auth0__grant_type__body_T,
	auth0__login__open,
	type auth0__login_data_T,
	type auth0__oauth_token__fetch__body_T,
	auth0__oauth_token__fetch_post,
	auth0__opened__class__,
	type auth0__passwordless_start__fetch__body_T,
	type auth0__passwordless_start__fetch__optional_body_T,
	auth0__passwordless_start__fetch_post,
	auth0__signup__validate,
	type auth0__signup_data_T,
	auth0__token__error__,
	auth0__token__error__clear,
	auth0__token__error__logout,
	type auth0__token__error_T,
	auth0__token__json__,
	password_realm__body_,
	type password_realm__body_T,
} from '@ctx-core/auth0'
import { dom_a_, has_dom } from '@ctx-core/dom'
import { noop } from '@ctx-core/function'
import type { Ctx } from '@ctx-core/object'
import type { Auth0Error } from 'auth0-js'
import { onDestroy } from 'svelte'
export class Auth0_c {
	constructor(protected ctx:Ctx) {}
	readonly auth0__login__body_ = (data:any)=>
		auth0__body_<login__password_realm__body_T>(
			this.ctx, data)
	readonly auth0__login__password_realm__body_ = (data:any)=>
		password_realm__body_<login__password_realm__body_T>(
			this.ctx,
			this.auth0__login__body_(data))
	readonly auth0__signup__body_ = (data:any)=>
		auth0__body_<signup__password_realm__body_T>(this.ctx, data) as signup__password_realm__body_T
	readonly auth0__signup__password_realm__body_ = (data:any)=>
		password_realm__body_<signup__password_realm__body_T>(this.ctx, this.auth0__signup__body_(data))
	readonly auth0__opened__class_ = auth0__opened__class__(this.ctx)
	readonly auth0__token__json_ = auth0__token__json__(this.ctx)
	readonly auth0__token__error_ = auth0__token__error__(this.ctx)
	readonly auth0__close = ()=>auth0__close(this.ctx)
	readonly onMount = async (root:HTMLElement)=>{
		if (has_dom) {
			const unsubscribe =
				this.auth0__opened__class_.subscribe(()=>this.forms__clear__schedule(root))
			onDestroy(unsubscribe)
		}
	}
	readonly login = async (data:auth0__login_data_T, forms__clear__schedule = ()=>{})=>{
		const [auth0_token, response] = await auth0__oauth_token__fetch_post(
			this.ctx, this.auth0__login__password_realm__body_(data)
		)
		if (response.ok) {
			const auth0__token__json = JSON.stringify(auth0_token)
			this.auth0__token__json_.$ = auth0__token__json
			forms__clear__schedule()
			this.auth0__close()
		} else {
			const auth0__token__error = auth0_token as auth0__token__error_T
			this.auth0__token__error_.$ = auth0__token__error
			auth0__token__error__logout(this.ctx, auth0__token__error)
		}
	}
	readonly signup = async (data:auth0__signup_data_T, forms__clear__schedule = ()=>{})=>{
		const [auth0_userinfo] = await auth0__dbconnections_signup__fetch_get(
			this.ctx,
			this.auth0__signup__password_realm__body_(data))
		const auth0_userinfo_Auth0Error = auth0_userinfo as Auth0Error
		const { statusCode } = auth0_userinfo_Auth0Error
		if (statusCode) {
			const {
				code,
				description
			} = auth0_userinfo_Auth0Error
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
			password: data.password,
		}, forms__clear__schedule)
	}
	readonly change_password = async (form:{ password:string }, forms__clear__schedule = ()=>{})=>{
		const { password } = form
		let error
		try {
			const [response_json, response] = await auth0__change_password__fetch_post(this.ctx, password)
			if (!response.ok) {
				if (response.status == 401) {
					auth0__login__open(this.ctx)
					const auth0_token_error = { username: 'Authentication Error - Log in' }
					auth0__token__error__logout(this.ctx, auth0_token_error)
					return
				}
				error = response_json.error || 'Error changing Password'
			}
		} catch (e:any) {
			console.warn(e)
			error = e.message
		}
		if (error) {
			const auth0_token_error = { password: error }
			auth0__token__error__logout(this.ctx, auth0_token_error)
			return
		}
		forms__clear__schedule()
		this.auth0__close()
	}
	readonly forms__clear__schedule_:(root:HTMLElement)=>void = (root:HTMLElement)=>{
		return ()=>this.forms__clear__schedule(root)
	}
	readonly forms__clear__schedule = (root:HTMLElement)=>{
		setTimeout(()=>{
			auth0__token__error__clear(this.ctx)
			inputs__clear(dom_a_('input[type=text]', root))
			inputs__clear(dom_a_('input[type=password]', root))
		}, 100)
	}
	readonly signup__onsubmit = async (event:Event, ctx:signup__onsubmit__o_T, forms__clear__schedule = ()=>{})=>{
		event.preventDefault()
		const {
			email__input,
			password__input,
			password_confirmation__input,
		} = ctx
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
		return
	}
	readonly login__onsubmit = async (
		event:Event, ctx:login__onsubmit__o_T, forms__clear__schedule = ()=>{}
	)=>{
		event.preventDefault()
		const { username__input, password__input } = ctx
		const username = username__input.value
		const password = password__input.value
		await this.login({ username, password }, forms__clear__schedule)
	}
	readonly forgot_password__onsubmit = async (event:Event, ctx:forgot_password__onsubmit__o_T)=>{
		event.preventDefault()
		const { email__input } = ctx
		const email = email__input.value
		const data:auth0__passwordless_start__fetch__optional_body_T = {
			connection: 'email',
			send: 'link',
			email
		}
		const auth0_token_error = auth0__forgot_password__validate(data)
		if (auth0_token_error) {
			auth0__token__error__logout(this.ctx, auth0_token_error)
			return
		}
		await auth0__passwordless_start__fetch_post(
			this.ctx, this.auth0__login__body_(data) as auth0__passwordless_start__fetch__body_T)
		auth0__forgot_password__check_email__open(this.ctx)
	}
	readonly change_password__onsubmit = async (
		event:Event, ctx:change_password__onsubmit__o_T, forms__clear__schedule = noop
	)=>{
		event.preventDefault()
		const {
			password__input,
			password_confirmation__input,
		} = ctx
		const password = password__input.value
		const password_confirmation = password_confirmation__input.value
		const auth0_token_error =
			auth0__change_password__validate(
				{
					password,
					password_confirmation
				})
		if (auth0_token_error) {
			auth0__token__error__logout(this.ctx, auth0_token_error)
			throw auth0_token_error
		}
		return await this.change_password({ password }, forms__clear__schedule)
	}
	readonly onclose = async (event:MouseEvent)=>{
		event.preventDefault()
		this.auth0__close()
	}
}
function inputs__clear(inputs:NodeList) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i] as HTMLInputElement
		input.value = ''
	}
}
export interface signup__password_realm__body_T
	extends auth0__signup_data_T,
		auth0__client_id__body_T,
		auth0__passwordless_start__fetch__body_T,
		password_realm__body_T,
		auth0__grant_type__body_T,
		auth0__oauth_token__fetch__body_T {}
export interface login__password_realm__body_T
	extends auth0__login_data_T,
		auth0__client_id__body_T,
		auth0__passwordless_start__fetch__body_T,
		password_realm__body_T,
		auth0__grant_type__body_T,
		auth0__oauth_token__fetch__body_T {}
export interface change_password__onsubmit__o_T {
	password__input:HTMLInputElement
	password_confirmation__input:HTMLInputElement
}
export interface forgot_password__onsubmit__o_T {
	email__input:HTMLInputElement
}
export interface login__onsubmit__o_T {
	username__input:HTMLInputElement
	password__input:HTMLInputElement
}
export interface signup__onsubmit__o_T {
	email__input:HTMLInputElement
	password__input:HTMLInputElement
	password_confirmation__input:HTMLInputElement
}

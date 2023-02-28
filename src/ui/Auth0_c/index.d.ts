import type {
	auth0__client_id__body_T,
	auth0__grant_type__body_T,
	auth0__login_data_T,
	auth0__oauth_token__fetch__body_T,
	auth0__passwordless_start__fetch_post__body_T,
	auth0__signup_data_T,
	auth0__token__error_T,
	auth0__opened_T,
	password_realm__body_T
} from '@ctx-core/auth0'
import type { noop, nullish } from '@ctx-core/function'
import type { ReadableAtom_, WritableAtom_ } from '@ctx-core/nanostores'
import type { Ctx } from '@ctx-core/object'
export declare class Auth0_c {
	protected ctx:Ctx
	constructor(ctx:Ctx);
	readonly auth0__opened__class_:ReadableAtom_<auth0__opened_T>
	readonly auth0__token__json_:WritableAtom_<string|nullish>
	readonly auth0__token__error_:WritableAtom_<auth0__token__error_T>
	readonly onMount:(root:HTMLElement)=>Promise<void>
	readonly login:(data:auth0__login_data_T, forms__clear__schedule?:()=>void)=>Promise<void>
	readonly signup:(data:auth0__signup_data_T, forms__clear__schedule?:()=>void)=>Promise<void>
	readonly change_password:(form:{ password:string }, forms__clear__schedule?:()=>void)=>Promise<void>
	readonly forms__clear__schedule_:(root:HTMLElement)=>void
	readonly forms__clear__schedule:(root:HTMLElement)=>void
	readonly signup__onsubmit:(
		event:Event, params:signup__onsubmit__o_T, forms__clear__schedule?:()=>void
	)=>Promise<false|undefined>
	readonly login__onsubmit:(
		event:Event, params:login__onsubmit__o_T, forms__clear__schedule?:()=>void
	)=>Promise<void>
	readonly forgot_password__onsubmit:(event:Event, params:forgot_password__onsubmit__o_T)=>Promise<void>
	readonly change_password__onsubmit:(event:Event, params:change_password__onsubmit__o_T, forms__clear__schedule?:typeof noop)=>Promise<void>
	readonly onclose:(event:MouseEvent)=>Promise<void>
}
export type signup__password_realm__body_T =
	auth0__signup_data_T
	|auth0__client_id__body_T
	|auth0__passwordless_start__fetch_post__body_T
	|password_realm__body_T
	|auth0__grant_type__body_T
	|auth0__oauth_token__fetch__body_T
export type login__password_realm__body_T =
	auth0__login_data_T
	|auth0__client_id__body_T
	|auth0__passwordless_start__fetch_post__body_T
	|password_realm__body_T
	|auth0__grant_type__body_T
	|auth0__oauth_token__fetch__body_T
export interface change_password__onsubmit__o_T {
	password__input:HTMLInputElement;
	password_confirmation__input:HTMLInputElement;
}
export interface forgot_password__onsubmit__o_T {
	email__input:HTMLInputElement;
}
export interface login__onsubmit__o_T {
	username__input:HTMLInputElement;
	password__input:HTMLInputElement;
}
export interface signup__onsubmit__o_T {
	email__input:HTMLInputElement;
	password__input:HTMLInputElement;
	password_confirmation__input:HTMLInputElement;
}

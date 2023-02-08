import type { SvelteComponentTyped } from 'svelte'
import { Ctx } from '@ctx-core/object'
export class Auth0_Signup_Form extends SvelteComponentTyped<{
	ctx?:Ctx
	error_class?:string
	input_class?:string
	button_class?:string
	label_class?:string
}> {}

import type { SvelteComponentTyped } from 'svelte'
import type { Ctx } from '@ctx-core/object'
export class Auth0_Change_Password_Form extends SvelteComponentTyped<{
	ctx?:Ctx
	error_class?:string
	input_class?:string
	button_class?:string
	label_class?:string
}, {
	success:undefined
	error:{ error:any }
	submit__start:undefined
	submit__end:undefined
}> {}

import type { Ctx } from '@ctx-core/object'
import type { SvelteComponent } from 'svelte'
export class Auth0_Login_Form extends SvelteComponent<{
	ctx:Ctx
	error_class?:string
	input_class?:string
	button_class?:string
	label_class?:string
}> {
}

import type { Ctx } from 'ctx-core/be'
import type { SvelteComponent } from 'svelte'
export class Auth0 extends SvelteComponent<{
	ctx?:Ctx
	dialog?:boolean
}> {
}

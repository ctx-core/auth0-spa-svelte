import type { ctx_T } from 'ctx-core/be'
import type { SvelteComponent } from 'svelte'
export class Auth0 extends SvelteComponent<{
	ctx?:ctx_T
	dialog?:boolean
}> {
}

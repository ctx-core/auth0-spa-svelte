import type { Ctx } from '@ctx-core/object'
import type { SvelteComponent } from 'svelte'
export class Auth0 extends SvelteComponent<{
	ctx?:Ctx
	dialog?:boolean
}> {
}

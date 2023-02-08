import type  { SvelteComponentTyped } from 'svelte'
import type  { Ctx } from '@ctx-core/object'
export class Auth0 extends SvelteComponentTyped<{
	ctx?:Ctx
	dialog?:boolean
}> {}

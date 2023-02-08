import { getContext } from 'svelte'
import { auth0__ui__o_key } from '@ctx-core/auth0-ui'
import type { Ctx } from '@ctx-core/object'
export function auth0__ui__o__getContext() {
	return getContext(auth0__ui__o_key) as Ctx
}

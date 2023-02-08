import { getContext, setContext } from 'svelte'
export const auth0_ui_svelte__ctx__key = Symbol('auth0_ui_svelte__ctx')
export function auth0_ui_svelte__getContext() {
	return getContext(auth0_ui_svelte__ctx__key)
}
export function auth0_ui_svelte__setContext(ctx) {
	return setContext(auth0_ui_svelte__ctx__key, ctx)
}
export {
	auth0_ui_svelte__ctx__key as auth0__ui__o_key,
	auth0_ui_svelte__getContext as auth0__ui__o__getContext,
}

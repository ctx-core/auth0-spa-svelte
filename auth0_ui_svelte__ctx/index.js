import { getContext, setContext } from 'svelte'
/** @typedef {import('@ctx-core/object').Ctx}Ctx */
export const auth0_ui_svelte__ctx__key = Symbol('auth0_ui_svelte__ctx')
/**
 * @return {Ctx}
 */
export function auth0_ui_svelte__getContext() {
	return getContext(auth0_ui_svelte__ctx__key)
}
/**
 * @param ctx{Ctx}
 * @return {Ctx}
 */
export function auth0_ui_svelte__setContext(ctx) {
	return setContext(auth0_ui_svelte__ctx__key, ctx)
}
export {
	auth0_ui_svelte__ctx__key as auth0__ui__o_key,
	auth0_ui_svelte__getContext as auth0__ui__o__getContext,
}

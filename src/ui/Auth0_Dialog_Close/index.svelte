<script lang="ts">
import { CloseDialogHandle } from '@ctx-core/dialog-ui-svelte'
import { auth0_ui_svelte__getContext } from '../../auth0_ui_svelte__ctx/index.js'
import { Auth0_c } from '../Auth0_c/index.js'
const ctx = auth0_ui_svelte__getContext()
const _ = new Auth0_c(ctx)
</script>

<CloseDialogHandle on:click={_.onclose}></CloseDialogHandle>

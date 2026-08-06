<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import ContextMenu from "./context-menu.svelte"
	import DoomscrllWordmark from "./icons/doomscrll-wordmark.svelte"
	import Icon from "./icons/icon.svelte"

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common.appbar)
</script>

<nav class="grid h-min w-full grid-cols-[1fr_auto_1fr] items-center justify-items-center">
	<SlabAnchor href="/" variant="text" fit="square" size="small" ariaLabel={dict.ariaLabelBack}>
		<Icon icon="Home" size="small" />
	</SlabAnchor>
	<DoomscrllWordmark />
	<ContextMenu />
</nav>

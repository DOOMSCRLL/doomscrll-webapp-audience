<script lang="ts">
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import ContextMenu from "./context-menu.svelte"
	import DoomscrllWordmark from "./icons/doomscrll-wordmark.svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		prevHref?: "/" | `/feed?category=${string}&page=${number}`
	}

	const { prevHref = "/" }: Props = $props()
</script>

<nav class="grid h-min w-full grid-cols-[1fr_auto_1fr] items-center justify-items-center">
	<SlabAnchor href={prevHref} variant="text" fit="square" size="small" ariaLabel="MISSING_BACK_LABEL">
		<Icon icon="ArrowBack" size="small" />
	</SlabAnchor>
	<DoomscrllWordmark />
	<ContextMenu />
</nav>

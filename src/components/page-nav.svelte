<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import Icon from "./icons/icon.svelte"

	type FeedHref = `/feed?${string}`
	type Props = {
		currentPage?: number
		countPages?: number
		prevHref?: FeedHref
		nextHref?: FeedHref
	}

	let { countPages = 1, currentPage = 1, prevHref, nextHref }: Props = $props()
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).feed.nav)
</script>

<section class="grid grid-cols-3 items-center justify-items-center gap-2">
	{#if prevHref}
		<SlabAnchor href={prevHref} variant="text" fit="square" size="small" ariaLabel={dict.labelPrevPage}>
			<Icon icon="ArrowBack" size="small" />
		</SlabAnchor>
	{/if}
	<p class="col-2 font-mono text-xl font-bold tracking-wider text-inverse">
		{currentPage}<span class="text-accent">/{countPages}</span>
	</p>
	{#if nextHref}
		<SlabAnchor href={nextHref} variant="text" fit="square" size="small" ariaLabel={dict.labelNextPage}>
			<Icon icon="ArrowForward" size="small" />
		</SlabAnchor>
	{/if}
</section>

<script lang="ts">
	import type { PageData, Snapshot } from "./$types"

	import { LocaleContext } from "contexts/shared.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"

	import { afterNavigate } from "$app/navigation"
	import ContextMenu from "comps/context-menu.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import PageNav from "comps/page-nav.svelte"
	import PreviewCard from "comps/preview-card.svelte"

	type Props = {
		data: PageData
	}

	const { data }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).feed)

	// #region Page management
	let currentPage = $derived(data.page)
	let countPages = $derived(Math.ceil(data.totalProjectCount / data.batchSize))

	type FeedHref = `/feed?category=${string}&page=${number}`
	const prevHref = $derived<FeedHref | undefined>(
		currentPage <= 1 ? undefined : `/feed?category=${data.selectedCategory}&page=${currentPage - 1}`,
	)
	const nextHref = $derived<FeedHref | undefined>(
		currentPage >= countPages ? undefined : `/feed?category=${data.selectedCategory}&page=${currentPage + 1}`,
	)
	// #endregion

	// #region Scroll position management
	let feedContainer = $state<HTMLElement>()
	afterNavigate(({ type }) => {
		if (type !== "popstate") feedContainer?.scrollTo({ top: 0 })
	})

	export const snapshot: Snapshot<number> = {
		capture: () => feedContainer?.scrollTop ?? 0,
		restore: (prevScrollTop) => {
			setTimeout(() => {
				if (feedContainer) feedContainer.scrollTop = prevScrollTop
			}, 10)
		},
	}
	// #endregion
</script>

<svelte:head>
	<title>{getCategoryLabelFor(data.selectedCategory)} {dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen w-full flex-col justify-between overflow-hidden supports-[height:100dvh]:h-dvh">
	<DoomscrllWordmark />
	<section class="flex flex-col gap-10 overflow-x-hidden overflow-y-auto px-6 pt-6" bind:this={feedContainer}>
		{#each data.previews as preview, itr (preview.referenceId)}
			<PreviewCard {preview} />
			{#if itr < data.previews.length - 1}<hr class="w-full border border-inverse" />{/if}
		{/each}
	</section>
	<section class="flex h-min w-full items-center justify-center bg-obverse py-2">
		<PageNav {currentPage} {countPages} {prevHref} {nextHref} />
		<ContextMenu />
	</section>
</main>

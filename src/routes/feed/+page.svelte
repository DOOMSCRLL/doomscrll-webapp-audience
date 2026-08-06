<script lang="ts">
	import type { PageData, Snapshot } from "./$types"

	import { LocaleContext } from "contexts/shared.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"

	import { afterNavigate } from "$app/navigation"
	import AppNavbar from "comps/app-navbar.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import PageNav from "comps/page-nav.svelte"
	import PreviewCard from "comps/preview-card.svelte"
	import QueryModal from "comps/query-modal.svelte"

	type Props = {
		data: PageData
	}

	const { data }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).feed)

	// #region Page management
	let currentPage = $derived(data.page)
	let countPages = $derived(
		data.queryCount !== undefined
			? Math.max(1, Math.ceil(data.queryCount / data.batchSize))
			: Math.max(1, Math.ceil(data.totalProjectCount / data.batchSize)),
	)

	const prevHref = $derived(
		currentPage <= 1
			? undefined
			: getFeedURLFor(data.selectedCategory as Category, {
					tag: data.tag,
					batchSize: data.batchSize,
					page: currentPage - 1,
				}),
	)
	const nextHref = $derived(
		currentPage >= countPages
			? undefined
			: getFeedURLFor(data.selectedCategory as Category, {
					tag: data.tag,
					batchSize: data.batchSize,
					page: currentPage + 1,
				}),
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

	// #region Category Management
	let isQueryModalOpen = $state(false)
	function handleQueryModalOpen() {
		isQueryModalOpen = true
	}
	//let selectedCategory = $state(untrack(() => data.selectedCategory))
	// #endregion
</script>

<svelte:head>
	<title>{getCategoryLabelFor(data.selectedCategory)} {dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen w-full flex-col justify-between overflow-hidden supports-[height:100dvh]:h-dvh">
	<AppNavbar />
	<section class="flex flex-col gap-10 overflow-x-hidden overflow-y-auto px-6 pt-6" bind:this={feedContainer}>
		{#each data.previews as preview, itr (preview.referenceId)}
			<PreviewCard {preview} />
			{#if itr < data.previews.length - 1}<hr class="w-full border border-inverse" />{/if}
		{/each}
	</section>
	<section
		class={[
			"grid h-min w-full grid-cols-3 items-center justify-center bg-obverse px-4 py-2",
			"[&>section]:col-2 [&>section]:justify-self-center",
			"[&>button]:justify-self-end",
		]}>
		<PageNav {currentPage} {countPages} {prevHref} {nextHref} />
		<SlabButton variant="filled" fit="square" ariaLabel="MISSING_ARIA_LABEL" onClick={handleQueryModalOpen}>
			<Icon icon="Settings" />
		</SlabButton>
	</section>
</main>

<QueryModal
	currentCategory={data.selectedCategory}
	availableCategories={data.projectCounts}
	bind:isOpen={isQueryModalOpen} />

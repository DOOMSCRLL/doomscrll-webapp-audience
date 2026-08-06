<script lang="ts">
	// #region Imports
	import { afterNavigate, goto } from "$app/navigation"
	import { resolve } from "$app/paths"
	import type { PageData, Snapshot } from "./$types"

	import { LocaleContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import type ProjectTag from "models/project-tag"
	import { getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import type { FeedQuery } from "repos/project-repo"
	import { getFeedURLFor } from "utils/project-feed-utils"

	import AppNavbar from "comps/app-navbar.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import TagChip from "comps/data-chips/tag-chip.svelte"
	import Icon from "comps/icons/icon.svelte"
	import PageNav from "comps/page-nav.svelte"
	import PreviewCard from "comps/preview-card.svelte"
	import QueryModal from "comps/query-modal.svelte"
	// #endregion

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

	// #region Query Management
	let isQueryModalOpen = $state(false)
	function handleQueryModalOpen() {
		isQueryModalOpen = true
	}

	function handleQuerySubmit(query: FeedQuery) {
		const category = query.category ?? data.selectedCategory
		const isFiltering = query.tag !== undefined
		const url = getFeedURLFor(category as Category, {
			...query,
			page: 1,
			batchSize: isFiltering ? 40 : undefined,
		})
		goto(resolve(url), { keepFocus: true })
	}

	function removeTagQuery() {
		const url = getFeedURLFor(data.selectedCategory as Category, { page: 1 })
		goto(resolve(url))
	}
	// #endregion
</script>

<svelte:head>
	<title>{getCategoryLabelFor(data.selectedCategory)} {dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen w-full flex-col justify-between overflow-hidden supports-[height:100dvh]:h-dvh">
	<AppNavbar />
	<section class="relative flex flex-col gap-10 overflow-x-hidden overflow-y-auto px-6 pt-6" bind:this={feedContainer}>
		{#each data.previews as preview, itr (preview.referenceId)}
			<PreviewCard {preview} />
			{#if itr < data.previews.length - 1}<hr class="w-full border border-inverse" />{/if}
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<p class="font-serif text-2xl tracking-tight">{dict.copyNoProject}</p>
			</div>
		{/each}
		{#if data.tag}
			<div class="sticky bottom-0 z-10 ml-auto">
				<TagChip tag={data.tag as ProjectTag} isRemoveable={true} onRemove={removeTagQuery} />
			</div>
		{/if}
	</section>
	<section
		class={[
			"grid h-min w-full grid-cols-3 items-center justify-center bg-obverse px-4 py-2",
			"[&>section]:col-2 [&>section]:justify-self-center",
			"[&>button]:justify-self-end",
		]}>
		<PageNav {currentPage} {countPages} {prevHref} {nextHref} />
		<SlabButton variant="filled" fit="square" ariaLabel={dict.ariaLabelQueryTrigger} onClick={handleQueryModalOpen}>
			<Icon icon="Filter" />
		</SlabButton>
	</section>
</main>

<QueryModal
	availableCategories={data.projectCounts}
	currentCategory={data.selectedCategory}
	currentTag={data.tag as ProjectTag}
	onQuerySubmit={handleQuerySubmit}
	bind:isOpen={isQueryModalOpen} />

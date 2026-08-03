<script lang="ts">
	import type { PageData } from "./$types"

	import { LocaleContext } from "contexts/shared.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"

	import ContextMenu from "comps/context-menu.svelte"
	import PreviewCard from "comps/preview-card.svelte"

	type Props = {
		data: PageData
	}

	const { data }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).feed)
</script>

<svelte:head>
	<title>{getCategoryLabelFor(data.selectedCategory)} {dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen w-full flex-col justify-between overflow-hidden supports-[height:100dvh]:h-dvh">
	<section class="flex flex-col gap-10 overflow-y-auto px-6">
		{#each data.previews as preview (preview.referenceId)}
			<PreviewCard {preview} />
		{/each}
	</section>
	<section class="flex h-min w-full items-center justify-center bg-obverse py-2">
		<ContextMenu />
	</section>
</main>

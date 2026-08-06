<script lang="ts">
	import type { ProjectPreview } from "models/project"

	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import TagChip from "./data-chips/tag-chip.svelte"
	import Icon from "./icons/icon.svelte"
	import PreviewCoverImage from "./preview-cover-image.svelte"

	type Props = {
		preview: ProjectPreview
	}

	const { preview }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).feed.previewCard)
</script>

<section class="flex flex-col gap-4">
	<p class="font-mono font-bold tracking-wider text-inverse">@{preview.authorUsername}</p>
	<PreviewCoverImage src={preview.coverImagePath ?? ""} alt="{preview.name} {dict.altCoverSuffix}" />
	<section class="flex h-min w-full flex-wrap justify-center gap-2 gap-y-0">
		{#each preview.tags as tag (tag)}
			<TagChip {tag} />
		{/each}
	</section>
	<section class="grid w-full grid-cols-[auto_1fr_auto] items-center justify-items-center">
		<Icon icon="Starmark" size="small" />
		<p
			class="w-full overflow-hidden text-center font-serif text-2xl font-medium text-nowrap text-ellipsis text-inverse">
			{preview.name}
		</p>
		<SlabAnchor
			href="/project/{preview.referenceId}"
			variant="text"
			fit="square"
			size="small"
			ariaLabel={dict.ariaPreviewAction}>
			<Icon icon="ArrowForward" size="small" />
		</SlabAnchor>
	</section>
</section>

<script lang="ts">
	import type { ProjectPreview } from "models/project"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import Icon from "./icons/icon.svelte"
	import PreviewCoverImage from "./preview-cover-image.svelte"

	type Props = {
		preview: ProjectPreview
	}

	const { preview }: Props = $props()
</script>

<section class="flex flex-col gap-4">
	<p class="font-mono font-bold tracking-wider text-inverse">@{preview.authorUsername}</p>
	<PreviewCoverImage src={preview.coverImagePath ?? ""} alt="MISSING_ALT" />
	<section class="flex h-min w-full gap-2">
		{#each preview.tags as tag (tag)}
			<p
				class="font-serif font-bold whitespace-nowrap even:italic"
				style="color: {hslStrToCss(generateColorFrom(tag))}">
				{tag}
			</p>
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
			ariaLabel="MISSING_LABEL">
			<Icon icon="ArrowForward" size="small" />
		</SlabAnchor>
	</section>
</section>

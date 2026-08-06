<script lang="ts">
	import type ProjectTag from "models/project-tag"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	type Props = {
		tag: ProjectTag
		isRemoveable?: boolean
		onRemove?: (tag: ProjectTag) => void
	}

	const { tag, isRemoveable = false, onRemove }: Props = $props()
	const removeLabel = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.tag.ariaLabelRemove)
</script>

<div class="group flex w-min items-center">
	<div class="rounded-full px-2" style="background-color: {hslStrToCss(generateColorFrom(tag))}">
		<p class="font-serif font-bold whitespace-nowrap text-obverse group-even:italic">
			{tag}
		</p>
	</div>

	{#if isRemoveable && onRemove}
		<SlabButton
			ariaLabel={removeLabel}
			variant="text"
			hasAccent={true}
			fit="square"
			size="small"
			onClick={() => onRemove(tag)}>
			<Icon icon="Cancel" size="small" />
		</SlabButton>
	{/if}
</div>

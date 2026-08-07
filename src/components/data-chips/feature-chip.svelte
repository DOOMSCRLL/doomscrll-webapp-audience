<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		feature: string
		isRemoveable?: boolean
		onRemove?: (feature: string) => void
	}

	const { feature, isRemoveable = false, onRemove }: Props = $props()
	const removeLabel = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.feature.ariaLabelRemove)
</script>

<div class="group flex w-min items-center">
	<div class="rounded-full px-2" style="background-color: {hslStrToCss(generateColorFrom(feature))}">
		<p class="font-serif font-bold whitespace-nowrap text-obverse">
			{feature}
		</p>
	</div>
	{#if isRemoveable && onRemove}
		<SlabButton
			variant="text"
			hasAccent={true}
			fit="square"
			ariaLabel={removeLabel}
			size="small"
			onClick={() => onRemove(feature)}>
			<Icon icon="Cancel" size="small" />
		</SlabButton>
	{/if}
</div>

<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import SlabAnchorExternal from "./buttons/slab-anchor-external.svelte"
	import SlabButton from "./buttons/slab-button.svelte"
	import Icon from "./icons/icon.svelte"
	import LanguageSelector from "./language-selector.svelte"
	import Popover from "./popover.svelte"

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common.contextMenu)

	let trigger = $state<HTMLButtonElement>()
</script>

<SlabButton fit="square" variant="text" size="small" ariaLabel={dict.ariaLabelMenuTrigger} bind:reference={trigger}>
	<Icon icon="Hamburger" size="small" />
</SlabButton>
<Popover horizontalAlignment="right" verticalAlignment="bottom" doManageTrigger={true} bind:trigger>
	<LanguageSelector label={dict.ariaLabelLangSelect} />
	<hr class="w-full border-inverse" />
	<SlabAnchorExternal href="mailto:hello@doomscrll.com" variant="text" fit="max">
		{dict.labelContact}
		<Icon icon="ArrowForward" />
	</SlabAnchorExternal>
	<SlabAnchorExternal href="https://doomscrll.com/help" variant="text" fit="max">
		{dict.labelHelp}
		<Icon icon="ArrowExternal" />
	</SlabAnchorExternal>
	<SlabAnchorExternal href="https://doomscrll.com/legal.txt" variant="text" fit="max">
		{dict.labelLegal}
		<Icon icon="ArrowExternal" />
	</SlabAnchorExternal>
</Popover>

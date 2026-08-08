<script lang="ts">
	import closedByAny from "attcs/closed-by-any"

	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import SlabButton from "./buttons/slab-button.svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		src: string
		projectName: string
		onClose: () => void
	}

	const { src, projectName, onClose }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).project.previewModal)

	let ref = $state<HTMLDialogElement>()
	const id = `modal_${Math.random().toString(36).slice(2, 9)}`

	$effect(() => ref?.showModal())
</script>

<dialog
	{@attach closedByAny({ trigger: undefined })}
	{id}
	aria-modal="true"
	aria-labelledby="title_{id}"
	onclose={onClose}
	class={[
		"m-auto h-dvh w-dvw overflow-hidden pb-2 open:z-50 open:box-border",
		"rounded-2xl bg-obverse backdrop:bg-[black]/90",
		"flex-col items-center justify-between open:flex",
	]}
	bind:this={ref}>
	<span id="title_{id}" class="sr-only">{dict.title}</span>
	<img
		{src}
		alt="{projectName} {dict.altSuffix}"
		class="aspect-9/16 h-max w-auto max-w-dvw overflow-hidden object-contain" />
	<SlabButton alignment="left" fit="min" variant="outlined" onClick={onClose}>
		<Icon icon="ArrowBack" />
		{dict.labelClose}
	</SlabButton>
</dialog>

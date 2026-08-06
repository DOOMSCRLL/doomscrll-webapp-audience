<script lang="ts">
	import closedByAny from "attcs/closed-by-any"
	import type { Snippet } from "svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		header: string
		children: Snippet
		width?: "min" | "max"
		isOpen?: boolean
	}

	let { header, width = "min", isOpen = $bindable(false), children }: Props = $props()

	const id = `modal_${Math.random().toString(36).slice(2, 9)}`

	let ref = $state<HTMLDialogElement>()
	$effect(() => {
		if (!ref) return
		else if (isOpen && !ref.open) ref.showModal()
		else if (!isOpen && ref.open) ref.close()
	})

	function handleClose() {
		isOpen = false
	}
</script>

<dialog
	{@attach closedByAny({ trigger: undefined })}
	{id}
	aria-modal="true"
	aria-labelledby="title_{id}"
	onclose={handleClose}
	class={[
		width === "min" ? "w-[40vw]" : "w-full",
		"m-auto h-min max-h-full p-4 open:z-50",
		"rounded-3xl border-3 border-inverse bg-obverse backdrop:bg-[black]/90",
		"flex-col items-start gap-4 open:box-border open:flex",
	]}
	bind:this={ref}>
	<h2 id="title_{id}" class="inline-flex gap-2 font-serif text-4xl text-accent italic">
		<Icon icon="Starmark" />
		{header}
	</h2>
	{@render children?.()}
</dialog>

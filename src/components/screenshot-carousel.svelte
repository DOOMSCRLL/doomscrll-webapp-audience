<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import Icon from "./icons/icon.svelte"

	type Props = {
		srcs: string[]
		projectName: string
		onPreviewClick?: (index: number) => void
	}

	const { srcs, projectName, onPreviewClick }: Props = $props()
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).project.details.screenshots)

	function handlePreviewClick(index: number) {
		onPreviewClick?.(index)
	}
</script>

{#snippet preview(src: string, index: number)}
	<button
		aria-label={dict.labelPreviewAction}
		class="relative isolate h-fit w-fit shrink-0 rounded-2xl"
		onclick={() => handlePreviewClick(index)}>
		<img
			{src}
			alt="{projectName} {dict.altSuffix} #{index + 1}."
			loading={index === 0 ? "eager" : "lazy"}
			decoding="async"
			draggable="false"
			width="126"
			height="224"
			class="aspect-9/16 h-56 w-auto overflow-hidden object-cover" />
		<div aria-hidden={true} class="absolute top-1 right-1 z-10 rounded-full bg-[black]/40 p-1">
			<Icon icon="Doomeye" size="small" />
		</div>
	</button>
{/snippet}

<section class="flex pretty-scrollbar items-center justify-start gap-4 overflow-x-auto mask-fade-x px-6">
	{#each srcs as src, i (src)}
		{@render preview(src, i)}
	{/each}
</section>

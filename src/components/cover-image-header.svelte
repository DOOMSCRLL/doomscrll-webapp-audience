<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		src: string
		projectName: string
		authorHandle: string
	}

	const { src, projectName, authorHandle }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).project.header)
	const alt = $derived(`${projectName} ${dict.altCoverImgSuffix}`)
</script>

<header class="w-full">
	<img {src} {alt} class="aspect-square h-auto w-full img-mask-ticket mask-contain mask-no-repeat object-cover" />
</header>
<nav class="justify-items-between sticky top-0 grid w-full grid-cols-[1fr_auto_1fr] items-center bg-obverse px-2">
	<SlabAnchor href="/feed" variant="text" fit="square" ariaLabel={dict.ariaLabelBackAction}>
		<Icon icon="ArrowBack" />
	</SlabAnchor>
	<section class="flex h-min w-full flex-col items-center">
		<p class="w-full overflow-hidden text-center font-serif text-2xl font-medium text-wrap text-ellipsis text-inverse">
			{projectName}
		</p>
		<p class="font-mono text-sm font-bold tracking-wide text-inverse">@{authorHandle}</p>
	</section>
</nav>

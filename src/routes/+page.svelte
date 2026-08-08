<script lang="ts">
	import type { PageData } from "./$types"

	import { LOCALE_DEFAULT } from "const/locales"
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"
	import StylisticTimeFormat from "utils/stylistic-time-fmt"

	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import ContextMenu from "comps/context-menu.svelte"
	import DoomscrllLogo from "comps/icons/doomscrll-logo.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		data: PageData
	}

	const { data }: Props = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).landing)
	const fmt = $derived(
		DateFmtContext.context.value || new StylisticTimeFormat(LocaleContext.context.value || LOCALE_DEFAULT),
	)

	const today = DDate.today()
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main
	class="flex h-screen w-full flex-col justify-between overflow-hidden supports-[height:100dvh]:h-dvh md:items-center">
	<DoomscrllWordmark />
	<section class="flex w-full flex-col items-center gap-4">
		<p class="font-mono text-xl tracking-wider uppercase">{fmt.getFullDate(today)}</p>
		<p class="font-mono font-bold tracking-widest uppercase">{fmt.getLongDayName(today)}</p>
	</section>
	{#if data.projectCounts.length > 0}
		<p class="mx-6 font-serif text-2xl font-medium tracking-wide text-inverse">{dict.copy}</p>
		<ul class="flex w-full list-disc flex-col gap-2 pl-10 md:w-min">
			{#each data.projectCounts as item (item.category)}
				<li>
					<SlabAnchor href="/feed?category={item.category}" variant="text" fit="min" hasUnderline={true}>
						{item.category} ({item.count})
						<Icon icon="ArrowForward" size="small" />
					</SlabAnchor>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="mx-6 font-serif text-2xl font-medium tracking-wide text-inverse">{dict.noProjectCopy}</p>
	{/if}
	<section class="grid w-full grid-cols-[1fr_auto_1fr] items-center justify-items-start px-6">
		<ContextMenu />
		<DoomscrllLogo size="large" />
	</section>
</main>

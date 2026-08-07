<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import CoverImageHeader from "comps/cover-image-header.svelte"
	import FeatureChip from "comps/data-chips/feature-chip.svelte"
	import PlatformChip from "comps/data-chips/platform-chip.svelte"
	import TagChip from "comps/data-chips/tag-chip.svelte"
	import YoutubePlayer from "comps/youtube-player.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"

	const { data } = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).project)
	const project = $derived(data.project)
</script>

<svelte:head>
	<title>{project.name} {dict.meta.titleSuffix}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen w-full flex-col gap-6 overflow-y-auto supports-[height:100dvh]:h-dvh">
	<CoverImageHeader projectName={project.name} authorHandle={project.creator.username} src={project.coverImagePath!} />
	<!-- Description -->
	<p class="mx-6 font-serif text-2xl text-pretty text-inverse">{project.description}</p>
	<!-- Trailer -->
	{#if !project.videoUrl}
		<section class="flex w-full flex-col gap-6">
			<h2 class="ml-6 font-mono font-bold tracking-wide text-inverse uppercase underline">
				{dict.details.trailer.label}
			</h2>
			<YoutubePlayer
				url={project.videoUrl ?? "https://www.youtube.com/watch?v=VUwkKl7IL1w"}
				projectName={project.name} />
		</section>
	{/if}
	<!-- Category -->
	<section class="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)] px-6">
		<h2 class="font-mono font-bold tracking-wide text-inverse uppercase underline">{dict.details.labelCategory}</h2>
		<p class="font-serif font-medium italic">{getCategoryLabelFor(project.category, locale)}</p>
	</section>
	<!-- Tags -->
	<section class="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)] px-6">
		<h2 class="font-mono font-bold tracking-wide text-inverse uppercase underline">{dict.details.labelTags}</h2>
		<div class="flex flex-wrap gap-1">
			{#each project.tags as tag (tag)}
				<TagChip {tag} />
			{/each}
		</div>
	</section>
	<!-- Screenshots? -->
	<!-- Features -->
	{#if project.features}
		<section class="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)] px-6">
			<h2 class="font-mono font-bold tracking-wide text-inverse uppercase underline">{dict.details.labelFeats}</h2>
			<div class="flex flex-wrap gap-2">
				{#each project.features as feature (feature)}
					<FeatureChip {feature} />
				{/each}
			</div>
		</section>
	{/if}
	<!-- Platforms -->
	<section class="flex w-full flex-col gap-6 px-6">
		<h2 class="font-mono font-bold tracking-wide text-inverse uppercase underline">
			{dict.details.platforms.label}
		</h2>
		<PlatformChip href={project.primaryUrl} platform={project.primaryPlatform} />
		{#if project.secondaryPlatforms}
			{#each project.secondaryPlatforms as platform (platform.platform)}
				<PlatformChip href={platform.url} platform={platform.platform} />
			{/each}
		{/if}
	</section>

	<!-- FIXME: THESE FILLERS SHOULD BE REMOVED!!!!!!!!!-->
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
	<div class="h-20 w-full shrink-0 bg-[red]">REMOVE THIS</div>
</main>

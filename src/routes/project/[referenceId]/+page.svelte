<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import CoverImageHeader from "comps/cover-image-header.svelte"
	import FeatureChip from "comps/data-chips/feature-chip.svelte"
	import PlatformChip from "comps/data-chips/platform-chip.svelte"
	import TagChip from "comps/data-chips/tag-chip.svelte"
	import ScreenshotCarousel from "comps/screenshot-carousel.svelte"
	import ScreenshotPreviewModal from "comps/screenshot-preview-modal.svelte"
	import YoutubePlayer from "comps/youtube-player.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"

	const { data } = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).project)
	const project = $derived(data.project)

	// TODO: Remove all placeholders from the page!
	const testScreenshots = [
		"https://images.unsplash.com/photo-1604311795833-25e1d5c128c6",
		"https://images.unsplash.com/photo-1616578492900-ea5a8fc6c341",
		"https://images.unsplash.com/photo-1628105541664-ae6ee8d249ec",
		"https://images.unsplash.com/photo-1584294311015-1bda86d6824d",
		"https://images.unsplash.com/photo-1566490089793-103270a1b453",
		"https://images.unsplash.com/photo-1693929268246-4ff4c6a45a77",
		"https://images.unsplash.com/photo-1605505447721-1992c507c15e",
		"https://images.unsplash.com/photo-1626288215937-747af7be5b7b",
		"https://images.unsplash.com/photo-1563341932-d0f6b9fe7313",
		"https://images.unsplash.com/photo-1605743368663-3a895911ee42",
		"https://images.unsplash.com/photo-1714315994160-9b861705f898",
		"https://images.unsplash.com/photo-1603704602422-ced8c1aa1c9f",
		"https://images.unsplash.com/photo-1560761716-ec8eb63ea39c",
		"https://images.unsplash.com/photo-1663094304011-8bbb52e85bd1",
		"https://images.unsplash.com/photo-1635987580232-0d2ee1579849",
	]
	let expandedScreenshotUrl = $state<string>()
	function handleScreenshotExpand(index: number) {
		expandedScreenshotUrl = testScreenshots[index]
		//expandedPreviewUrl = project.screenshotPaths[index]
	}

	function handlePreviewClose() {
		expandedScreenshotUrl = undefined
	}
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
	<!-- Screenshots -->
	<section class="flex w-full flex-col gap-6">
		<h2 class="ml-6 font-mono font-bold tracking-wide text-inverse uppercase underline">
			{dict.details.screenshots.label}
		</h2>
		<ScreenshotCarousel
			srcs={/*project.screenshotPaths ?? */ testScreenshots}
			projectName={project.name}
			onPreviewClick={handleScreenshotExpand} />
	</section>
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
</main>

{#if expandedScreenshotUrl}
	<ScreenshotPreviewModal src={expandedScreenshotUrl} projectName={project.name} onClose={handlePreviewClose} />
{/if}

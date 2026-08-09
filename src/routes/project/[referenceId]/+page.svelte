<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"

	import CoverImageHeader from "comps/cover-image-header.svelte"
	import FeatureChip from "comps/data-chips/feature-chip.svelte"
	import PlatformChip from "comps/data-chips/platform-chip.svelte"
	import TagChip from "comps/data-chips/tag-chip.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import ScreenshotCarousel from "comps/screenshot-carousel.svelte"
	import ScreenshotPreviewModal from "comps/screenshot-preview-modal.svelte"
	import YoutubePlayer from "comps/youtube-player.svelte"

	const { data } = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).project)
	const project = $derived(data.project)

	let expandedScreenshotUrl = $state<string>()
	function handleScreenshotExpand(index: number) {
		if (!project.screenshotPaths || project.screenshotPaths.length <= 0) return
		expandedScreenshotUrl = project.screenshotPaths[index]
	}
	function handlePreviewClose() {
		expandedScreenshotUrl = undefined
	}
</script>

<svelte:head>
	<title>{project.name} {dict.meta.titleSuffix}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main
	class={[
		"flex h-screen w-full flex-col gap-6 overflow-y-auto pb-6 supports-[height:100dvh]:h-dvh",
		"md:grid md:grid-cols-[1fr_2fr] md:overflow-hidden md:p-0",
	]}>
	<div class="contents overflow-hidden md:flex md:h-full md:w-full md:flex-col md:justify-center md:gap-6">
		<section aria-hidden={true} class="hidden md:flex md:h-12 md:w-full md:items-center md:justify-center">
			<DoomscrllWordmark />
		</section>
		<CoverImageHeader
			projectName={project.name}
			authorHandle={project.creator.username}
			src={project.coverImagePath!} />
	</div>
	<div class="contents md:flex md:h-full md:w-full md:min-w-0 md:flex-col md:gap-6 md:overflow-y-auto md:py-6">
		<!-- Description -->
		<p class="mx-6 font-serif text-2xl text-pretty text-inverse">{project.description}</p>
		<!-- Trailer -->
		{#if project.videoUrl}
			<section class="flex w-full flex-col gap-6">
				<h2 class="ml-6 font-mono font-bold tracking-wide text-inverse uppercase underline">
					{dict.details.trailer.label}
				</h2>
				<YoutubePlayer url={project.videoUrl} projectName={project.name} />
			</section>
		{/if}
		<!-- Category -->
		<section class="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center px-6">
			<h2 class="font-mono font-bold tracking-wide text-inverse uppercase underline">{dict.details.labelCategory}</h2>
			<p class="font-serif text-xl font-medium italic">{getCategoryLabelFor(project.category, locale)}</p>
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
		{#if project.screenshotPaths}
			<section class="flex w-full flex-col gap-6">
				<h2 class="ml-6 font-mono font-bold tracking-wide text-inverse uppercase underline">
					{dict.details.screenshots.label}
				</h2>
				<ScreenshotCarousel
					srcs={project.screenshotPaths}
					projectName={project.name}
					onPreviewClick={handleScreenshotExpand} />
			</section>
		{/if}
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
	</div>
</main>

{#if expandedScreenshotUrl}
	<ScreenshotPreviewModal src={expandedScreenshotUrl} projectName={project.name} onClose={handlePreviewClose} />
{/if}

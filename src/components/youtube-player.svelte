<script lang="ts">
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { validateYoutubeURL } from "utils/youtube-video-utils"

	type Props = {
		url: string
		projectName: string
	}

	const { url, projectName }: Props = $props()
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).project.details.trailer)

	const validation = $derived(validateYoutubeURL(url))
	let isPlaying = $state(false)

	const videoId = $derived(validation.isValid ? validation.videoId : undefined)
	const embedUrl = $derived(videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1` : undefined)
	const thumbnailUrl = $derived(videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined)

	function handlePlay() {
		isPlaying = true
	}
</script>

{#if videoId}
	{#if isPlaying}
		<iframe
			src={embedUrl}
			title="{projectName} {dict.titleSuffix}"
			allow="autoplay; encrypted-media;"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
			class="aspect-video w-full rounded-2xl border-0">
		</iframe>
	{:else}
		<button
			type="button"
			aria-label={dict.ariaLabelVideo}
			onclick={handlePlay}
			class="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-obverse">
			<img
				src={thumbnailUrl}
				alt="{projectName} {dict.altThumbnailSuffix}"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
			<div
				class="absolute inset-0 z-10 flex items-center justify-center gap-4 bg-[black]/75 transition-colors group-hover:bg-[black]/40">
				<p class="font-mono text-2xl font-bold tracking-widest text-inverse uppercase">({dict.cta.leading}</p>
				<Icon icon="Play" size="normal" />
				<p class="font-mono text-2xl font-bold tracking-widest text-inverse uppercase">{dict.cta.trailing})</p>
			</div>
		</button>
	{/if}
{/if}

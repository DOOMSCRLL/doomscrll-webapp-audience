<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type { PlatformName } from "models/platform"
	import { getDictionaryOf } from "repos/locale-repo"
	import { getPlatformIconPathFor, getPlatformName } from "repos/platform-repo"

	type Props = {
		platform: PlatformName
	}

	const { platform }: Props = $props()

	let asset = $derived(getPlatformIconPathFor(platform))
	let primaryUrl = $derived(asset.isLocal ? asset.path : `${asset.path}.svg`)
	let fallbackUrl = $derived(asset.isLocal ? asset.path : `${asset.path}.webp`)

	const iconAlt = $derived(
		`${getPlatformName(platform)} ${getDictionaryOf(LocaleContext.context.value!).common.labelExternalIconSuffix}`,
	)

	function handleError(event: Event) {
		const img = event.currentTarget as HTMLImageElement
		if (!asset.isLocal && !img.src.endsWith(".webp")) img.src = fallbackUrl
	}
</script>

<div aria-labelledby="EXTERNAL_ICON_{platform}" class="overflow-hidden rounded-xl bg-[#0a0a0a] p-2">
	<img
		alt={iconAlt}
		id="EXTERNAL_ICON_{platform}"
		src={primaryUrl}
		onerror={handleError}
		class={["h-8 w-auto object-contain object-center"]} />
</div>

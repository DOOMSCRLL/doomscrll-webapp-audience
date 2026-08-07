<script lang="ts">
	import type { PlatformName } from "models/platform"

	import ExternalIcon from "comps/icons/external-icon.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { getPlatformName } from "repos/platform-repo"

	type Props = {
		platform: PlatformName
		href: string
	}

	const { platform, href }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.platform)

	const platformName = $derived(getPlatformName(platform))
	const ariaLabel = $derived.by(() => {
		const { prefix, suffixPlatform } = dict.ariaLabelVisit
		return `${prefix} ${platformName} ${suffixPlatform}`
	})
</script>

<a
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	{href}
	target="_blank"
	rel="noopener noreferrer"
	aria-label={ariaLabel}
	class={[
		"group h-12 w-full rounded-2xl px-2",
		"grid grid-cols-[auto_1fr_auto] items-center gap-4",
		"bg-obverse hover:bg-inverse active:bg-accent",
		"overflow-hidden font-serif text-2xl font-medium text-ellipsis whitespace-nowrap",
		"text-inverse hover:text-obverse active:text-obverse",
	]}>
	<ExternalIcon {platform} />
	@{platformName}
	<Icon icon="ArrowExternal" />
</a>

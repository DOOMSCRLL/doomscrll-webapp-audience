<script lang="ts">
  import { enhance } from "$app/forms"
  import { afterNavigate, invalidateAll } from "$app/navigation"
  import { page } from "$app/state"
  import type { PageData } from "./$types"

	import { LOCALE_DEFAULT } from "const/locales"
	import { DateFmtContext, LocaleContext, ProfileContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import { getCategories, getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"
	import StylisticTimeFormat from "utils/stylistic-time-fmt"

	import BrandNav from "comps/brand-nav.svelte"
	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import CalendarTable from "comps/calendar/calendar-table.svelte"
	import Countdown from "comps/countdown.svelte"
	import DoomlitsModal from "comps/doomlits-modal.svelte"
	import Dropdown from "comps/form/dropdown.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import Icon from "comps/icons/icon.svelte"
	import ReservationForm from "comps/reservation-form.svelte"
	import ReservationProgress from "comps/reservation-progress.svelte"
	import UrgentModal from "comps/urgent-modal.svelte"

	type Props = {
		data: PageData
	}

	const { data }: Props = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale))
	const fmt = $derived(
		DateFmtContext.context.value || new StylisticTimeFormat(LocaleContext.context.value || LOCALE_DEFAULT),
	)

	let selectedCategory = $state<Category>("Video Games")

	afterNavigate(({ type }) => {
		if (type === "popstate") invalidateAll()
	})
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>


<main class="grid h-screen w-full grid-rows-[auto_1fr] gap-4 overflow-hidden px-6 supports-[height:100dvh]:h-dvh">
	<BrandNav activeDraftRefId={data.activeDraftId} hasDoomlitsMenu={true} bind:helpModalTrigger bind:doomlitMenuTrigger />
	<section class="grid h-full w-full grid-cols-2 gap-12">

	</section>
</main>

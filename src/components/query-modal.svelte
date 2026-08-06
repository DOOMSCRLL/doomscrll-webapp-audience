<script lang="ts">
	import { untrack } from "svelte"

	import { LocaleContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import type ProjectCategoryCounts from "models/internal/project-category-counts"
	import { getCategoryLabelFor, isCategory } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import type { FeedQuery } from "repos/project-repo"

	import SlabButton from "./buttons/slab-button.svelte"
	import DDropdown from "./d-dropdown/d-dropdown.svelte"
	import Icon from "./icons/icon.svelte"
	import Modal from "./modal.svelte"

	type Props = {
		currentCategory: Category
		availableCategories: ProjectCategoryCounts[]
		isOpen?: boolean
		onQuerySubmit?: (query: FeedQuery) => void
	}

	let { currentCategory, availableCategories, isOpen = $bindable(false), onQuerySubmit }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).feed.modalQuery)

	let selectedCategory = $state<Category>(untrack(() => currentCategory))
	let hasQueryChanged = $derived(selectedCategory !== currentCategory)
	function handleCategorySelect(category: string) {
		if (isCategory(category) && category !== selectedCategory) selectedCategory = category
	}

	function handleQuerySubmit() {
		onQuerySubmit?.({
			category: hasQueryChanged ? selectedCategory : undefined,
		})
	}
	function handleClose() {
		isOpen = false
	}
</script>

<Modal header={dict.title} width="max" bind:isOpen>
	<DDropdown
		name="category-selector"
		label={dict.categorySelect.label}
		placeholder={dict.categorySelect.placeholder}
		emptyQueryLabel={dict.categorySelect.labelEmptyQuery}
		layout="column"
		options={[
			{
				opts: availableCategories.map((c) => ({
					value: c.category,
					label: `${getCategoryLabelFor(c.category)} (${c.count})`,
				})),
			},
		]}
		selectedValue={selectedCategory}
		onChange={handleCategorySelect} />
	<p class="font-serif text-2xl font-medium text-inverse">{dict.query.copy}</p>
	<hr class="w-full border border-inverse" />
	<SlabButton variant="filled" isDisabled={!hasQueryChanged} onClick={handleQuerySubmit}>
		<Icon icon="Settings" />
		{dict.actions.labelApply}
	</SlabButton>
	<SlabButton variant="text" onClick={handleClose}>
		<Icon icon="ArrowBack" />
		{dict.actions.labelCancel}
	</SlabButton>
</Modal>

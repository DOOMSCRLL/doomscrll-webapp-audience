<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type ProjectTag from "models/project-tag"
	import { getDictionaryOf } from "repos/locale-repo"

	import DOption from "comps/d-dropdown/d-option.svelte"
	import Popover from "comps/popover.svelte"
	import TagChip from "./data-chips/tag-chip.svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		availableTags: ProjectTag[]
		selectedTag?: ProjectTag
	}

	let { availableTags, selectedTag = $bindable() }: Props = $props()

	const listboxId = `listbox-${Math.random().toString(36).slice(2, 9)}`
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).feed.modalQuery)

	// #region Search management
	let searchQuery = $state<string>("")
	let filteredOptions = $derived.by<ProjectTag[] | undefined>(() => {
		const query = searchQuery.toLocaleLowerCase().trim()
		if (!query) return undefined
		return availableTags.filter((t) => t.toLocaleLowerCase().includes(query))
	})
	// #endregion

	// #region Focus management
	let inputRef = $state<HTMLInputElement>()

	let isOpen = $state(false)
	let highlightedValue = $state<string>()

	$effect(() => {
		if (isOpen && inputRef) inputRef.focus()
	})

	function handleHover(event: PointerEvent, value: string): void {
		if (event.movementX === 0 && event.movementY === 0) return
		else if (highlightedValue !== value) highlightedValue = value
	}

	function scrollToActive(): void {
		requestAnimationFrame(() =>
			document.getElementById(`opt-${highlightedValue}`)?.scrollIntoView({ block: "nearest" }),
		)
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.key === "Tab") {
			isOpen = false
			return
		} else if (event.key === "Escape") {
			event.preventDefault()
			isOpen = false
			inputRef?.focus()
			return
		}

		const validOpts = filteredOptions ?? availableTags
		if (validOpts.length === 0) return

		const currentIndex = highlightedValue ? validOpts.findIndex((t) => t === highlightedValue) : -1
		if (!isOpen && (event.key === "ArrowDown" || event.key === "Enter")) {
			event.preventDefault()
			isOpen = true
			highlightedValue = validOpts[0]
			return
		}

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault()
				highlightedValue = validOpts[Math.min(currentIndex + 1, validOpts.length - 1)]
				scrollToActive()
				break
			case "ArrowUp":
				event.preventDefault()
				highlightedValue = validOpts[Math.max(currentIndex - 1, 0)]
				scrollToActive()
				break
			case "Enter":
				event.preventDefault()
				if (highlightedValue) handleSelect(highlightedValue)
				break
		}
	}
	// #endregion

	function handleSelect(value: string): void {
		selectedTag = value as ProjectTag
		searchQuery = ""
		isOpen = false
	}

	function handleTagRemove() {
		selectedTag = undefined
		isOpen = true
		requestAnimationFrame(() => inputRef?.focus())
	}
</script>

<section class="flex h-min w-full flex-col items-center gap-4">
	{#if !selectedTag}
		<section class="flex w-full gap-2 [&>span]:text-inverse">
			<Icon icon="Search" />
			<input
				type="text"
				role="combobox"
				aria-activedescendant={highlightedValue ? `opt-${highlightedValue}` : undefined}
				aria-autocomplete="list"
				aria-controls={listboxId}
				aria-expanded={isOpen}
				placeholder={dict.query.placeholder}
				onfocus={() => (isOpen = true)}
				oninput={() => (isOpen = true)}
				onkeydown={handleKeyDown}
				class={[
					"h-12 w-full rounded-2xl border-3 border-inverse bg-obverse",
					"cursor-text text-center font-serif text-2xl font-medium tracking-tighter text-inverse outline-none",
					"placeholder:text-[darkgray] placeholder:italic",
				]}
				bind:this={inputRef}
				bind:value={searchQuery} />
		</section>

		{#if isOpen}
			<Popover
				trigger={inputRef}
				arrowPosition="top"
				horizontalAlignment="center"
				verticalAlignment="bottom"
				doManageTrigger={false}
				onClose={() => (isOpen = false)}>
				<ul
					id={listboxId}
					role="listbox"
					class="flex max-h-80 min-h-0 w-full pretty-scrollbar flex-col gap-2 overflow-x-hidden overflow-y-auto px-2">
					{#if filteredOptions !== undefined}
						{#each filteredOptions as tag (tag)}
							<DOption
								value={tag}
								label={tag}
								isSelected={selectedTag === tag}
								isHighlighted={highlightedValue === tag}
								onHover={(e) => handleHover(e, tag)}
								onSelect={() => handleSelect(tag)} />
						{:else}
							<li role="presentation">
								<p class="text-center font-serif text-2xl text-inverse italic">{dict.query.labelEmptyQuery}</p>
							</li>
						{/each}
					{:else}
						{#each availableTags as tag (tag)}
							<DOption
								value={tag}
								label={tag}
								isSelected={selectedTag === tag}
								isHighlighted={highlightedValue === tag}
								onHover={(e) => handleHover(e, tag)}
								onSelect={() => handleSelect(tag)} />
						{/each}
					{/if}
				</ul>
			</Popover>
		{/if}
	{:else}
		<TagChip tag={selectedTag} isRemoveable={true} onRemove={handleTagRemove} />
	{/if}
</section>

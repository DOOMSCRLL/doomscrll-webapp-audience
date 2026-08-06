import { redirect } from "@sveltejs/kit"

import type { PageServerLoad } from "./$types"

import { getProjectFeed } from "repos/project-repo"
import { DEFAULT_NUMBER_PAGE, DEFAULT_SIZE_BATCH_FEED, getFeedURLFor } from "utils/project-feed-utils"

export const load: PageServerLoad = async ({ fetch, url, parent }) => {
	const parentData = await parent()
	if (parentData.projectCounts.length === 0) {
		redirect(307, "/")
	}

	const categoryParam = url.searchParams.get("category")
	const validCategoryItem = parentData.projectCounts.find((item) => item.category === categoryParam)
	const selectedItem = validCategoryItem ?? parentData.projectCounts[0]
	const category = selectedItem.category
	const totalProjectCount = Number(selectedItem.count)

	const tag = url.searchParams.get("tag") ?? undefined
	const platform = url.searchParams.get("platform") ?? undefined
	const pageParam = url.searchParams.get("page")
	const batchSizeParam = url.searchParams.get("batchSize")

	const page = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : DEFAULT_NUMBER_PAGE
	const batchSize = batchSizeParam && !isNaN(Number(batchSizeParam)) ? Number(batchSizeParam) : DEFAULT_SIZE_BATCH_FEED

	const targetUrl = getFeedURLFor(category, { tag, platform, page, batchSize })
	if (
		url.searchParams.get("category") !== category ||
		url.searchParams.get("page") !== String(page) ||
		url.searchParams.get("batchSize") !== String(batchSize)
	) {
		redirect(307, targetUrl)
	}

	const { previews, queryCount } = await getProjectFeed(
		{
			category,
			tag,
			platform,
			page,
			batchSize,
		},
		fetch,
	)

	return {
		previews,
		queryCount,
		selectedCategory: category,
		totalProjectCount,
		page,
		batchSize,
		tag,
		platform,
	}
}

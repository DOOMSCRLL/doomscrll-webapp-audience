import type Category from "models/category"
import type { FeedQuery } from "repos/project-repo"

export const DEFAULT_SIZE_BATCH_FEED = 10
export const DEFAULT_NUMBER_PAGE = 1

export function getFeedURLFor(category: Category, query?: FeedQuery): string {
	const params = new URLSearchParams()
	params.set("category", category)
	if (query?.tag) params.set("tag", query.tag)
	if (query?.platform) params.set("platform", query.platform)
	params.set("page", String(query?.page ?? DEFAULT_NUMBER_PAGE))
	params.set("batchSize", String(query?.batchSize ?? DEFAULT_SIZE_BATCH_FEED))

	return `/feed?${params.toString()}`
}

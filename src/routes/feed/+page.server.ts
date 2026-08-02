import type { PageServerLoad } from "./$types"
import { getProjectFeed } from "repos/project-repo"

export const load: PageServerLoad = async ({ fetch, url }) => {
	const category = url.searchParams.get("category") ?? undefined
	const tag = url.searchParams.get("tag") ?? undefined
	const platform = url.searchParams.get("platform") ?? undefined
	const pageParam = url.searchParams.get("page")
	const batchSizeParam = url.searchParams.get("batchSize")

	const page = pageParam ? Number(pageParam) : 1
	const batchSize = batchSizeParam ? Number(batchSizeParam) : 16

	const previews = await getProjectFeed(
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
		selectedCategory: category,
	}
}

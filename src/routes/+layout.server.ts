import type { LayoutServerLoad } from "./$types"

import type ProjectCategoryCounts from "models/internal/project-category-counts"
import { getProjectCountsFor } from "repos/project-repo"
import DDate from "utils/d-date"

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	let projectCounts: ProjectCategoryCounts[]
	try {
		projectCounts = await getProjectCountsFor(DDate.today(), fetch)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		projectCounts = []
	}

	return {
		locale: locals.locale,
		projectCounts,
	}
}

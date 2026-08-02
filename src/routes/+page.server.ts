import type { PageServerLoad } from "./$types"
import { getProjectCountsFor } from "repos/project-repo"
import DDate from "utils/d-date"

export const load: PageServerLoad = async ({ fetch }) => {
	const today = DDate.today()
	const projectCounts = await getProjectCountsFor(today, fetch)

	return {
		projectCounts,
	}
}

import { getProjectCountsFor } from "repos/project-repo"
import DDate from "utils/d-date"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ fetch }) => {
	const today = DDate.today()
	try {
		const projectCounts = await getProjectCountsFor(today, fetch)
		return {
			projectCounts,
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return { projectCounts: [] }
	}
}

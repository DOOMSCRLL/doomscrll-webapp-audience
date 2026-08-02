import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getProjectByReference } from "repos/project-repo"

export const load: PageServerLoad = async ({ fetch, params }) => {
	const { referenceId } = params
	const project = await getProjectByReference(referenceId, fetch)

	if (!project) {
		throw error(404, { message: "Project not found or expired" })
	}

	return {
		project,
	}
}

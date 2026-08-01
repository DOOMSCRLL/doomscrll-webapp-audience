import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	return {
		locale: locals.locale,
	}
}
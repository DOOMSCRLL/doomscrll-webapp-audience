import { PUBLIC_CDN_PROJECT_BASE_URL } from "$env/static/public"

import { TAG_NO_TAG } from "const/tags"
import type { ProjectPreview } from "models/project"
import type ProjectTag from "models/project-tag"

type TagPreviewMap = Record<ProjectTag, ProjectPreview[]>

export function resolveCDNImagePath(path: string | null | undefined): string | null {
	if (!path) return null
	if (path.startsWith("http://") || path.startsWith("https://")) return path
	const cleanBase = PUBLIC_CDN_PROJECT_BASE_URL.endsWith("/")
		? PUBLIC_CDN_PROJECT_BASE_URL
		: `${PUBLIC_CDN_PROJECT_BASE_URL}/`
	const cleanPath = path.startsWith("/") ? path.slice(1) : path
	return `${cleanBase}${cleanPath}`
}

// *Doesn't filter by category!*
export function groupPreviewsByTag(previews: ProjectPreview[]): TagPreviewMap {
	return previews.reduce((acc, curr) => {
		const firstTag = curr.tags[0] ?? TAG_NO_TAG
		;(acc[firstTag] ??= []).push(curr)
		return acc
	}, {} as TagPreviewMap)
}

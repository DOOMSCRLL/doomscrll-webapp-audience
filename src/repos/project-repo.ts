import { API_BASE_URL } from "$env/static/private"
import { error } from "@sveltejs/kit"
import type { APIResponse } from "models/internal/api"
import type ProjectCategoryCounts from "models/internal/project-category-counts"
import type Project from "models/project"
import type { ProjectPreview } from "models/project"
import type Category from "models/category"
import type ProjectTag from "models/project-tag"
import type DDate from "utils/d-date"

export type FeedQuery = {
	category?: string
	tag?: string
	platform?: string
	page?: number
	batchSize?: number
}

export async function getProjectCountsFor(
	date: DDate,
	customFetch: typeof fetch = fetch,
): Promise<ProjectCategoryCounts[]> {
	const response = await customFetch(`${API_BASE_URL}/projects/projects-per-category?date=${date.toISOString()}`)
	if (!response.ok) {
		throw error(response.status, { message: "Failed to fetch project category counts" })
	}

	const result = (await response.json()) as APIResponse<{ category: Category; count: number }[]>
	if (!result.success) {
		throw error(400, { message: result.error.message })
	}

	return result.data
		.filter((item) => !item.category.startsWith("Internal_") && item.count > 0)
		.map((item) => ({
			category: item.category,
			count: String(item.count),
		}))
}

export async function getProjectFeed(query?: FeedQuery, customFetch: typeof fetch = fetch): Promise<ProjectPreview[]> {
	const params = new URLSearchParams()
	if (query?.category) params.set("category", query.category)
	if (query?.tag) params.set("tag", query.tag)
	if (query?.platform) params.set("platform", query.platform)
	if (query?.page !== undefined) params.set("page", String(query.page))
	if (query?.batchSize !== undefined) params.set("batchSize", String(query.batchSize))

	const response = await customFetch(`${API_BASE_URL}/projects?${params.toString()}`)
	if (!response.ok) {
		throw error(response.status, { message: "Failed to fetch project feed" })
	}

	type FeedResponseItem = {
		referenceId: string
		name: string
		category: Category
		tags: ProjectTag[] | null
		coverImagePath: string | null
		creator: { username: string }
	}

	const result = (await response.json()) as APIResponse<FeedResponseItem[]>
	if (!result.success) {
		throw error(400, { message: result.error.message })
	}

	return result.data.map((item) => ({
		referenceId: item.referenceId,
		name: item.name,
		authorUsername: item.creator.username,
		category: item.category,
		tags: item.tags ?? [],
		coverImagePath: item.coverImagePath,
	}))
}

export async function getProjectByReference(
	referenceId: string,
	customFetch: typeof fetch = fetch,
): Promise<Project | null> {
	const response = await customFetch(`${API_BASE_URL}/projects/${referenceId}`)
	if (response.status === 404) return null
	if (!response.ok) {
		throw error(response.status, { message: "Failed to fetch project details" })
	}

	const result = (await response.json()) as APIResponse<Project>
	if (!result.success) {
		if (result.error.code === "NOT_FOUND" || result.error.code === "PROJECT_NOT_FOUND") return null
		throw error(400, { message: result.error.message })
	}

	return result.data
}

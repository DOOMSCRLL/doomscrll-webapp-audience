import type Category from "./category"
import type { PlatformName, PlatformRecord } from "./platform"
import type ProjectTag from "./project-tag"

export type ProjectStatus = "draft" | "incomplete" | "ready" | "canceled"

type Project = {
	referenceId: string
	showcaseDate?: string
	status?: ProjectStatus
	reservedAt?: string | null
	name: string
	category: Category
	primaryPlatform: PlatformName
	primaryUrl: string
	description: string | null
	tags: ProjectTag[] | null
	features: string[] | null
	coverImagePath: string | null
	screenshotPaths: string[] | null
	secondaryPlatforms: PlatformRecord[] | null
	videoUrl: string | null
	creator: {
		username: string
		description: string | null
		url: string | null
	}
	createdAt?: string
}

export type ProjectPreview = {
	referenceId: string
	name: string
	authorUsername: string
	category: Category
	tags: ProjectTag[]
	coverImagePath: string | null
}

export type { Project as default }

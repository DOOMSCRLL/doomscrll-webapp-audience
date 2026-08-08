import type { PLATFORMS } from "const/platforms"

export type PlatformName = keyof typeof PLATFORMS

type Platform = {
	name: string
}

export type PlatformRecord = {
	platform: PlatformName
	url: string
}

export type { Platform as default }

import { API_BASE_URL } from "$env/static/private"
import { error } from "@sveltejs/kit"
import type Profile from "models/profile"

export type ProfileResponse = {
	success?: boolean
	profile?: Profile
	message?: string
	error?: string
}

export async function getPublicProfile(username: string, customFetch: typeof fetch = fetch): Promise<Profile | null> {
	const response = await customFetch(`${API_BASE_URL}/profile/${username}`)
	if (response.status === 404) return null

	const result = (await response.json()) as ProfileResponse
	if (!response.ok) throw error(response.status, { message: result.error || "Failed to fetch public profile" })
	return result.profile || null
}


function hashCode(str: string): number {
	let hash = 0
	for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
	return Math.abs(hash)
}

type ColorOptions = {
	minSaturation?: number
	maxSaturation?: number
	minLightness?: number
	maxLightness?: number
}

type HSL = {
	h: number
	s: number
	l: number
}

export function generateColorFrom(str: string, options: ColorOptions = {}): HSL {
	const hash = hashCode(str)
	const satHash = hashCode(str + "-sat")
	const litHash = hashCode(str + "-lit")

	const h = Math.floor((hash * 137.508) % 360)

	const minS = options.minSaturation ?? 35
	const maxS = options.maxSaturation ?? 78
	const s = minS + (satHash % (maxS - minS + 1))

	const minL = options.minLightness ?? 58
	const maxL = options.maxLightness ?? 82
	let l = minL + (litHash % (maxL - minL + 1))

	const rad = (h * Math.PI) / 180
	const luminanceFactor = Math.sin(rad - Math.PI / 3)
	l -= Math.round(luminanceFactor * 4)

	return { h, s, l: Math.min(84, Math.max(54, l)) }
}

export function hslStrToCss(hsl: HSL): string {
	const l = Math.min(100, Math.max(0, hsl.l))
	return `hsl(${hsl.h} ${hsl.s}% ${l}%)`
}

import type ProjectCategoryCounts from "models/internal/project-category-counts"
import type DDate from "utils/d-date"

export function getProjectCountsFor(date: DDate): ProjectCategoryCounts[] {
	console.error("getProjectsCategoryCounts function is not implemented!")
	void date
	return [
		{ category: "Video Games", count: "14" },
		{ category: "Audio", count: "7" },
		{ category: "Publishing", count: "9" },
		{ category: "Software & Tools", count: "5" },
		{ category: "Goods", count: "5" },
	]
}

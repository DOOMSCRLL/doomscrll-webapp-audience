function createAlternator<Type>(...elements: Type[]) {
	const elementCount = elements.length
	let index = -1

	return () => {
		index = (index + 1) % elementCount
		return elements[index]
	}
}

const IMG_MASK_UTILS = [
	"img-mask-biscuit",
	"img-mask-bread",
	"img-mask-flower-1",
	"img-mask-flower-2",
	"img-mask-hourglass-1",
	"img-mask-hourglass-2",
	"img-mask-stair",
	"img-mask-stamp",
	"img-mask-windmill",
]

const getNextImgMask = createAlternator(...IMG_MASK_UTILS)
export default getNextImgMask

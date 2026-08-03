<script lang="ts">
	import getNextImgMask from "utils/img-mask-alternator"

	type Props = {
		src: string
		alt: string
	}

	const { src, alt }: Props = $props()

	const maskClass = getNextImgMask()
</script>

<img {src} {alt} class="aspect-square w-full {maskClass} mask-contain mask-no-repeat object-cover" />

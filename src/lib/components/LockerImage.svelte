<script lang="ts">
	import IconCrop from '~icons/carbon/crop';

	export let src: string;
	const originalSrc = src;

	let isHovered = false;
</script>

<div
	class="m-2 relative"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	<img {src} alt="" />
	{#if isHovered}
		<div class="absolute top-0 p-1" id="crop-button">
			<div class="bg-black/70 rounded-full p-2 text-white border border-white/10">
				<IconCrop />
			</div>
		</div>
	{/if}
</div>

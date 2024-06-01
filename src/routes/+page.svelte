<script lang="ts">
	import LockerImage from '$lib/components/LockerImage.svelte';

	let fileInput: HTMLInputElement;

	let images: string[] = [];

	const handleFiles = () => {
		if (!fileInput.files) return;
		const imageFiles = Array.from(fileInput.files);
		images = imageFiles.map((file) => URL.createObjectURL(file));

		console.log(images);
	};
</script>

{#if images.length == 0}
	<div class="p-4 min-h-screen flex items-center justify-center flex-col gap-8">
		<h1 class="font-bold text-8xl text-orange-400">Locker Formatter</h1>
		<input type="file" accept="image/*" multiple bind:this={fileInput} on:change={handleFiles} />
	</div>
{/if}

<div class="columns-4 gap-0">
	{#each images as image}
		<LockerImage src={image} />
	{/each}
</div>

<template>
	<div class="tagbar">
		<div class="tag" @click="$emit('tagclick', null)">
			+
		</div>
		<div v-for="tag in items" :key="tag.id"
			class="tag"
			@click="$emit('tagclick', tag.id)"
		>
			{{  tag.label || tag.id  }}
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	items: { type: Array, required: true }
});

const emits = defineEmits(['tagclick']);

</script>

<style scoped lang="scss">
.tagbar {

	.tag {
		padding: var(--padding);
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}

}
</style>
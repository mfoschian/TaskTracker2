<template>
	<div class="date-bar">
		<button @click="$emit('prev')">prev</button>
		<div class="body">
			{{  formatDMY(date, ' / ') }}
		</div>
		<button @click="$emit('next')">next</button>
	</div>
</template>

<script setup>
import {formatDMY} from '../libs/formatters.js';

const props = defineProps({
	date: { type: Object, default: () => new Date() }
})

const emit = defineEmits(['next', 'prev'])
</script>

<style scoped lang="scss">
.date-bar {
	width: 100%;
	padding: var(--padding);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;

	.body {
		flex-grow: 1;
		text-align: center;
	}
}
</style>
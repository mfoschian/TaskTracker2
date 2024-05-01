<template>
	<div class="task" :class="{active: item.stop==null}">
		<span class="tm">{{ formatHHmm(item.start) }}</span>
		<span class="task-what">{{ item.what }}</span>
		<span class="task-who">{{ item.who }}</span>
		<span class="task-tag">{{ item.tag || '-'}}</span>
	</div>	
</template>

<script setup>
import { formatHHmm } from "../libs/formatters.js";


const props = defineProps({
	item: { type: Object, required: true }
});
</script>

<style scoped lang="scss">
.task {

	padding: var(--padding);

	display: flex;
	flex-direction: row;
	gap: var(--padding);
	justify-content: space-between;



	.task-what, .task-who , .task-tag {
		flex-grow: .3;
		text-align: left;
	}
	.task-who {
		text-align: center;
	}
	.task-tag {
		text-align: right;
	}

	&.active {
		background-color: crimson;
		color: white;
	}
}
</style>
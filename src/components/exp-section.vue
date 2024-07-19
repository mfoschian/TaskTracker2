<template>
	<div class="section-title">
		<div class="expicon" :class="{expanded: is_expanded }" @click="toggle()"><ChevronRight /></div>
		<div class="label">{{ title }}</div>
	</div>
	<div class="section-body" :class="{expanded: is_expanded }">
		<slot></slot>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import ChevronRight from "./icons/chevron-right.vue";

const props = defineProps({
	title: { type: String, default: '-'},
	expanded: { type: Boolean, default: false }
});

let is_expanded = ref(props.expanded);

const toggle = () => is_expanded.value = !is_expanded.value;

</script>

<style scoped lang="scss">
.section-title {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: start;

	background-color: var(--sec-bk-color);

	.expicon {
		--size: 1.5rem;
		cursor: pointer;
		width: var(--size);
		height: var(--size);
		display: grid;
		place-items: center;
		transition: rotate 100ms;
	
		&.expanded {
			rotate: 90deg;
		}
	}

}

.section-body {
	--padding: 1.5rem;
	display: none;

	&.expanded {
		display: inherit;
		width: calc(100% - 2* var(--padding));
		padding-left: var(--padding);
		padding-right: var(--padding);
		overflow: auto;
	}
}
</style>
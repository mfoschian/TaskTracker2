<template>
	<TaskTable :items="tasks" :fields="fields" :striped="true">
		<template #cell[expand]="{data}">
			<div class="details-toggler"
				:class="{toggled: data.details}"
				@click="data.toggleDetails()">
				<!-- &gt; -->
				<ChevronRight />
			</div>
		</template>

		<template #details="{data}">
			<div class="task-details">
				<label>Dalle</label><div class="tm">{{ formatHHmm(data.item.start) }}</div>
				<label>Alle</label><div class="tm">{{ formatHHmm(data.item.stop) }}</div>
				<div class="buttons">
					<button title="Elimina task" @click="deleteTask(data.item)">X</button>
				</div>
			</div>
		</template>

		<template #cell[what]="{data}">
			<template v-if="data.value == null">
				<button @click="$emit('requestWhat', data.item)">?</button>
			</template>
			<template v-else><span class="what-text" @dblclick="$emit('requestWhat', data.item)">{{ data.item.what }}</span></template>
		</template>

		<template #cell[who]="{data}">
			<template v-if="data.value == null">
				<button @click="$emit('requestWho', data.item)">...</button>
			</template>
			<template v-else><span class="what-text" @dblclick="$emit('requestWho', data.item)">{{ data.item.who }}</span></template>
		</template>
	</TaskTable>
</template>

<script setup>
import { formatHHmm } from "../libs/formatters.js";
import ChevronRight from "./icons/chevron-right.vue";
import TaskTable from './table.vue';


const props = defineProps({
	tasks: { type: Array, deafult: [] }
});

const emit = defineEmits(['delete','requestWhat','requestWho']);

const fields = [
	{ key: 'expand' },
	{ key: 'what', label: 'Cosa' },
	{ key: 'who', label: 'Per Chi' },
	{ key: 'tag', label: 'Tag' },
	{ key: 'action', label: '' },
];

async function deleteTask(task) {
	emit('delete', task);
}
</script>

<style scoped lang="scss">
.details-toggler {
	--size: 1.5rem;
	cursor: pointer;
	width: var(--size);
	height: var(--size);
	display: grid;
	place-items: center;
	transition: rotate 100ms;

	&.toggled {
		rotate: 90deg;
	}
}

.task-details {
	margin-left: 2rem;
	filter: saturate(40%);
	// border: 1px solid red;

	display: grid;
	grid-auto-columns: 1fr;
	grid-template-columns: min-content 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-template-areas:
		". . buttons"
		". . buttons";
	gap: 1rem;

	.buttons {
		grid-area: buttons;
		// margin-inline: auto;
		display: grid;
		place-items: center;
	}
}
</style>
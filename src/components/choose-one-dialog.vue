<template>
	<modalDialog :title="title" ref="dlg" @closed="abort">
		<div class="options">
			<div class="option" v-for="(item,ix) in items" :key="ix"
				:class="{selected: ix == selected_index}"
				@click="selected_index = ix"
				@dblclick="handler.onConfirm(item)"
			>
				<slot name="item" :data="{item}">{{ item }}</slot>
			</div>
		</div>
		<div class="buttons">
			<button class="ok btn btn-success" @click="close">OK</button>
			<button class="abort btn btn-danger" @click="abort">Annulla</button>
		</div>
	</modalDialog>
</template>

<script setup>
import modalDialog from './modal-dialog.vue';
import {ModalDialogHandler} from './modal-promise.js'

import { ref } from 'vue';

const props = defineProps({
	items: { type: Array, required: true },
	title: { type: String, default: 'Scegli una voce'},
	value: { type: Number, default: -1 },
});

let dlg = ref(null);
let selected_index = ref(props.value);

let handler = new ModalDialogHandler(dlg);
let _abortValue = null;

function abort() {
	handler.onAbort(_abortValue);
}

function close() {
	let item = props.items[selected_index.value];
	handler.onConfirm(item);
}

async function choose(abortValue) {
	_abortValue = abortValue;
	let res = await handler.waitMe();
	return res;
}

defineExpose({
	choose
});
</script>

<style scoped lang="scss">
.options {
	width: 100%;

	.option {
		text-align: center;
		padding: var(--padding);

		&.selected {
			background-color: blue;
			color: white;
		}
	}
}

.buttons {
	width: 100%;
	margin-top: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	// button {
	// 	padding: .5rem;
	// 	border-radius: var(--padding);

	// 	&.ok {
	// 		background-color: rgb(31, 230, 31);
	// 		color: white;
	// 	}
	// 	&.abort {
	// 		background-color: rgb(243, 26, 55);
	// 		color: white;
	// 	}
	// }
}
</style>
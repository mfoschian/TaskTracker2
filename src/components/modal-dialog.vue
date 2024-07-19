<template>
	<dialog ref="dlg">
		<div class="dlg-container">
			<div class="dlg-title">
				<div class="ul-icon">
					<slot name="icon"></slot>
				</div>
				<label><slot name="title">{{ title }}</slot></label>
				<button class="closebtn" @click="closeMe">X</button>
			</div>
			<div class="dlg-body">
				<slot></slot>
			</div>
		</div>
	</dialog>
</template>



<script setup>
import { ref } from 'vue';
import Ics from './icons/ics.vue';

const props = defineProps({
	title: { type: String, default: '' },
});

const emit = defineEmits(['closed']);

let dlg = ref(null);

function openMe() {
	if(dlg.value)
		dlg.value.showModal();
}

function closeMe() {
	if(dlg.value)
		dlg.value.close();
	emit('closed');
}

defineExpose({
	open: openMe,
	close: closeMe
});

</script>


<style lang="scss" scoped >
dialog {
	--hover-color: red;
	--border-color: var(--bs-secondary);
	--border-size: 0px;
	--btn-size: 1.5rem;

	height: 90%;
	width: 90%;
	padding: 0;
	border-radius: .5rem;
	border: var(--border-size) solid var(--border-color);

	.dlg-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		overflow: hidden;

		.dlg-title {
			padding: .3rem;
			font-size: 1.3rem;
			font-weight: bold;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			label {
				flex-grow: 1;
				text-align: center;
			}

			.closebtn {
				width: var(--btn-size);
				height: var(--btn-size);
				display: grid;
				place-items: center;
			}

			.closebtn:hover {
				color: var(--hover-color);
				svg {
					fill: var(--hover-color);
				}
			}
		}

		.dlg-body {
			flex-grow: 1;

			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;

			overflow-y: auto;
		}
	}
}


</style>
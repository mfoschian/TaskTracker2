<template>
	<modalDialog title="Carica il file" ref="dlg">
		<input type="file" @change="fileSelected()" ref="fileInput">
	</modalDialog>
</template>

<script setup>
import modalDialog from './modal-dialog.vue';

import { ref } from 'vue';

const emit = defineEmits(['loaded', 'failed']);

let fileInput = ref(null);
let dlg = ref(null);

const fileSelected = () => {
	let file = fileInput.value.files[0];

	try {
		let reader = new FileReader();
		reader.onload = function (e) {
			try {
				console.log('Readed file %s', file.name);

				let json = JSON.parse(reader.result);
				emit('loaded', json);
			}
			catch (err) {
				console.error(err);
				emit('failed','Parsing file fallito');
			}
		}

		form.value = {};
		dirty.value = false;
		reader.readAsText(file);
	}
	catch (err) {
		console.error(err);
		emit('failed', err);
	}
};

defineExpose({
	open:  () => dlg.value.open()
})
</script>
<template>
	<div class="who-editor">
		<div class="who-item" v-for="w in whos" :key="w.name">
			<span>{{ w.name }}</span>
		</div>
	</div>
</template>

<script setup>

import { ref } from 'vue';

import { Who } from '../models/who.js';


let whos = ref([]);

Who.all().then( (res) => whos.value = res );

</script>
<template>
	<div class="what-editor">
		<div class="what-item" v-for="w in whats" :key="w.name">
			<span>{{ w.name }}</span>
		</div>
	</div>
</template>

<script setup>

import { ref } from 'vue';

import { What } from '../models/what.js';


let whats = ref([]);

What.all().then( (res) => whats.value = res );

</script>
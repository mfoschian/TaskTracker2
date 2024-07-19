<template>
	<div class="tag-editor">
		<div class="tag-item" v-for="t in tags" :key="t.id">
			<span>{{ t.icon }}</span><span> {{ t.label }}</span>
		</div>
	</div>
</template>

<script setup>

import { tags } from '../models/tag.js';


</script>
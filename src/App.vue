<template>
	<div class="app">
		<div class="angle-button">
			<button @click="downloadData">Download</button>
		</div>
		<div class="top-bar">
			<DateBar :date="date"
				@next="addDay(1)"
				@prev="addDay(-1)"
			></DateBar>
		</div>
		<div class="left-side">
			<TagBar :items="tags" @tagclick="tagClicked"></TagBar>
		</div>
		<div class="body">
			<div class="jobs">
				<div class="job" v-for="(job,ix) in jobs" :key="ix"
					:class="{active: job.stop==null}"
				>
					<span class="tm">{{ job.start }}</span>
					<span class="title">{{ job.task }}</span>
					<span v-if="job.tag">{{ job.tag }}</span>
				</div>
			</div>
		</div>
		<div class="right-side"></div>
	</div>
</template>

<script setup>
import DateBar from './components/datebar.vue';
import TagBar from './components/tagbar.vue';

import { tags } from './models/tags.js';
import { getJobsAt, newJob } from './models/jobs.js';

import dayjs from 'dayjs';
import { ref } from 'vue';

let date = ref(new Date());
let jobs = ref([]);


async function downloadData() {
	console.error('Download Not yet implemented');
}

async function addDay(n) {
	let dt = dayjs(date.value);
	dt = dt.add(n, 'day');
	date.value = dt.toDate();
	await loadData();
}

async function loadData() {
	let dt = date.value;
	jobs.value = await getJobsAt(dt);
}

async function tagClicked(tag_id) {
	let j = newJob(tag_id);
	jobs.value.unshift(j);
}

loadData();
</script>

<style scoped lang="scss">
.app {
	display: grid;
	grid-template-columns: min-content 1fr min-content;
	grid-template-rows: min-content 1fr min-content;
	gap: 0px 0px;
	grid-auto-flow: row;
	grid-template-areas:
		"angle-button top-bar top-bar"
		"left-side body right-side";
}

.angle-button {
	grid-area: angle-button;
	padding: var(--padding);
}

.top-bar {
	grid-area: top-bar;
}

.left-side {
	grid-area: left-side;
}

.body {
	grid-area: body;
}

.right-side {
	grid-area: right-side;
}


.jobs {
	.job {

		padding: var(--padding);

		display: flex;
		flex-direction: row;
		gap: var(--padding);
		justify-content: space-between;

		.title {
			flex-grow: 1;
		}

		&.active {
			background-color: crimson;
			color: white;
		}
	}
}
</style>

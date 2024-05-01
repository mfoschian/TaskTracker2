<template>
	<div class="app">
		<div class="angle-button">
			<!-- <button @click="settingsDlg.open()"> -->
			<button @click="insert_start_data">
				<SettingsIcon fill="white"/>
			</button>
		</div>
		<div class="top-bar">
			<DateBar :date="date" @next="addDay(1)" @prev="addDay(-1)"></DateBar>
		</div>
		<div class="left-side">
			<TagBar :items="tags" @tagclick="tagClicked"></TagBar>
		</div>
		<div class="body">
			<TasksView :tasks="tasks" @delete="deleteTask" @requestWhat="openWhatDlg" @requestWho="openWhoDlg">
			</TasksView>
		</div>
		<div class="right-side"></div>
	</div>
	<ChooseOneDialog ref="whatDlg" :items="whats">
		<template #item="{data}">
			{{ data.item.name }}
		</template>
	</ChooseOneDialog>
	<ChooseOneDialog ref="whoDlg" :items="whos">
		<template #item="{data}">
			{{ data.item.name }}
		</template>
	</ChooseOneDialog>

	<ModalDlg ref="settingsDlg">Settings ?</ModalDlg>
</template>

<script setup>
import DateBar from './components/datebar.vue';
import TagBar from './components/tagbar.vue';
import TasksView from './components/tasksbox.vue';
import ModalDlg from './components/modal-dialog.vue';
import ChooseOneDialog from './components/choose-one-dialog.vue';
import SettingsIcon from './components/icons/settings.vue';
import {insert_start_data} from './start_data.js'

import { tags } from './models/tag.js';
import { Task } from './models/task.js';
import { What } from './models/what.js';
import { Who } from './models/who.js';

import dayjs from 'dayjs';
import { ref } from 'vue';

let date = ref(new Date());
let tasks = ref([]);
let whatDlg = ref(null);
let whoDlg = ref(null);
let settingsDlg = ref(null);

let whats = ref([]);
let whos = ref([]);

async function addDay(n) {
	let dt = dayjs(date.value);
	dt = dt.add(n, 'day');
	date.value = dt.toDate();
	await loadData();
}

async function loadData() {
	let dt = date.value;
	tasks.value = await Task.find(dt);

	if(whats.value.length == 0) {
		whats.value = await What.all();
	}

	if(whos.value.length == 0) {
		whos.value = await Who.all();
	}
}

async function tagClicked(tag_id) {
	let last_task = tasks.value[0];
	let now = new Date();
	try {
		if (last_task && last_task.stop == null) {
			last_task.stop = now;
			await last_task.save();
		}
		let t = new Task({ tag: tag_id, start: now });
		await t.save();
		tasks.value.unshift(t);
	}
	catch (err) {
		console.error(err);
		debugger
	}
}

async function deleteTask(t) {
	if (!t) return;
	await t.destroy();
	await loadData();
}

async function openWhatDlg(t) {
	let choosed = await whatDlg.value.choose(null);
	console.log( choosed );
	if(t) {
		t.what = choosed.name;
		await t.save();
	}
}
async function openWhoDlg(t) {
	let choosed = await whoDlg.value.choose(null);
	console.log( choosed );
	if(t) {
		t.who = choosed.name;
		await t.save();
	}
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
	justify-self: center;

	button {
		display: grid;
		place-items: center;
		color: white;

		svg {
			width: 1rem;
			height: 1rem;
		}
	}
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
</style>

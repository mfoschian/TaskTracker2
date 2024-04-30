import { formatDate as formatYMD, formatHHmm } from "../libs/formatters";
import { cmp_desc } from '../libs/sorting.js';

let _storedData = {
	'2024-04-30': [
		{ start: '08:30', stop: '08:45', task: 'Gestione Utenti Portale'},
		{ start: '08:45', stop: '08:50', task: 'Gestione Videoconferenza'},
		{ start: '08:50', stop: '09:00', task: 'Supporto Assessore', tag: 'phone'},
		{ start: '09:00', stop: '09:45', task: 'Patenti Vol'},
		{ start: '09:45', task: 'Supporto Commissario', tag: 'mail'},
	]
}

export async function getJobsAt(dt) {
	const ix = formatYMD(dt, '-');
	let jobs = _storedData[ix] || [];
	return jobs.sort( (j1,j2) => cmp_desc(j1.start, j2.start));
}

export function newJob(tag) {
	const tm = formatHHmm(new Date());
	return {
		start: tm,
		stop: null,
		task: '?',
		tag: tag || null
	}
}

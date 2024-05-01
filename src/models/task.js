
import { dateToEpoch, epochToDate, msInADay } from "../libs/formatters.js";
import { cmp_desc } from '../libs/sorting.js';

import DB from '../libs/LocalDb.js'

const TABLE = 'tasks';


export class Task {
	constructor(args) {
		const a = args || {};
		this.id = a.id;
		this.start = a.start;
		this.stop = a.stop;
		this.what = a.what;
		this.who = a.who;
		this.tag = a.tag;
	}

	async save() {
		await DB.open();
		let task = {
			start: dateToEpoch(this.start),
			stop: dateToEpoch(this.stop),
			what: this.what,
			who: this.who,
			tag: this.tag
		};
		if(this.id != null)
			task.id = this.id;

		let dbt = await DB.upsert(TABLE, task );
		this.id = dbt.id;
	}

	async destroy() {
		await DB.open();
		if( this.id == null ) return;

		await DB.remove(TABLE, this.id);
	}

	static async find(dt) {
		await DB.open();
		let tm = dt.getTime();
		tm = tm - (tm % msInADay);
		let range = new DB.Range( tm, tm + msInADay );
		let res = await DB.getOrdered(TABLE, 'starts', {range} )
		return res.sort( (t1,t2) => cmp_desc(t1.start, t2.start))
		.map( t => new Task({
			id: t.id,
			start: epochToDate(t.start),
			stop: epochToDate(t.stop),
			what: t.what,
			who: t.who,
			tag: t.tag
		}));
	}
}

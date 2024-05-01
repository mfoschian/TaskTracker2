import { cmp_asc } from '../libs/sorting.js';
import DB from '../libs/LocalDb.js'

const TABLE = 'whos';

export class Who {
	constructor(args) {
		const a = args || {};
		this.id = a.id;
		this.name = a.name;
	}

	static async all() {
		await DB.open();

		let res = await DB.getAll(TABLE);
		res = res.map( r => new Who(r)).sort((w1,w2) => cmp_asc(w1.name, w2.name));
		return res;
	}

	async save() {
		await DB.open();
		let w = {
			name: this.name
		};
		if(this.id != null)
			w.id = this.id;

		let dbr = await DB.upsert(TABLE, w );
		this.id = dbr.id;
	}

}


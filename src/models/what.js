import { cmp_asc } from '../libs/sorting.js';
import DB from '../libs/LocalDb.js'

const TABLE = 'whats';

export class What {
	constructor(args) {
		const a = args || {};
		this.id = a.id;
		this.name = a.name;
		this.category = a.category;
	}

	static async all() {
		await DB.open();

		let res = await DB.getAll(TABLE);
		res = res.map( r => new What(r)); //.sort((w1,w2) => cmp_asc(w1.name, w2.name));
		return res;
	}

	async save() {
		await DB.open();
		let w = {
			name: this.name,
			category: this.category
		};
		if(this.id != null)
			w.id = this.id;

		let dbr = await DB.upsert(TABLE, w );
		this.id = dbr.id;
	}

}


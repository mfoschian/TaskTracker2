
export function sort_bool(a,b) {
	if( a == b ) return 0;
	return a == true ? 1 : -1; 
}

export function cmp_asc(a,b) {
	return a < b ? -1 :
		a > b ? 1 :
		0;
}

export function cmp_desc(a,b) {
	return a < b ? 1 :
		a > b ? -1 :
		0;
}

export function sort_by(keys, desc) {
	const cmp = desc === true ? cmp_desc : cmp_asc;
	return (a,b) => {
		if(!a) return -1;
		if(!b) return 1;
		for( let i=0; i<keys.length; i++ ) {
			let k = keys[i];
			let res = cmp(a[k],b[k]);
			if( res != 0 )
				return res;
		}
		return 0;
	}
}

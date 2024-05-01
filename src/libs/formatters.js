
export function formatShortDate(dt, lang) {
	const options = {
		year: 'numeric', month: 'short', day: 'numeric',
		hour: 'numeric', minute: 'numeric', // second: 'numeric',
		hour12: false,
	};
	//let s = dt.toLocaleString(DateTime.DATETIME_SHORT);
	let s = new Intl.DateTimeFormat(lang || 'it-IT', options).format(dt);
	return s;
}


function p2(x) { return x < 10 ? '0'+x : ''+x }
export function formatDateTime(dt) {
	if(!dt) return null;
	if(!dt.getDate) return dt;
	let d = dt.getFullYear() + '-' + p2(dt.getMonth()+1) + '-' + p2(dt.getDate());
	let t = p2(dt.getHours()) + ':' + p2(dt.getMinutes());
	return d + ' ' + t;
}

export function formatYMD(dt) {
	if(!dt) return null;
	if(!dt.getDate) return dt;
	let d = dt.getFullYear() + '-' + p2(dt.getMonth()+1) + '-' + p2(dt.getDate());
	return d;
}

export function formatDMY(dt, sep) {
	if(!dt) return null;
	if(!dt.getDate) return dt;
	let d = [p2(dt.getDate()), p2(dt.getMonth()+1), dt.getFullYear()].join( sep || '/' );
	return d;
}

export function formatHHmm(dt, sep) {
	if(!dt) return null;
	if(!dt.getHours) return dt;
	let d = [p2(dt.getHours()), p2(dt.getMinutes())].join( sep || ':' );
	return d;
}

export function formatDateStr(dt, format) {
	if(!dt) return null;
	if(!dt.getDate) return dt;
	let parts = {
		DD: p2(dt.getDate()),
		MM: p2(dt.getMonth()+1),
		YYYY: p2(dt.getFullYear()),
		hh: p2(dt.getHours()),
		mm: p2(dt.getMinutes())
	};

	let res = format;
	const keys = Object.keys(parts);
	for( let i=0; i<keys.length; i++ ) {
		const k = keys[i];
		res = res.replace(k, parts[k]);
	}

	return res;
}

export const msInADay = 1000 * 60 * 60 * 24;
export const epochToDate = (tm) => {
	if(tm==null) return null;
	let d = new Date();
	d.setTime(tm);
	return d;
}

export const dateToEpoch = (dt) => dt ? dt.getTime() : null;

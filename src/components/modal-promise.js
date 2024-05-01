export class ModalDialogHandler {
	constructor(dlgRef) {
		this.dlg = dlgRef;
		this.abort = () => {};
		this.confirm = () => {};
		this.handled = false;
	}

	onConfirm(result) {
		if(!this.handled) {
			this.handled = true;
			this.dlg.value.close();
			this.confirm(result);
		}
	}

	onAbort(result) {
		if(!this.handled) {
			this.handled = true;
			this.dlg.value.close();
			this.abort(result);
		}
	}

	async waitMe() {
		if( !this.dlg.value )
			return Promise.resolve(false);

		this.handled = false;

		let p =  new Promise( (resolve,reject) => {
			this.abort = (abortCode) => {
				resolve(abortCode);
			};
			this.confirm = (result) => {
				resolve(result);
			};
		});

		this.dlg.value.open();

		return p;
	}
}

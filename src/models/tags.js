import { ref } from 'vue';


const _baseTags = [
	{ id: 'phone', label: 'Telefonata', icon: 'phone.svg'},
	{ id: 'mail', label: 'E-mail', icon: 'email.svg'},
	{ id: 'person', label: 'Persona', icon: 'person.svg'},
	{ id: 'meeting', label: 'Riunione', icon: 'meeting.svg'},
	{ id: 'eating', label: 'Pasto', icon: 'coffee.svg'}	
];
export let tags = ref(_baseTags);


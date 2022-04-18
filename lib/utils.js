import { hash as _hash, compare } from 'bcryptjs';
import { randomUUID, } from "crypto";

Array.prototype.mul = function(n) {
	let a = [];
	for (let i=0;i<n;[i++].push.apply(a,this));
	return a;
};

export const shuffle = function(arr) {
	let m = arr.length, i;
	while (m) {
	  i = (Math.random() * m--) >>> 0;
	  [arr[m], arr[i]] = [arr[i], arr[m]]
	}
	return arr;
};

export function * randomChoicesFromArray(arr, choices) {
	for (let i = 0; i < choices; i++) yield arr[Math.floor(Math.random()*arr.length)];
};

export function randomChoiceFromArray(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
};



export function genUUID() {
	return randomUUID();
};

export function pickFromProbabilities(probabilities, choices_num) {
	const items = Object.keys(probabilities);
	let k = [];
	let totals = [];
	let h = g => { return g.split("").reverse().join("").indexOf("."); };
	for ( let o of Object.values(probabilities ) ) k.push( h(o) );
	let j = 10 ** ( Math.max(...k) + 1 );
	for (let item of items) totals.push(... [item].mul(j * (probabilities[item]/100) ) );

	return Array.from(randomChoicesFromArray(totals, choices_num));
};

export async function hashPassword(pswd) {
	return await _hash(pswd, 6);
};

export async function comparePassword(userEntered, passwordHash) {
	return await compare(userEntered, passwordHash);
};

export const genHexID = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

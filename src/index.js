// only required for dev
// in prod, foundry loads index.js, which is compiled by vite/rollup
// in dev, foundry loads index.js, this file, which loads eunos-lancer-hacks.ts

window.global = window; // some of your dependencies might need this
import "./ts/eunos-lancer-hacks.ts";

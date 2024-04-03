// only required for dev
// in prod, foundry loads index.js, which is compiled by vite/rollup
// in dev, foundry loads index.js, this file, which loads lancer.ts

window.global = window;
import * as ELH from "./ts/eunos-lancer-hacks.ts";

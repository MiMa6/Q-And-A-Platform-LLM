import { writable } from "svelte/store";
const courses = writable([]);
const course = writable([]);

export { courses, course };

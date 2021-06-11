import '../scripts/main.js';
import { c_frame } from './scripts/c_frame.js';
import { c_loop } from './scripts/c_loop.js';
import { c_once } from './scripts/c_once.js';

document.title = "canvas example";

const go_here = new c_once([
	new c_frame(g_go_here_0),
	new c_frame(g_go_here_1),
	new c_frame(g_go_here_2),
	new c_frame(g_go_here_3),
	new c_frame(g_go_here_4)
]);

window.g_touch = p => {
	go_here.offset(p.x, p.y);
	go_here.start();
};

window.addEventListener('load', () => {
	g_dirty = true;
});

import '../scripts/main.js';
import { c_area } from './scripts/c_area.js';
import { c_frame  } from './scripts/c_frame.js';
import { c_loop   } from './scripts/c_loop.js';
import { c_once   } from './scripts/c_once.js';

document.title = "canvas example";

//const circle_1 = new c_circle(860, 390, 200);
// const o_go_here_1 = new c_once([
// 		new c_frame(g_go_here_0),
// 		new c_frame(g_go_here_1),
// 		new c_frame(g_go_here_2),
// 		new c_frame(g_go_here_3),
// 		new c_frame(g_go_here_4)
// 	],
// 	circle_1.x, 
// 	circle_1.y
// );
// const l_go_here_1 = new c_loop([ 
// 		new c_frame(g_go_here_4) 
// 	], 
// 	circle_1.x, 
// 	circle_1.y
// );
const x1 = 860;
const y1 = 390;
const r1 = 200;

const opening_once = new c_once([
		new c_frame(g_go_here_0),
		new c_frame(g_go_here_1),
		new c_frame(g_go_here_2),
		new c_frame(g_go_here_3),
		new c_frame(g_go_here_4)
	], x1, y1
);

const opened_loop = new c_loop([ 
		new c_frame(g_go_here_4) 
	], x1, y1
);


const area_1 = new c_area(
	x1, y1, r1,
	opening_once,
	opened_loop
);

//go_here.starts(new c_loop([new c_frame(g_go_here_4)]));

// window.g_touch = p => {
// 	go_here.start(p.x, p.y);
// };

window.addEventListener('load', () => {
	area_1.start();
	g_dirty = true;
});

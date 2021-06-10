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
	go_here.dx = p.x;
	go_here.dy = p.y;
	g_drawables.push(go_here);
	g_updatables.push(go_here);
};

//window.g_draw = function(ctx) {
//	ctx.drawImage(g_bg, 0, 0, g_w, g_h, 0, 0, g_canvas.width, g_canvas.height);
//	ctx.drawImage(g_go_here_4, 200, 200);
//};

const bg = {
	draw: function(ctx) {
		ctx.drawImage(g_bg, 0, 0, g_w, g_h, 0, 0, g_w, g_h);
	}
};

window.addEventListener('load', () => {
	g_drawables.push(bg);
});

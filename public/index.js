import '../scripts/main.js';

document.title = "canvas example";

window.g_touch = p => log(p.x + " " + p.y);

function draw() {
	ctx.drawImage(g_bg, 0, 0, g_w, g_h, 0, 0, g_canvas.width, g_canvas.height);
	ctx.drawImage(g_go_here_4, 200, 200);
}

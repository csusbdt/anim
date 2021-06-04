window.log = function(...args) {
	args.forEach(arg => console.log(arg));
};

document.title = "canvas example";

window.g_w = 1280;
window.g_h = 720;

let scale = 1;
let left = 0;
let top = 0;

const ctx = g_canvas.getContext('2d');

function adjust_canvas() {
	scale = Math.min(1, window.innerWidth / g_w, window.innerHeight / g_h);
	g_canvas.width = scale * g_w;
	g_canvas.height = scale * g_h;

	// Center canvas in browser window.
	left = (window.innerWidth  - g_canvas.width ) / 2;
	top  = (window.innerHeight - g_canvas.height) / 2;
	g_canvas.style.left = left;
	g_canvas.style.top = top;
	draw();
}

adjust_canvas();

window.addEventListener('resize', function() {
	adjust_canvas();
});

function draw() {
	ctx.drawImage(g_bg, 0, 0, g_w, g_h, 0, 0, g_canvas.width, g_canvas.height);
}

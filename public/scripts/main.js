window.log = function(...args) {
	args.forEach(arg => console.log(arg));
};

window.g_w = 1280;
window.g_h = 720;

let scale = 1;
let left = 0;
let top = 0;
let dirty = true;
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

	ctx.setTransform(scale, 0, 0, scale, 0, 0);
	dirty = true;
}

adjust_canvas();

window.addEventListener('resize', function() {
	adjust_canvas();
});

// convert mouse event coords to game world coords
const canvas_coords = e => {
	return {
		x: (e.pageX - left) / scale,
		y: (e.pageY - top ) / scale
	};
};

const mousemove = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_canvas.style.cursor = 'default';
};

const mousedown = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_touch(canvas_coords(e));
};

const touchstart = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_canvas.style.cursor = 'none';
	g_touch(canvas_coords(e.changedTouches[0]));
};

g_canvas.addEventListener('mousemove' , mousemove , true);
g_canvas.addEventListener('mousedown' , mousedown , true); 
g_canvas.addEventListener('touchstart', touchstart, true); 

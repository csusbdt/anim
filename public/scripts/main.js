window.log = function(...args) {
	args.forEach(arg => console.log(arg));
};

window.g_w     = 1280;  // design width
window.g_h     = 720;   // design height
window.g_spf   = 1 / 8; // seconds per frame
window.g_dirty = true;  // should redraw canvas

const ctx = g_canvas.getContext('2d');
let scale = 1;
let left  = 0;
let top   = 0;

function adjust_canvas() {
	// Set canvas size.
	scale = Math.min(1, window.innerWidth / g_w, window.innerHeight / g_h);
	g_canvas.width  = scale * g_w;
	g_canvas.height = scale * g_h;

	// Center canvas in browser window.
	left = (window.innerWidth  - g_canvas.width ) / 2;
	top  = (window.innerHeight - g_canvas.height) / 2;
	g_canvas.style.left = left;
	g_canvas.style.top  = top;

	// Set drawing context transform to scale design coordinates 
	// (world coordinates) to display coordinates.
	ctx.setTransform(scale, 0, 0, scale, 0, 0);
	g_dirty = true;
}

adjust_canvas();

window.addEventListener('resize', adjust_canvas);

// Convert mouse event coords to game world coords.
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
	g_canvas.style.cursor = 'default';
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

window.g_drawables  = [];
window.g_updatables = [];

window.g_insert_drawable = function(o) {
	for (let i = g_drawables.length; i > 0; --i) {
		if (o.z_order >= g_drawables[i - 1].z_order) {
			g_drawables.splice(i, 0, o);
			return;
		}
	}
	g_drawables.unshift(o);
};

window.g_insert_updatable = function(o) {
	g_updatables.push(o);
};

window.g_remove_drawable = function(o) {
	const i = g_drawables.indexOf(o);
	if (i !== -1) g_drawables.splice(i, 1);
};

window.g_remove_updatable = function(o) {
	const i = g_updatables.indexOf(o);
	if (i !== -1) g_updatables.splice(i, 1);
};

let previous_time = new Date().getTime() / 1000;

function animation_loop() {
	if (g_dirty) {
		if (g_bg) {
			ctx.drawImage(g_bg, 0, 0, g_w, g_h, 0, 0, g_w, g_h);
		}
		g_drawables.forEach(o => o.draw(ctx));
		g_dirty = false;
	}
	const current_time = new Date().getTime() / 1000;
	let dt = current_time - previous_time;
	previous_time = current_time;
	g_updatables.slice().forEach(o => o.update(dt));
	requestAnimationFrame(animation_loop);
}

requestAnimationFrame(animation_loop);

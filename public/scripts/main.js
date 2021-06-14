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

// window.g_drawables  = [];
// window.g_updatables = [];
// window.g_touchables = [];
const drawables  = [];
const updatables = [];
const touchables = [];
window.g_selected_touchable = null;
//window.g_zones         = [];
//window.g_selected_zone = null;
//window.g_opening_zone = null;
//window.g_closing_zone = null;
//window.g_opened_zone  = null;

const touch = p => {
	if (g_selected_touchable) {
		g_selected_touchable.touch(p.x, p.y);
	} else for (let i = 0; i < touchables.length; ++i) {
		if (touchables[i].touch(p.x, p.y)) return;
	}
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
	touch(canvas_coords(e));
};

const touchstart = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_canvas.style.cursor = 'none';
	touch(canvas_coords(e.changedTouches[0]));
};

g_canvas.addEventListener('mousemove' , mousemove , true);
g_canvas.addEventListener('mousedown' , mousedown , true); 
g_canvas.addEventListener('touchstart', touchstart, true); 

window.g_insert_touchable = function(o) {
	for (let i = touchables.length; i > 0; --i) {
		if (o.z_order >= touchables[i - 1].z_order) {
			touchables.splice(i, 0, o);
			return;
		}
	}
	touchables.unshift(o);
};

window.g_insert_drawable = function(o) {
	for (let i = drawables.length; i > 0; --i) {
		if (o.z_order >= drawables[i - 1].z_order) {
			drawables.splice(i, 0, o);
			return;
		}
	}
	drawables.unshift(o);
};

window.g_insert_updatable = function(o) {
	updatables.push(o);
};

window.g_remove_touchable = function(o) {
	const i = touchables.indexOf(o);
	if (i !== -1) touchables.splice(i, 1);
};

window.g_remove_drawable = function(o) {
	const i = drawables.indexOf(o);
	if (i !== -1) drawables.splice(i, 1);
};

window.g_remove_updatable = function(o) {
	const i = updatables.indexOf(o);
	if (i !== -1) updatables.splice(i, 1);
};

let previous_time = new Date().getTime() / 1000;

function animation_loop() {
	if (g_dirty) {
		if (g_bg) {
			ctx.drawImage(g_bg, 0, 0, g_w, g_h, 0, 0, g_w, g_h);
		}
		drawables.forEach(o => o.draw(ctx));
		g_dirty = false;
	}
	const current_time = new Date().getTime() / 1000;
	let dt = current_time - previous_time;
	previous_time = current_time;
	updatables.slice().forEach(o => o.update(dt));
	requestAnimationFrame(animation_loop);
}

requestAnimationFrame(animation_loop);

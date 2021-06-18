import fscreen from "./fscreen.js";

window.log = function(...args) {
	args.forEach(arg => console.log(arg));
};

window.g_fullscreen = function() {
	if (fscreen.fullscreenEnabled) {
		fscreen.requestFullscreen(g_canvas);
	}
} 

// window.is_fullscreen = function() {
// 	return !!fscreen.fullscreenElement;
// };

window.g_stop_start = function(o) {
	o.stop_set.forEach(o => o.stop());
	o.start_set.forEach(o => {
		if (typeof(o) === 'function') {
			o();
		} else {
			o.start();
		}
	});	
};

window.g_w     = 1280;  // design width
window.g_h     = 720;   // design height
window.g_spf   = 1 / 8; // seconds per frame
window.g_dirty = true;  // should redraw canvas

const ctx = g_canvas.getContext('2d', { alpha: false });
let scale = 1;
let left  = 0;
let top   = 0;

function adjust_canvas() {
	const w = window.innerWidth;
	const h = window.innerHeight;
//	const w = screen.availWidth;
//	const h = screen.availHeight;
//	const w = Math.min(window.innerWidth, screen.availWidth);
//	const h = Math.min(window.innerHeight, screen.availHeight);
//	const w = document.documentElement.clientWidth;
//	const h = document.documentElement.clientHeight;
	
	// Set canvas size.
	scale = Math.min(1, w / g_w, h / g_h);
	g_canvas.width  = scale * g_w;
	g_canvas.height = scale * g_h;

	// Center canvas in browser window.
	left = (w  - g_canvas.width ) / 2;
	top  = (h - g_canvas.height) / 2;
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

const drawables  = [];
const updatables = [];
const touchables = [];
window.g_selected_touchable = null;

const touch = p => {
	if (g_selected_touchable) {
		if (g_selected_touchable.touch(p.x, p.y)) return;
	} 
	for (let i = 0; i < touchables.length; ++i) {
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

// the following touchend and touchmove code needed for fullscreen on chrome
// see: https://stackoverflow.com/questions/42945378/full-screen-event-on-touch-not-working-on-chrome/42948120

const touchend = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_canvas.style.cursor = 'none';
	touch(canvas_coords(e.changedTouches[0]));
};

const touchmove = e => {
	e.preventDefault();
}

g_canvas.addEventListener('mousemove', mousemove, true);
g_canvas.addEventListener('mousedown', mousedown, true); 
g_canvas.addEventListener('touchend' , touchend , true); 
g_canvas.addEventListener('touchmove', touchmove, { passive: false }); 

window.g_clear_touchables = function() {
	while (touchables.length > 0) {
		touchables[0].stop();
	}
};

window.g_add_touchable = function(o) {
	touchables.push(o);
};

window.g_add_drawable = function(o) {
	if (!o.hasOwnProperty('z_index')) throw new Error(o);
	g_dirty = true;
	for (let i = drawables.length; i > 0; --i) {
		if (o.z_index >= drawables[i - 1].z_index) {
			drawables.splice(i, 0, o);
			return;
		}
	}
	drawables.unshift(o);
};

window.g_add_updatable = function(o) {
	updatables.push(o);
};

window.g_remove_touchable = function(o) {
	const i = touchables.indexOf(o);
	if (i !== -1) {
		touchables.splice(i, 1);
	}
};

window.g_remove_drawable = function(o) {
	const i = drawables.indexOf(o);
	if (i !== -1) {
		drawables.splice(i, 1);
		g_dirty = true;
	}
};

window.g_remove_updatable = function(o) {
	const i = updatables.indexOf(o);
	if (i !== -1) {
		updatables.splice(i, 1);
	}
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

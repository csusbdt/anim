import fscreen from "./fscreen.js";

window.log = function(...args) {
	args.forEach(arg => console.log(arg));
};

window.g_fullscreen = function() {
	if (fscreen.fullscreenEnabled) {
		fscreen.requestFullscreen(g_canvas);
	} 
} 

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

window.g_go_home = function() {
	window.location.href = "../../";
};

window.g_w     = 1280;  // design width
window.g_h     = 720;   // design height
window.g_spf   = 1 / 8; // seconds per frame
window.g_dirty = true;  // to redraw canvas

const ctx = g_canvas.getContext('2d', { alpha: false });
let scale = 1;
let left  = 0;
let top   = 0;

function adjust_canvas() {
	let w = window.innerWidth;
	let h = window.innerHeight;
	
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

const drawables        = [];
const updatables       = [];
const touchables       = [];
window.g_audio_context = null;

const touch = p => {
	// Getting audio context on first touch will enable fastest
	// possible playout of sound on subsequent touch events.
	if (g_audio_context === null) {
		g_audio_context = new (window.AudioContext || window.webkitAudioContext)();
	}
	// I'm not sure the following is needed but I think phones might 
	// suspend audio contexts to reduce battery drain.
	if (g_audio_context.state === 'suspended') {
		g_audio_context.resume();
	}
	for (let i = 0; i < touchables.length; ++i) {
		if (touchables[i].touch(p.x, p.y)) break;
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

window.g_add_touchable = function(o) {
	if (touchables.includes(o)) return;
	touchables.push(o);
};

window.g_add_drawable = function(o) {
	if (!('z_index' in o)) throw new Error(o);
	if (drawables.includes(o)) return;
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
	if (updatables.includes(o)) return;
	updatables.push(o);
};

window.g_clear_touchables = function() {
	touchables.length = 0;
};

// window.g_remove_touchable = function(o) {
// 	const i = touchables.indexOf(o);
// 	if (i !== -1) {
// 		touchables.splice(i, 1);
// 	}
// };

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
		ctx.drawImage(i_bg, 0, 0, g_w, g_h, 0, 0, g_w, g_h);
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

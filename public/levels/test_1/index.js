document.title = "test 1";

// shapes

const bg_shapes         = [g_rect(0, 0, 1280, 720)];
const fullscreen_shapes = [g_circle(400, 374, 300)];
const windowed_shapes   = [g_rect(840, 288, 1212, 486)];
const sel_1_shapes      = [g_circle(426, 226,  70)];
const sel_2_shapes      = [g_circle(200, 425, 160), g_circle(420, 560, 100)];
const sel_3_shapes      = [g_circle(838, 428, 160)];
const sel_x_shapes      = [g_rect(950, 120, 1120, 214)];
const op_x_shapes       = [g_circle(1047, 177, 73)];
const op_1_shapes       = [g_circle(426, 226, 100)];

// adjustments to map 1 to 2 and 3 

const dx_2 = -126;
const dy_2 = 242;
const dx_3 = 412;
const dy_3 = 202;

// frames

const fullscreen_frames = g_frames([g_pick_screen]);
const door_frames       = g_frames([g_door]);
const opening_x_frames  = g_frames([g_exit_0, g_exit_1]);
const opened_x_frames   = g_frames([g_exit_2]);
const closing_x_frames  = opening_x_frames.slice().reverse();
const opening_1_frames  = g_frames([g_go1_0, g_go1_1, g_go1_2], 1/16);
const opened_1_frames   = g_frames([g_go1_3]);
const closing_1_frames  = opening_1_frames.slice().reverse();
const idle_1_frames     = g_frames([g_idle1_0, g_idle1_1, g_idle1_2]);

const walk_1_2_frames = [
	g_frame(g_idle1_0, 1/8, 128, -4), 
	g_frame(g_idle1_1, 1/8, 240, -2), 
	g_frame(g_idle1_2, 1/8, 373, 18), 
	g_frame(g_idle1_0, 1/8, 497, 38), 
	g_frame(g_idle1_1, 1/8, 609, 73), 
	g_frame(g_idle1_2, 1/8, 645, 175), 
	g_frame(g_idle1_0, 1/8, 609, 283), 
	g_frame(g_idle1_1, 1/8, 503, 363), 
	g_frame(g_idle1_2, 1/8, 355, 377), 
	g_frame(g_idle1_0, 1/8, 215, 360), 
	g_frame(g_idle1_1, 1/8, 115, 343), 
	g_frame(g_idle1_2, 1/8, 3, 313), 
	g_frame(g_idle1_0, 1/8, -74, 283), 
	g_frame(g_idle1_1, 1/8, -126, 242) 
];
const walk_2_1_frames = walk_1_2_frames.slice().reverse();

const walk_1_3_frames = [
	g_frame(g_idle1_0, 1/8, 65, 36), 
	g_frame(g_idle1_1, 1/8, 136, 75), 
	g_frame(g_idle1_2, 1/8, 186, 111), 
	g_frame(g_idle1_0, 1/8, 263, 143), 
	g_frame(g_idle1_1, 1/8, 337, 182), 
	g_frame(g_idle1_2, 1/8, 387, 212), 
	g_frame(g_idle1_0, 1/8, 412, 202) 
];
const walk_3_1_frames = walk_1_3_frames.slice().reverse();

const walk_2_3_frames = [
	g_frame(g_idle1_0, 1/8, -55, 240), 
	g_frame(g_idle1_1, 1/8, 21, 250), 
	g_frame(g_idle1_2, 1/8, 96, 245), 
	g_frame(g_idle1_0, 1/8, 165, 235), 
	g_frame(g_idle1_1, 1/8, 238, 227), 
	g_frame(g_idle1_2, 1/8, 325, 222), 
	g_frame(g_idle1_0, 1/8, 412, 202) 
];
const walk_3_2_frames = walk_2_3_frames.slice().reverse();

const walk_3_x_frames = [
	g_frame(g_idle1_0, 1/8, 454, 174), 
	g_frame(g_idle1_1, 1/8, 500, 120), 
	g_frame(g_idle1_2, 1/8, 550, 54), 
	g_frame(g_idle1_0, 1/8, 599, -14), 
	g_frame(g_idle1_1, 1/8, 607, -54) 
];
const walk_x_3_frames = walk_3_x_frames.slice().reverse();

// loops

const fullscreen_loop = g_loop(fullscreen_frames, 10);
const door_loop       = g_loop(door_frames, 10);
const idle_1_loop     = g_loop(idle_1_frames, 10);
const idle_2_loop     = g_loop(idle_1_frames, 10, dx_2, dy_2);
const idle_3_loop     = g_loop(idle_1_frames, 10, dx_3, dy_3);
const op_1_loop       = g_loop(opened_1_frames, 10);
const op_2_loop       = g_loop(opened_1_frames, 10, dx_2, dy_2);
const op_3_loop       = g_loop(opened_1_frames, 10, dx_3, dy_3);
const op_x_loop       = g_loop(opened_x_frames, 10);

// touches

const sel_fullscreen = g_touch(fullscreen_shapes).stops(fullscreen_loop);
const sel_windowed   = g_touch(windowed_shapes).stops(fullscreen_loop);
const sel_2_1    = g_touch(sel_1_shapes);
const sel_3_1    = g_touch(sel_1_shapes);
const sel_1_2    = g_touch(sel_2_shapes);
const sel_3_2    = g_touch(sel_2_shapes);
const sel_1_3    = g_touch(sel_3_shapes);
const sel_2_3    = g_touch(sel_3_shapes);
const sel_1_x    = g_touch(sel_x_shapes);
const sel_2_x    = g_touch(sel_x_shapes);
const sel_3_x    = g_touch(sel_x_shapes);
const op_2_1     = g_touch(op_1_shapes).stops(op_1_loop);
const op_3_1     = g_touch(op_1_shapes).stops(op_1_loop);
const op_1_2     = g_touch(op_1_shapes, dx_2, dy_2).stops(op_2_loop);
const op_3_2     = g_touch(op_1_shapes, dx_2, dy_2).stops(op_2_loop);
const op_1_3     = g_touch(op_1_shapes, dx_3, dy_3).stops(op_3_loop);
const op_2_3     = g_touch(op_1_shapes, dx_3, dy_3).stops(op_3_loop);
const op_1_x     = g_touch(op_x_shapes).stops(op_x_loop);
const op_2_x     = g_touch(op_x_shapes).stops(op_x_loop);
const op_3_x     = g_touch(op_x_shapes).stops(op_x_loop);
const switch_2_1 = g_touch(sel_1_shapes).stops(op_3_loop, op_3_loop);
const switch_3_1 = g_touch(sel_1_shapes).stops(op_2_loop, op_x_loop);
const switch_1_2 = g_touch(sel_2_shapes).stops(op_3_loop, op_x_loop);
const switch_3_2 = g_touch(sel_2_shapes).stops(op_1_loop, op_x_loop);
const switch_1_3 = g_touch(sel_3_shapes).stops(op_2_loop, op_x_loop);
const switch_2_3 = g_touch(sel_3_shapes).stops(op_1_loop, op_x_loop);
const switch_1_x = g_touch(sel_x_shapes).stops(op_2_loop, op_3_loop);
const switch_2_x = g_touch(sel_x_shapes).stops(op_1_loop, op_3_loop);
const switch_3_x = g_touch(sel_x_shapes).stops(op_1_loop, op_2_loop);
const noop_2_1   = g_touch(bg_shapes).stops(op_1_loop);
const noop_3_1   = g_touch(bg_shapes).stops(op_1_loop);
const noop_1_2   = g_touch(bg_shapes).stops(op_2_loop);
const noop_3_2   = g_touch(bg_shapes).stops(op_2_loop);
const noop_1_3   = g_touch(bg_shapes).stops(op_3_loop);
const noop_2_3   = g_touch(bg_shapes).stops(op_3_loop);
const noop_1_x   = g_touch(bg_shapes).stops(op_x_loop);
const noop_2_x   = g_touch(bg_shapes).stops(op_x_loop);
const noop_3_x   = g_touch(bg_shapes).stops(op_x_loop);

// onces

const sel_2_1_once = g_once(opening_1_frames, 10,    0,    0).starts(op_1_loop, op_2_1, switch_2_3, switch_2_x, noop_2_1);
const sel_3_1_once = g_once(opening_1_frames, 10,    0,    0).starts(op_1_loop, op_3_1, switch_3_2, switch_3_x, noop_3_1);
const sel_1_2_once = g_once(opening_1_frames, 10, dx_2, dy_2).starts(op_2_loop, op_1_2, switch_1_3, switch_1_x, noop_1_2);
const sel_3_2_once = g_once(opening_1_frames, 10, dx_2, dy_2).starts(op_2_loop, op_3_2, switch_3_1, switch_3_x, noop_3_2);
const sel_1_3_once = g_once(opening_1_frames, 10, dx_3, dy_3).starts(op_3_loop, op_1_3, switch_1_2, switch_1_x, noop_1_3);
const sel_2_3_once = g_once(opening_1_frames, 10, dx_3, dy_3).starts(op_3_loop, op_2_3, switch_2_1, switch_2_x, noop_2_3);
const sel_1_x_once = g_once(opening_x_frames).starts(op_x_loop, op_1_x, switch_1_2, switch_1_3, noop_1_x);
const sel_2_x_once = g_once(opening_x_frames).starts(op_x_loop, op_2_x, switch_2_1, switch_2_3, noop_2_x);
const sel_3_x_once = g_once(opening_x_frames).starts(op_x_loop, op_3_x, switch_3_1, switch_3_2, noop_3_x);

const walk_2_1_once = g_once(walk_2_1_frames).starts(idle_1_loop, sel_1_2, sel_1_3, sel_1_x);
const walk_3_1_once = g_once(walk_3_1_frames).starts(idle_1_loop, sel_1_2, sel_1_3, sel_1_x);
const walk_1_2_once = g_once(walk_1_2_frames).starts(idle_2_loop, sel_2_1, sel_2_3, sel_2_x);
const walk_3_2_once = g_once(walk_3_2_frames).starts(idle_2_loop, sel_2_1, sel_2_3, sel_2_x);
const walk_1_3_once = g_once(walk_1_3_frames).starts(idle_3_loop, sel_3_1, sel_3_2, sel_3_x);
const walk_2_3_once = g_once(walk_2_3_frames).starts(idle_3_loop, sel_3_1, sel_3_2, sel_3_x);
const op_2_1_once   = g_once(closing_1_frames, 10,    0,    0).stops(idle_2_loop).starts(walk_2_1_once);
const op_3_1_once   = g_once(closing_1_frames, 10,    0,    0).stops(idle_3_loop).starts(walk_3_1_once);
const op_1_2_once   = g_once(closing_1_frames, 10, dx_2, dy_2).stops(idle_1_loop).starts(walk_1_2_once);
const op_3_2_once   = g_once(closing_1_frames, 10, dx_2, dy_2).stops(idle_3_loop).starts(walk_3_2_once);
const op_1_3_once   = g_once(closing_1_frames, 10, dx_3, dy_3).stops(idle_1_loop).starts(walk_1_3_once);
const op_2_3_once   = g_once(closing_1_frames, 10, dx_3, dy_3).stops(idle_2_loop).starts(walk_2_3_once);

const walk_3_x_once   = g_once(walk_3_x_frames).starts(g_go_home);
const walk_1_3_x_once = g_once(walk_1_3_frames).starts(walk_3_x_once);
const walk_2_3_x_once = g_once(walk_2_3_frames).starts(walk_3_x_once);
const op_1_x_once     = g_once(closing_x_frames).stops(idle_1_loop).starts(walk_1_3_x_once);
const op_2_x_once     = g_once(closing_x_frames).stops(idle_2_loop).starts(walk_2_3_x_once);
const op_3_x_once     = g_once(closing_x_frames).stops(idle_3_loop).starts(walk_3_x_once);

const noop_2_1_once = g_once(closing_1_frames, 10,    0,    0).starts(sel_2_1, sel_2_3, sel_2_x);
const noop_3_1_once = g_once(closing_1_frames, 10,    0,    0).starts(sel_3_1, sel_3_2, sel_3_x);
const noop_1_2_once = g_once(closing_1_frames, 10, dx_2, dy_2).starts(sel_1_2, sel_1_3, sel_1_x);
const noop_3_2_once = g_once(closing_1_frames, 10, dx_2, dy_2).starts(sel_3_1, sel_3_2, sel_3_x);
const noop_1_3_once = g_once(closing_1_frames, 10, dx_3, dy_3).starts(sel_1_2, sel_1_3, sel_1_x);
const noop_2_3_once = g_once(closing_1_frames, 10, dx_3, dy_3).starts(sel_2_1, sel_2_3, sel_2_x);
const noop_1_x_once = g_once(closing_x_frames, 10,    0,    0).starts(sel_1_2, sel_1_3, sel_1_x);
const noop_2_x_once = g_once(closing_x_frames, 10,    0,    0).starts(sel_2_1, sel_2_3, sel_2_x);
const noop_3_x_once = g_once(closing_x_frames, 10,    0,    0).starts(sel_3_1, sel_3_2, sel_3_x);

// touch starts

const enter = () => {
	door_loop.start();
	idle_1_loop.start();
	sel_1_2.start();
	sel_1_3.start();
	sel_1_x.start();
};
sel_fullscreen.starts(enter, g_request_fullscreen);
sel_windowed.starts(enter);

sel_2_1.starts(sel_2_1_once);
sel_3_1.starts(sel_3_1_once);
sel_1_2.starts(sel_1_2_once);
sel_3_2.starts(sel_3_2_once);
sel_1_3.starts(sel_1_3_once);
sel_2_3.starts(sel_2_3_once);
sel_1_x.starts(sel_1_x_once);
sel_2_x.starts(sel_2_x_once);
sel_3_x.starts(sel_3_x_once);
op_2_1.starts(op_2_1_once);
op_3_1.starts(op_3_1_once);
op_1_2.starts(op_1_2_once);
op_3_2.starts(op_3_2_once);
op_1_3.starts(op_1_3_once);
op_2_3.starts(op_2_3_once);
op_1_x.starts(op_1_x_once);
op_2_x.starts(op_2_x_once);
op_3_x.starts(op_3_x_once);
switch_2_1.starts(sel_2_1_once);
switch_3_1.starts(sel_3_1_once);
switch_1_2.starts(sel_1_2_once);
switch_3_2.starts(sel_3_2_once);
switch_1_3.starts(sel_1_3_once);
switch_2_3.starts(sel_2_3_once);
switch_1_x.starts(sel_1_x_once);
switch_2_x.starts(sel_2_x_once);
switch_3_x.starts(sel_3_x_once);
noop_2_1.starts(noop_2_1_once);
noop_3_1.starts(noop_3_1_once);
noop_1_2.starts(noop_1_2_once);
noop_3_2.starts(noop_3_2_once);
noop_1_3.starts(noop_1_3_once);
noop_2_3.starts(noop_2_3_once);
noop_1_x.starts(noop_1_x_once);
noop_2_x.starts(noop_2_x_once);
noop_3_x.starts(noop_3_x_once);

window.addEventListener('load', () => {
	if (g_fullscreen_enabled()) {
		fullscreen_loop.start();
		sel_fullscreen.start();
		sel_windowed.start();	
	} else {
		enter();
	}
});

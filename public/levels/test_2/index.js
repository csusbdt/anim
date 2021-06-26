document.title = "test 2";

// shapes

const bg_shapes         = [g_rect(0, 0, 1280, 720)];
const fullscreen_shapes = [g_circle(400, 374, 300)];
const windowed_shapes   = [g_rect(840, 288, 1212, 486)];
const sel_1_shapes      = [g_circle(426, 226,  70)];
const sel_2_shapes      = [g_circle(200, 425, 160), g_circle(420, 560, 100)];
const sel_3_shapes      = [g_circle(838, 428, 160)];
const sel_x_shapes      = [g_rect(950, 120, 1120, 214)];
const op_x_shapes       = [g_circle(1047, 177, 73)];

// adjustments to map 1 to 2, 3, x 

const dx_2 = -126;
const dy_2 = 242;
const dx_3 = 412;
const dy_3 = 202;
const dx_x = 621;
const dy_x = -49;

// frames

const fullscreen_frames = g_frames([g_pick_screen]);
const door_frames       = g_frames([g_door]);
const opening_x_frames  = g_frames([g_exit_0, g_exit_1]);
const opened_x_frames   = g_frames([g_exit_2]);
const closing_x_frames  = opening_x_frames.slice().reverse();
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

const fullscreen = g_loop(fullscreen_frames, 10);
const door       = g_loop(door_frames, 10);
const idle_1     = g_loop(idle_1_frames, 10);
const idle_2     = g_loop(idle_1_frames, 10, dx_2, dy_2);
const idle_3     = g_loop(idle_1_frames, 10, dx_3, dy_3);
const idle_x     = g_loop(idle_1_frames, 10, dx_x, dy_x);
const opened_x   = g_loop(opened_x_frames, 10);

// touches 

const sel_fullscreen = g_touch(fullscreen_shapes).stops(fullscreen);
const sel_windowed   = g_touch(windowed_shapes).stops(fullscreen);
const sel_2_1        = g_touch(sel_1_shapes).stops(idle_2);
const sel_3_1        = g_touch(sel_1_shapes).stops(idle_3);
const sel_x_1        = g_touch(sel_1_shapes).stops(idle_x);
const sel_1_2        = g_touch(sel_2_shapes).stops(idle_1);
const sel_3_2        = g_touch(sel_2_shapes).stops(idle_3);
const sel_x_2        = g_touch(sel_2_shapes).stops(idle_x);
const sel_1_3        = g_touch(sel_3_shapes).stops(idle_1);
const sel_2_3        = g_touch(sel_3_shapes).stops(idle_2);
const sel_x_3        = g_touch(sel_3_shapes).stops(idle_x);
const sel_1_x        = g_touch(sel_x_shapes).stops(idle_1);
const sel_2_x        = g_touch(sel_x_shapes).stops(idle_2);
const sel_3_x        = g_touch(sel_x_shapes).stops(idle_3);
const sel_x_x        = g_touch(sel_x_shapes);

const op_x     = g_touch(op_x_shapes).stops(opened_x);
const noop_x_1 = g_touch(sel_1_shapes).stops(opened_x, idle_x);
const noop_x_2 = g_touch(sel_2_shapes).stops(opened_x, idle_x);
const noop_x_3 = g_touch(sel_3_shapes).stops(opened_x, idle_x);
const noop_x   = g_touch(bg_shapes).stops(opened_x);

// onces

const walk_2_1 = g_once(walk_2_1_frames).starts(idle_1, sel_1_2, sel_1_3, sel_1_x);
const walk_3_1 = g_once(walk_3_1_frames).starts(idle_1, sel_1_2, sel_1_3, sel_1_x);
const walk_x_1 = g_once(walk_x_3_frames).starts(walk_3_1);
const walk_1_2 = g_once(walk_1_2_frames).starts(idle_2, sel_2_1, sel_2_3, sel_2_x);
const walk_3_2 = g_once(walk_3_2_frames).starts(idle_2, sel_2_1, sel_2_3, sel_2_x);
const walk_x_2 = g_once(walk_x_3_frames).starts(walk_3_2);
const walk_1_3 = g_once(walk_1_3_frames).starts(idle_3, sel_3_1, sel_3_2, sel_3_x);
const walk_2_3 = g_once(walk_2_3_frames).starts(idle_3, sel_3_1, sel_3_2, sel_3_x);
const walk_x_3 = g_once(walk_x_3_frames).starts(idle_3, sel_3_1, sel_3_2, sel_3_x);

const walk_3_x = g_once(walk_3_x_frames).starts(idle_x, sel_x_1, sel_x_2, sel_x_3, sel_x_x);
const walk_1_x = g_once(walk_1_3_frames).starts(walk_3_x);
const walk_2_x = g_once(walk_2_3_frames).starts(walk_3_x);

const opening_x        = g_once(opening_x_frames).starts(opened_x, op_x, noop_x_1, noop_x_2, noop_x_3, noop_x);
const closing_op_x     = g_once(closing_x_frames).starts(g_go_home);
const closing_noop_x_3 = g_once(closing_x_frames).starts(walk_x_3);
const closing_noop_x_1 = g_once(closing_x_frames).starts(walk_x_1);
const closing_noop_x_2 = g_once(closing_x_frames).starts(walk_x_2);
const closing_noop_x   = g_once(closing_x_frames).starts(sel_x_1, sel_x_2, sel_x_3, sel_x_x);

// touch starts

const enter = () => {
	door.start();
	idle_1.start();
	sel_1_2.start();
	sel_1_3.start();
	sel_1_x.start();
};
sel_fullscreen.starts(enter, g_fullscreen);
sel_windowed.starts(enter);

sel_1_2.starts(walk_1_2);
sel_1_3.starts(walk_1_3);
sel_1_x.starts(walk_1_x);
sel_2_1.starts(walk_2_1);
sel_2_3.starts(walk_2_3);
sel_2_x.starts(walk_2_x);
sel_3_1.starts(walk_3_1);
sel_3_2.starts(walk_3_2);
sel_3_x.starts(walk_3_x);
sel_x_1.starts(walk_x_1);
sel_x_2.starts(walk_x_2);
sel_x_3.starts(walk_x_3);
sel_x_1.starts(walk_x_1);
sel_x_x.starts(opening_x);

op_x.starts(closing_op_x);
noop_x_1.starts(closing_noop_x_1);
noop_x_2.starts(closing_noop_x_2);
noop_x_3.starts(closing_noop_x_3);
noop_x.starts(closing_noop_x);

window.addEventListener('load', () => {
	fullscreen.start();
	sel_fullscreen.start();
	sel_windowed.start();
});
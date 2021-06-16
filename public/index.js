document.title = "canvas example";

//const closing_frames = opening_frames.slice().reverse();

const closed_shapes_1 = [g_circle(426, 226,  70)];
const closed_shapes_2 = [g_circle(200, 425, 160), g_circle(420, 560, 100)];
const closed_shapes_3 = [g_circle(838, 428, 160)];

const opened_shapes_1 = [g_circle(426, 226, 100)];
const opened_shapes_2 = [g_circle(300, 468, 100)];
const opened_shapes_3 = [g_circle(838, 428, 100)];

const dx_1 = 0;
const dy_1 = 0;
const dx_2 = opened_shapes_2[0].x - opened_shapes_1[0].x;
const dy_2 = opened_shapes_2[0].y - opened_shapes_1[0].y;
const dx_3 = opened_shapes_3[0].x - opened_shapes_1[0].x;
const dy_3 = opened_shapes_3[0].y - opened_shapes_1[0].y;

const opening_frames = g_frames([g_go1_0, g_go1_1, g_go1_2], 1/16);
const opened_frames  = g_frames([g_go1_3]);
const closing_frames = opening_frames.slice().reverse();

const t_2_1 = g_touch(
	closed_shapes_1, opened_shapes_1, 
	null,
	g_once(opening_frames, 100, dx_1, dy_1),
	g_loop(opened_frames , 100, dx_1, dy_1),
	g_once(closing_frames, 100, dx_1, dy_1)
);
const t_3_1 = g_touch(
	closed_shapes_1, opened_shapes_1, 
	null,
	g_once(opening_frames, 100, dx_1, dy_1),
	g_loop(opened_frames , 100, dx_1, dy_1),
	g_once(closing_frames, 100, dx_1, dy_1)
);

const t_1_2 = g_touch(
	closed_shapes_2, opened_shapes_2, 
	null,
	g_once(opening_frames, 100, dx_2, dy_2),
	g_loop(opened_frames , 100, dx_2, dy_2),
	g_once(closing_frames, 100, dx_2, dy_2)
); 
const t_3_2 = g_touch(
	closed_shapes_2, opened_shapes_2, 
	null,
	g_once(opening_frames, 100, dx_2, dy_2),
	g_loop(opened_frames , 100, dx_2, dy_2),
	g_once(closing_frames, 100, dx_2, dy_2)
); 

const t_1_3 = g_touch(
	closed_shapes_3, opened_shapes_3, 
	null,
	g_once(opening_frames, 100, dx_3, dy_3),
	g_loop(opened_frames , 100, dx_3, dy_3),
	g_once(closing_frames, 100, dx_3, dy_3)
);
const t_2_3 = g_touch(
	closed_shapes_3, opened_shapes_3, 
	null,
	g_once(opening_frames, 100, dx_3, dy_3),
	g_loop(opened_frames , 100, dx_3, dy_3),
	g_once(closing_frames, 100, dx_3, dy_3)
);

const idle_frames_1 = [g_frame(g_idle1_0), g_frame(g_idle1_1), g_frame(g_idle1_2)];
const idle_1 = g_loop(idle_frames_1, 10, dx_1, dy_1);
const idle_2 = g_loop(idle_frames_1, 10, dx_2, dy_2);
const idle_3 = g_loop(idle_frames_1, 10, dx_3, dy_3);

const walk_frames_1_2 = [
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
const walk_frames_2_1 = walk_frames_1_2.slice().reverse();

const walk_1_2 = g_once(walk_frames_1_2, 10);
const walk_2_1 = g_once(walk_frames_2_1, 10);

t_1_2.stops(idle_1).starts(walk_1_2);
t_1_3.stops(idle_1).starts(t_3_1, t_3_2, idle_3);
t_2_1.stops(idle_2).starts(walk_2_1);
t_2_3.stops(idle_2).starts(t_3_1, t_3_2, idle_3);
t_3_1.stops(idle_3).starts(t_1_2, t_1_3, idle_1);
t_3_2.stops(idle_3).starts(t_2_1, t_2_3, idle_2);

walk_1_2.starts(t_2_1, t_2_3, idle_2);
walk_2_1.starts(t_1_2, t_1_3, idle_1);

window.addEventListener('load', () => {
	idle_1.start();
	t_1_2.start();
	t_1_3.start();
	g_dirty = true;
});

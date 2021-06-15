document.title = "canvas example";

const area1 = g_touch(
	[g_circle(426, 226,  70)],
	[g_circle(426, 226, 100)],
	[
		g_frame(g_blank, 1/16),
		g_frame(g_go1_1, 1/16),
		g_frame(g_go1_3, 1/16)
	], 0, 0
);

const area2 = g_touch(
	[g_circle(200, 425, 160), g_circle(420, 560, 100)],
	[g_circle(300, 468, 100)],
	[
		g_frame(g_blank, 1/16),
		g_frame(g_go1_0, 1/16),
		g_frame(g_go1_1, 1/16),
		g_frame(g_go1_2, 1/16),
		g_frame(g_go1_3, 1/16)
	],
	-126, 242
);

const area3 = g_touch(
	[g_circle(838, 428, 160)],
	[g_circle(838, 428, 100)],
	[
		g_frame(g_blank, 1/12),
		g_frame(g_go1_0, 1/12),
		g_frame(g_go1_1, 1/12),
		g_frame(g_go1_3, 1/12)
	],
	412, 200
);

const idle_frames = [g_frame(g_idle1_0), g_frame(g_idle1_1), g_frame(g_idle1_2)];
const idle1 = g_loop(idle_frames, 10,    0,   0);
const idle2 = g_loop(idle_frames, 10, -126, 242);
const idle3 = g_loop(idle_frames, 10,  412, 200);

const walk_1_2 = g_once([
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
], 10);

area1.stops(idle2, idle3).starts(area2, area3, idle1);
area2.stops(idle1, idle3).starts(walk_1_2);
area3.stops(idle1, idle2).starts(area1, area2, idle3);
walk_1_2.starts(area1, area3, idle2);

window.addEventListener('load', () => {
	idle1.start();
	area2.start();
	area3.start();
	g_dirty = true;
});

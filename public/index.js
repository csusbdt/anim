document.title = "canvas example";

const area_1 = g_area(
	[g_circle(426, 226,  70)],
	[g_circle(426, 226, 100)],
	[
		g_blank,
//		g_go1_0,
		g_go1_1,
//		g_go1_2,
		g_go1_3
	]
);

const area_2 = g_area(
	[g_circle(200, 425, 160), g_circle(420, 560, 100)],
	[g_circle(300, 468, 100)],
	[
		g_blank,
		g_go1_0,
		g_go1_1,
		g_go1_2,
		g_go1_3
	],
	1/16,
	-126,
	242
);

const area_3 = g_area(
	[g_circle(838, 428, 160)],
	[g_circle(838, 428, 100)],
	[
		g_blank,
		g_go1_0,
		g_go1_1,
//		g_go1_2,
		g_go1_3
	],
	1/12,
	412,
	200
);

area_1.starts(area_2, area_3);
area_2.starts(area_1, area_3);
area_3.starts(area_1, area_2);

window.addEventListener('load', () => {
	//area_1.start();
	area_2.start();
	area_3.start();
	g_dirty = true;
});

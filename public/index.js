document.title = "canvas example";

const test_1_touch = g_touch([g_rect(74, 263, 474, 463)]);
const test_1_loop  = g_loop(g_frames([g_test_1]));
test_1_touch.starts(() => window.location.href = 'levels/test_1/');

const hi_closed_loop  = g_loop(g_frames(g_hi_0));
const hi_opening_once = g_once(g_frames([g_hi_1, g_hi_2, g_hi_3, g_hi_4]), 11);
const hi_opened_loop  = g_loop(g_frames(g_hi_5), 11);
const hi_closing_once = g_once(g_frames([g_hi_4, g_hi_3, g_hi_2, g_hi_1]), 11);

const t_hi = g_touch(
	g_circle(800, 330, 32),
	g_rect(0, 0, 1280, 720),
	hi_closed_loop,
	hi_opening_once,
	hi_opened_loop,
	hi_closing_once
);

t_hi.starts(test_1_touch, t_hi);

window.addEventListener('load', () => {
	test_1_loop.start();
	test_1_touch.start();
	t_hi.start();
});

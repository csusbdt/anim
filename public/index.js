document.title = "canvas example";

const blop_sound       = g_sound('sfx/blop.mp3');
const click_sound      = g_sound('sfx/click.mp3');

const test_1_loop      = g_loop(g_frames([g_test_1]));
const hi_closed_loop   = g_loop(g_frames([g_hi_0]));
const hi_opened_loop   = g_loop(g_frames([g_hi_5]), 11);

const test_1_touch     = g_touch([g_rect(74, 263, 474, 463)]);
const hi_closed_touch  = g_touch([g_circle(800, 330, 32)]);
const hi_opened_touch  = g_touch([g_rect(0, 0, 1280, 720)]);

const hi_opening_once  = g_once(g_frames([g_hi_1, g_hi_2, g_hi_3, g_hi_4]), 11);
const hi_closing_once  = g_once(g_frames([g_hi_4, g_hi_3, g_hi_2, g_hi_1]), 11);

test_1_touch   .starts(() => window.location.href = 'levels/test_1/');
hi_closed_touch.stops(hi_closed_loop).starts(hi_opening_once, blop_sound);
hi_opened_touch.stops(hi_opened_loop).starts(hi_closing_once, click_sound);
hi_opening_once.starts(hi_opened_touch, hi_opened_loop);
hi_closing_once.starts(hi_closed_loop, hi_closed_touch, test_1_touch);

window.addEventListener('load', e => {
	test_1_loop.start();
	hi_closed_loop.start();
	test_1_touch.start();
	hi_closed_touch.start();
});

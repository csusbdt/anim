document.title = "canvas example";

const blop_sound       = g_sound('sfx/blop.mp3');
const click_sound      = g_sound('sfx/click.mp3');

const dx_2 = 560;
const dy_2 = 200;

const test_1_loop          = g_loop(g_frames([i_test_1]));
const test_2_loop          = g_loop(g_frames([i_test_1]), 10, dx_2, dy_2);
const hi_closed_loop       = g_loop(g_frames([i_hi_0]));
const hi_opened_loop       = g_loop(g_frames([i_hi_5]), 11);
const preferred_color_loop = g_loop(g_frames([i_preferred_color]));
const red_loop             = g_loop(g_frames([i_red]));
const blue_loop            = g_loop(g_frames([i_blue]));
const red_blue_loop        = g_loop(g_frames([i_red, i_blue], 1 / 2), 11);

const test_1_touch     = g_touch([g_rect(74, 263, 474, 463)]);
const test_2_touch     = g_touch([g_rect(74, 263, 474, 463)], dx_2, dy_2);
const hi_closed_touch  = g_touch([g_circle(800, 330, 32)]);
const hi_opened_touch  = g_touch([g_rect(0, 0, 1280, 720)]);
const red_touch        = g_touch([g_circle(134, 588, 30)]);
const blue_touch       = g_touch([g_circle(212, 588, 30)]);

const touches = [test_1_touch, test_2_touch, hi_closed_touch];

const hi_opening_once  = g_once(g_frames([i_hi_1, i_hi_2, i_hi_3, i_hi_4]), 11);
const hi_closing_once  = g_once(g_frames([i_hi_4, i_hi_3, i_hi_2, i_hi_1]), 11);

test_1_touch   .starts(() => window.location.href = 'levels/test_1/');
test_2_touch   .starts(() => window.location.href = 'levels/test_2/');
hi_closed_touch.stops(hi_closed_loop).starts(hi_opening_once, blop_sound);
hi_opened_touch.stops(hi_opened_loop).starts(hi_closing_once, click_sound);
hi_opening_once.starts(hi_opened_touch, hi_opened_loop);
hi_closing_once.starts(...touches);

red_touch.stops(red_blue_loop, blue_loop).starts(red_loop, blue_touch, ...touches, function() {
	localStorage.setItem('preferred_color', 'red');
});
blue_touch.stops(red_blue_loop, red_loop).starts(blue_loop, red_touch, ...touches, function() {
	localStorage.setItem('preferred_color', 'blue');
});

window.addEventListener('load', e => {
	const preferred_color = localStorage.getItem('preferred_color');
	if (preferred_color === 'red') {
		red_loop.start();
		blue_touch.start();
	} else if (preferred_color === 'blue') {
		blue_loop.start();
		red_touch.start();
	} else {
		red_blue_loop.start();
		red_touch.start();
		blue_touch.start();
	}
	touches.forEach(touch => touch.start());
	test_1_loop.start();
	test_2_loop.start();
	hi_closed_loop.start();
	preferred_color_loop.start();
//	test_1_touch.start();
//	test_2_touch.start();
//	hi_closed_touch.start();
});

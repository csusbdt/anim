document.title = "canvas example";

const test_1_touch = g_touch([g_rect(74, 263, 474, 463)]);
const test_1_loop  = g_loop(g_frames([g_test_1]));

test_1_touch.starts(() => window.location.href = 'levels/test_1/');

window.addEventListener('load', () => {
	test_1_loop.start();
	test_1_touch.start();
});

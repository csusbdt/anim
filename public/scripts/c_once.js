import { c_frame  } from './c_frame.js';

export function c_once(frames, z_index = 100, dx = 0, dy = 0) {
	this.frames = frames;
	this.z_index = z_index;
	this.dx = dx;
	this.dy = dy;
	this.start_set = [];
	this.stop_set  = [];
}

c_once.prototype.starts = function(...os) {
	os.forEach(o => this.start_set.push(o));
	return this;
};

c_once.prototype.stops = function(...os) {
	os.forEach(o => this.stop_set.push(o));
	return this;
};

c_once.prototype.start = function() {
	this.frame_index = 0;
	this.elapsed_time = 0;
	g_add_drawable(this);
	g_add_updatable(this);
};

c_once.prototype.draw = function(ctx) {
	this.frames[this.frame_index].draw(ctx, this.dx, this.dy);
};

c_once.prototype.update = function(dt) {
	this.elapsed_time += dt;
	if (this.elapsed_time > this.frames[this.frame_index].duration) {
		this.elapsed_time = 0;
		++this.frame_index;
		g_dirty = true;
		if (this.frame_index === this.frames.length) {
			this.frame_index = 0;
			g_remove_drawable(this);
			g_remove_updatable(this);
			this.stop_set.forEach(o => o.stop());
			this.start_set.forEach(o => {
				if (typeof(o) === 'function') {
					o();
				} else {
					o.start(this.dx, this.dy);
				}
			});
		}
	}
};

window.g_once = function(frames, z_index = 10, dx = 0, dy = 0) {
	if (!Array.isArray(frames)) {
		frames = [frames];
	}
	return new c_once(frames, z_index, dx, dy);
};

import { c_frame  } from './c_frame.js';

export function c_loop(frames, z_index = 10, dx = 0, dy = 0) {
	this.frames = frames;
	this.z_index = z_index;
	this.dx = dx;
	this.dy = dy;
}

c_loop.prototype.start = function() {
	this.frame_index  = 0;
	this.elapsed_time = 0;
	g_add_drawable(this);
	g_add_updatable(this);
};

c_loop.prototype.stop = function() {
	g_remove_drawable(this);
	g_remove_updatable(this);
};

c_loop.prototype.draw = function(ctx) {
	this.frames[this.frame_index].draw(ctx, this.dx, this.dy);
};

c_loop.prototype.update = function(dt) {
	if (this.frames.length === 1) {
		// ensure an initial draw after start
		if (this.elapsed_time === 0) {
			this.elapsed_time = dt;
			g_dirty = true;
		}
		return;
	}
	this.elapsed_time += dt;
	if (this.elapsed_time > this.frames[this.frame_index].duration) {
		this.elapsed_time = 0;
		++this.frame_index;
		g_dirty = true;
		if (this.frame_index === this.frames.length) {
			this.frame_index = 0;
		}
	}
};

window.g_loop = function(frames, z_index = 10, dx = 0, dy = 0) {
	if (!Array.isArray(frames)) {
		frames = [frames];
	}
	return new c_loop(frames, z_index, dx, dy);
};

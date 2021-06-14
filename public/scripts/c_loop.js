export function c_loop(frames, z_index = 100, dx = 0, dy = 0) {
	this.frames = frames;
	this.frame_index = 0;
	this.elapsed_time = 0;
	this.dx = dx;
	this.dy = dy;
	this.z_index = z_index;
}

c_loop.prototype.start = function(dx = 0, dy = 0) {
	this.dx = dx;
	this.dy = dy;
	g_insert_drawable(this);
	g_insert_updatable(this);
};

c_loop.prototype.stop = function() {
	g_remove_drawable(this);
	g_remove_updatable(this);
};

c_loop.prototype.draw = function(ctx) {
	this.frames[this.frame_index].draw(ctx, this.dx, this.dy);
};

c_loop.prototype.update = function(dt) {
	if (this.frames.length === 0) {
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

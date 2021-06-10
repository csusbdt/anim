export function c_loop(frames, dx = 0, dy = 0) {
	this.frames = frames;
	this.frame_index = 0;
	this.elapsed_time = 0;
	this.dx = dx;
	this.dy = dy;
}

c_loop.prototype.draw = function(ctx) {
	this.frames[this.frame_index].draw(ctx, this.dx, this.dy);
};

c_loop.prototype.update = function(dt) {
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

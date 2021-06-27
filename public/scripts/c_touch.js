function c_touch(shapes, dx, dy) {
	this.shapes = shapes;
	this.dx = dx;
	this.dy = dy;
	this.clear_touchables = true;
	this.start_set = [];
	this.stop_set  = [];
}

c_touch.prototype.starts = function(...os) {
	os.forEach(o => this.start_set.push(o));
	return this;
};

c_touch.prototype.stops = function(...os) {
	os.forEach(o => this.stop_set.push(o));
	return this;
};

c_touch.prototype.start = function() {
	g_add_touchable(this);
};

c_touch.prototype.touch = function(x, y) {
	for (let i = 0; i < this.shapes.length; ++i) {
		if (this.shapes[i].inside(x - this.dx, y - this.dy)) {
			if (this.clear_touchables) {
				g_clear_touchables();
			}
			g_stop_start(this);
			return true;
		}
	}
	return false;
};

window.g_touch = function(shapes, dx = 0, dy = 0) {
	return new c_touch(shapes, dx, dy);
};

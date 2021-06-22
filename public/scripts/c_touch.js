function c_touch(shapes) {
	this.shapes = shapes;
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
	g_touchables.push(this);
};

c_touch.prototype.touch = function(x, y) {
	for (let i = 0; i < this.shapes.length; ++i) {
		if (this.shapes[i].inside(x, y)) {
			if (this.clear_touchables) {
				g_touchables.length = 0;
			}
			g_stop_start(this);
			return true;
		}
	}
	return false;
};

window.g_touch = function(...shapes) {
	return new c_touch(shapes);
};

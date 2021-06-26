function c_delay(t) {
	this.t = t;
	this.start_set = [];
	this.stop_set  = [];
	this.elapsed_time = 0;
}

c_delay.prototype.starts = function(...os) {
	os.forEach(o => this.start_set.push(o));
	return this;
};

c_delay.prototype.stops = function(...os) {
	os.forEach(o => this.stop_set.push(o));
	return this;
};

c_delay.prototype.start = function() {
	this.elapsed_time = 0;
	g_add_updatable(this);
};

c_delay.prototype.update = function(dt) {
	this.elapsed_time += dt;
	if (this.elapsed_time > this.t) {
		g_remove_updatable(this);
		g_stop_start(this);
	}
};

window.g_delay = function(t) {
	return new c_delay(t);
};

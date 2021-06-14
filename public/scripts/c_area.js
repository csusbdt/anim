const STOPPED      = 0;
const CLOSED       = 1;
const OPENING      = 2;
const OPENED       = 3;
const CLOSING_OP   = 4;
const CLOSING_NOOP = 5;

function opened() {
	if (this === window) throw new Error("this bound to window");
	if (this.opened_loop) {
		this.opened_loop.start(this.x, this.y);
		this.state = OPENED;
	} else if (this.closed_loop) {
		this.closed_loop.start(this.x, this.y);
		this.state = CLOSED;
		g_selected_touchable = null;
	} else {
		this.state = CLOSED;
		g_selected_touchable = null;
	}
}

function op() {
	if (this === window) throw new Error("this bound to window");
	if (this.state !== CLOSED) throw new Error("not closed");
	g_selected_touchable = null;
	if (this.closed_loop) this.closed_loop.start(this.x, this.y);
	this.state = STOPPED;
	this.stop_set.forEach(o => o.stop());
	this.start_set.forEach(o => {
		if (typeof(o) === 'function') {
			o();
		} else {
			o.start();
		}
	});
};

function noop() {
	if (this === window) throw new Error("this bound to window");
	if (this.state !== CLOSED) throw new Error("not closed");
	g_selected_touchable = null;
	if (this.closed_loop) this.closed_loop.start(this.x, this.y);
	this.state = STOPPED;
};

export function c_area(
	x, 
	y, 
	r, 
	opening_once, 
	opened_loop = null, 
	closing_noop_once = null,
	closing_op_once = null, 
	closed_loop = null, 
	z_index = 10
) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.opening_once      = opening_once;
	this.opened_loop       = opened_loop;
	this.closing_noop_once = closing_noop_once;
	this.closing_op_once   = closing_op_once;
	this.closed_loop       = closed_loop;
	this.state             = STOPPED;
	this.start_set         = [];
	this.stop_set          = [];
	this.z_index           = z_index;
	opening_once.starts(opened.bind(this));
	if (closing_noop_once) closing_noop_once.starts(noop.bind(this));
	if (closing_op_once) closing_op_once.starts(op.bind(this));
	// alternative syntax. need to test.
	// opening_once.starts(() => opened());
	// closing_op_once.starts(() => op());
	// closing_noop_once.starts(() => noop());
}

c_area.prototype.starts = function(o) {
	this.start_set.push(o);
	return this;
};

c_area.prototype.stops = function(o) {
	this.stop_set.push(o);
	return this;
};

function inside_circle(cx, cy, cr, x, y) {
	return (cx - x) * (cx - x) + (cy - y) * (cy - y) < cr * cr;
}

c_area.prototype.start = function() {
	if (this.state !== STOPPED) throw new Error("not stopped");
	if (this.closed_loop) this.closed_loop.start(this.x, this.y);
	this.state = CLOSED;
	g_insert_touchable(this);
};

c_area.prototype.stop = function() {
	if (this.state !== CLOSED) throw new Error("not closed");
	if (this.closed_loop) this.closed_loop.stop();
	this.state = STOPPED;
	g_remove_touchable(this);
};

c_area.prototype.touch = function(x, y) {
	if (this.state === CLOSED) {
		if (g_selected_touchable !== null) throw new Error("not null");
		if (inside_circle(this.x, this.y, this.r, x, y)) {
			g_selected_touchable = this;
			if (this.closed_loop) this.closed_loop.stop();
			this.opening_once.start(this.x, this.y);
			this.state = OPENING;
		} else {
			return false;
		}
	} else if (this.state === OPENING) {
		if (g_selected_touchable !== this) throw new Error("not selected");
	} else if (this.state === OPENED) {
		if (g_selected_touchable !== this) throw new Error("not selected");
		this.opened_loop.stop();
		if (inside_circle(this.x, this.y, this.r, x, y)) {
			if (this.closing_op_once) {
				this.closing_op_once.start(this.x, this.y);
				this.state = CLOSING_OP;
			} else {
				this.state = CLOSED;
				op.call(this);
			}
		} else {
			if (this.closing_noop_once) {
				this.closing_noop_once.start(this.x, this.y);
				this.state = CLOSING_NOOP;
			} else {
				this.state = CLOSED;
				noop.call(this);
			}
		}
	} else if (this.state === CLOSING_OP) {
		if (g_selected_touchable !== this) throw new Error("not selected");
	} else if (this.state === CLOSING_NOOP) {
		throw new Error("closing noop");
	} else {
		throw new Error("unknown state");
	}
	return true;
};


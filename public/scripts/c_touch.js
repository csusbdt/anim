import { c_frame  } from './c_frame.js';
import { c_loop   } from './c_loop.js';
import { c_once   } from './c_once.js';

function inside(shapes, x, y) {
	for (let i = 0; i < shapes.length; ++i) {
		if (shapes[i].inside(x, y)) return true;
	}
	return false;
}

const STOPPED      = 0;
const CLOSED       = 1;
const OPENING      = 2;
const OPENED       = 3;
const CLOSING_OP   = 4;
const CLOSING_NOOP = 5;

function opening_end() {
	if (this === window) throw new Error("this bound to window"); // assert
	if (g_selected_touchable !== this) throw new Error("not selected"); // assert
	if (this.opened_loop) {
		this.opened_loop.start();
		this.state = OPENED;
	} else if (this.closing_loop) {
		this.closing_loop.start();
		this.state = CLOSING_OP;
	} else if (this.closed_loop) {
		g_stop_start(this);
		this.closed_loop.start();
		this.state = CLOSED;
		g_selected_touchable = null;
	} else {
		g_stop_start(this);
		this.state = CLOSED;
		g_selected_touchable = null;
	}
}

function closing_end() {
	if (this === window) throw new Error("this bound to window");
	if (this.closed_loop) this.closed_loop.start();
	if (this.state === CLOSING_OP) {
		g_selected_touchable = null;
		this.state = CLOSED;
		g_clear_touchables();
		g_stop_start(this);
	} else if (this.state === CLOSING_NOOP) {
		this.state = CLOSED;
	} else {
		throw new Error("not closing");
	}
};

export function c_touch(
	closed_shapes , 
	opened_shapes , 
	closed_loop   , 
	opening_once  , 
	opened_loop   , 
	closing_once
) {
	if (closed_shapes && !Array.isArray(closed_shapes)) {
		closed_shapes = [closed_shapes];
	}
	if (opened_shapes && !Array.isArray(opened_shapes)) {
		opened_shapes = [opened_shapes];
	}
	this.closed_shapes = closed_shapes;
	this.opened_shapes = opened_shapes;
	this.closed_loop   = closed_loop;
	this.opening_once  = opening_once;
	this.opened_loop   = opened_loop;
	this.closing_once  = closing_once;
	this.state         = STOPPED;
	this.start_set     = [];
	this.stop_set      = [];
	if (opening_once) opening_once.starts(opening_end.bind(this));
	if (closing_once) closing_once.starts(closing_end.bind(this));
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
	if (this.state !== STOPPED) throw new Error("not stopped");
	if (this.closed_loop) this.closed_loop.start();
	this.state = CLOSED;
	g_add_touchable(this);
};

c_touch.prototype.stop = function() {
	if (this.state !== CLOSED) throw new Error("not closed");
	if (this.closed_loop) this.closed_loop.stop();
	this.state = STOPPED;
	g_remove_touchable(this);
};

c_touch.prototype.touch = function(x, y) {
	if (this.opened_shapes === undefined) {
		if (inside(this.closed_shapes, x, y)) {
			this.state = CLOSING_OP;
			closing_end.call(this);
			return true;
		} else {
			return false;
		}
	}
	if (this.state === CLOSED) {
		if (g_selected_touchable !== null) throw new Error("not null"); // assert
		if (inside(this.closed_shapes, x, y)) {
			g_selected_touchable = this;
			if (this.closed_loop) this.closed_loop.stop();
			this.opening_once.start();
			this.state = OPENING;
		} else {
			return false;
		}
	} else if (this.state === OPENING) {
		if (g_selected_touchable !== this) throw new Error("not selected"); // assert
	} else if (this.state === OPENED) {
		if (g_selected_touchable !== this) throw new Error("not selected"); // assert
		this.opened_loop.stop();
		if (this.closing_once) {
			this.closing_once.start();
			if (inside(this.opened_shapes, x, y)) {
		 		this.state = CLOSING_OP;
			} else {
				this.state = CLOSING_NOOP;
				g_selected_touchable = null;
				return false;
			}
		} else {
			if (inside(this.opened_shapes, x, y)) {
				closing_end.call(this);
			} else {
				// noop
			}
			this.state = CLOSED;
		}
	} else if (this.state === CLOSING_OP) {
		// do nothing
	} else if (this.state === CLOSING_NOOP) {
		return false;
	} else {
		throw new Error("unknown state");
	}
	return true;
};

window.g_touch = function(
	closed_shapes , 
	opened_shapes , 
	closed_loop   , 
	opening_once  , 
	opened_loop   , 
	closing_once
) {
	return new c_touch(
		closed_shapes, 
		opened_shapes, 
		closed_loop, 
		opening_once, 
		opened_loop, 
		closing_once);
};

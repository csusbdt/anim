import { c_frame  } from './c_frame.js';
import { c_loop   } from './c_loop.js';
import { c_once   } from './c_once.js';

window.g_stop_start = function(o) {
	o.stop_set.forEach(o => o.stop());
	o.start_set.forEach(o => {
		if (typeof(o) === 'function') {
			o();
		} else {
			o.start();
		}
	});	
}

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
	g_selected_touchable = null;
	if (this.closed_loop) this.closed_loop.start();
	if (this.state === CLOSING_OP) {
		g_stop_start(this);
	} else if (this.state === CLOSING_NOOP) {
		// noop
	} else {
		throw new Error("not closing");
	}
	this.state = CLOSED;
};

export function c_area(
	shapes              , 
	opening_once        ,
	opened_loop  = null , 
	closing_once = null ,
	closed_loop  = null
) {
	this.shapes       = shapes;
	this.opening_once = opening_once;
	this.opened_loop  = opened_loop;
	this.closing_once = closing_once;
	this.closed_loop  = closed_loop;
	this.state        = STOPPED;
	this.start_set    = [];
	this.stop_set     = [];
	opening_once.starts(opening_end.bind(this));
	if (closing_once) closing_once.starts(closing_end.bind(this));
}

c_area.prototype.starts = function(o) {
	this.start_set.push(o);
	return this;
};

c_area.prototype.stops = function(o) {
	this.stop_set.push(o);
	return this;
};

c_area.prototype.start = function() {
	if (this.state !== STOPPED) throw new Error("not stopped");
	if (this.closed_loop) this.closed_loop.start();
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
		if (g_selected_touchable !== null) throw new Error("not null"); // assert
		if (inside(this.shapes, x, y)) {
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
			if (inside(this.shapes, x, y)) {
		 		this.state = CLOSING_OP;
			} else {
				this.state = CLOSING_NOOP;
			}
		} else {
			if (inside(this.shapes, x, y)) {
				closing_end.call(this);
			} else {
				// noop
			}
			this.state = CLOSED;
		}
	} else if (this.state === CLOSING_OP) {
		// do nothing
	} else if (this.state === CLOSING_NOOP) {
		// do nothing
	} else {
		throw new Error("unknown state");
	}
	return true;
};

window.g_create_area = function(shapes, images, dx = 0, dy = 0) {
	const frames = images.map(i => new c_frame(i));
	const opening_once = new c_once(frames.slice(1, -1), 1000, dx, dy);
	const opened_loop  = new c_loop(frames.slice(-1), 1000, dx, dy);
	const closing_once = new c_once(frames.slice(1, -1).reverse(), 1000, dx, dy);
	const closed_loop  = new c_loop(frames.slice(0, 1), 1000, dx, dy);
	return new c_area(shapes, opening_once, opened_loop, closing_once, closed_loop);
};
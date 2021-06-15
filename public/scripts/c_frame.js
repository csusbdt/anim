export function c_frame(image, duration = 1/8, x = 0, y = 0) {
	this.image = image;
	this.duration = duration;
	this.x = x;
	this.y = y;
}

c_frame.prototype.draw = function(ctx, dx = 0, dy = 0) {
	ctx.drawImage(
		this.image, 
		0, 
		0, 
		this.image.width, 
		this.image.height, 
		this.x + dx, 
		this.y + dy, 
		this.image.width, 
		this.image.height);
};

window.g_frame = function(image, duration = 1/8, x = 0, y = 0) {
	return new c_frame(image, duration, x, y);
};

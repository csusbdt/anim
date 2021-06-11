export function c_frame(image, duration = g_spf) {
	this.image = image;
	if (duration === undefined) {
		this.duration = g_spf;
	} else {
		this.duration = duration;
	}
}

c_frame.prototype.draw = function(ctx, dx = 0, dy = 0) {
	ctx.drawImage(
		this.image, 
		0, 
		0, 
		this.image.width, 
		this.image.height, 
		dx, 
		dy, 
		this.image.width, 
		this.image.height);
};

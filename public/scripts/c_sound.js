function c_sound(file, volume = 1) {
	this.file   = file;
	this.volume = volume;
}

c_sound.prototype.start = function() {
	log(this.file);
};

window.g_sound = function(file, volume = 1) {
	return new c_sound(file, volume);
};

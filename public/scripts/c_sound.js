function c_sound(audio_element) {
	this.audio_element = audio_element;
}

c_sound.prototype.start = function() {
	this.audio_element.play();
};

window.g_sound = function(audio_element) {
	return new c_sound(audio_element);
};

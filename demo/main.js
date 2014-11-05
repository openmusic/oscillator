var Oscillator = require('../');

// register the oscilloscope component so we can use it
require('openmusic-oscilloscope').register('openmusic-oscilloscope');


var ac = new AudioContext();
var osc = Oscillator(ac);
var analyser = ac.createAnalyser();
var oscilloscope = document.querySelector('openmusic-oscilloscope');

osc.connect(analyser);
osc.frequency.setValueAtTime(220, ac.currentTime);
analyser.connect(ac.destination);

oscilloscope.attachTo(analyser);

var waves = ['square', 'sine', 'triangle', 'sawtooth'];
var waveIndex = 0;

function trigger() {
	osc.type = waves[ ++waveIndex % waves.length ];
	console.log('triggering', osc.type);
	osc.start();
}

setInterval(trigger, 1000);

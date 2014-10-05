var Oscillator = require('../Oscillator');

// register the oscilloscope component so we can use it
require('openmusic-oscilloscope').register('openmusic-oscilloscope');


var ac = new AudioContext();
var osc = Oscillator(ac);
var analyser = ac.createAnalyser();
var oscilloscope = document.querySelector('openmusic-oscilloscope');

osc.connect(analyser);
analyser.connect(ac.destination);

osc.start();

oscilloscope.attachTo(analyser);

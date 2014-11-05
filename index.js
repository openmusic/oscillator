(function() {

	var DCBias = require('openmusic-dcbias');

	function Oscillator(context) {
		
		var node = context.createGain();
		var oscillator;
		var frequencySignal;

		frequencySignal = DCBias(context);
		node.frequency = frequencySignal.gain;
		node.frequency.setValueAtTime(440, context.currentTime);

		//initialiseOscillator();

		node.start = function(when) {

			// Disconnect if existing
			if(oscillator) {
				oscillator.removeEventListener('ended', onEnded);
				oscillator.disconnect(node);
				oscillator = null;
			}

			initialiseOscillator();

			oscillator.start(when);
		};

		node.stop = function(when) {
			oscillator.stop(when);
		};

		node.cancelScheduledEvents = function(when) {
			// automated params:
			node.frequency.cancelScheduledEvents(when);
		};

		return node;

		// ~~~

		function initialiseOscillator() {
			oscillator = context.createOscillator();
			// TODO copy type, props
			oscillator.addEventListener('ended', onEnded);
			oscillator.connect(node);

			oscillator.frequency.setValueAtTime(0, context.currentTime);
			frequencySignal.connect(oscillator.frequency);
		}

		function onEnded(e) {
			var t = e.target;
			t.disconnect(node);
			frequencySignal.disconnect(t.frequency);
			initialiseOscillator();
		}

	}

	//
	
	if(typeof module !== 'undefined' && module.exports) {
		module.exports = Oscillator;
	} else {
		this.Oscillator = Oscillator;
	}

}).call(this);

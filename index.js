(function() {

	var DCBias = require('openmusic-dcbias');

	function Oscillator(context) {
		
		var node = context.createGain();
		var oscillator;
		var frequencySignal;
		var properties = {};

		frequencySignal = DCBias(context);
		node.frequency = frequencySignal.gain;
		node.frequency.setValueAtTime(440, context.currentTime);

		['type'].forEach(function(name) {
			Object.defineProperty(node, name, makePropertyGetterSetter(name));
		});

		node.start = function(when) {

			deinitialiseOscillator();

			initialiseOscillator();

			when = when !== undefined ? when : context.currentTime;

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
			oscillator.addEventListener('ended', onEnded);
			oscillator.connect(node);

			Object.keys(properties).forEach(function(name) {
				oscillator[name] = properties[name];
			});

			oscillator.frequency.setValueAtTime(0, context.currentTime);
			frequencySignal.connect(oscillator.frequency);
		}

		function deinitialiseOscillator() {
			if(oscillator) {
				oscillator.removeEventListener('ended', onEnded);
				oscillator.disconnect(node);
				frequencySignal.disconnect(oscillator.frequency);
				oscillator = null;
			}
		}

		function onEnded(e) {
			deinitialiseOscillator();
		}

		function makePropertyGetterSetter(property) {
			return {
				get: function() {
					return getProperty(property);
				},
				set: function(v) {
					setProperty(property, v);
				},
				enumerable: true
			};
		}

		function getProperty(name) {
			return properties[name];
		}

		function setProperty(name, value) {
			properties[name] = value;
			if(oscillator) {
				oscillator[name] = value;
			}
		}

	}

	//
	
	if(typeof module !== 'undefined' && module.exports) {
		module.exports = Oscillator;
	} else {
		this.Oscillator = Oscillator;
	}

}).call(this);


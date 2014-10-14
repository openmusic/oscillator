# openmusic-oscillator

> An immortal oscillator

[![Install with NPM](https://nodei.co/npm/openmusic-oscillator.png?downloads=true&stars=true)](https://nodei.co/npm/openmusic-oscillator/)

## Demo

** YOU NEED SUPPORT FOR WEB COMPONENTS IN YOUR BROWSER BECAUSE WE'RE NOT SHIMMING ANYTHING IN **

Firefox: go to `about:config`, find `dom.webcomponents.enabled` and set it to true.

Chrome: maybe nothing to do?

Run `npm install` so it installs stuff for the demo. The `gulp build` script will be run for you automatically, and then you can open `build/demo/index.html` for the demo.

If you do changes in the code, you'll need to rebuild the demo. Use `gulp build` or `gulp` only for running `build` and setting up a `watch` loop that automatically rebuilds the demo as you change its files.

## Usage

Install first: `npm install openmusic-oscillator`.

Then you can use it in your code:

```javascript
var Oscillator = require('openmusic-oscillator');
var audioContext = new AudioContext();
var osc = Oscillator(audioContext);

osc.connect(audioContext.destination);
osc.start();
```

## TO DO

- explain more of the features
	- frequency
	- event scheduling
	- start/stop/clearSchedule
- demo the features

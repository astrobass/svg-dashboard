const DialHalfBasic = require('./DialHalfBasic');
const DialFullBasic = require('./DialFullBasic');
const DialFullBeamer = require('./DialFullBeamer');

module.exports.DialHalfBasic = new DialHalfBasic();

//module.exports.DialFullBasic = new DialFullBasic();
//module.exports.DialFullBeamer = new DialFullBeamer();

/*
function Svgdash() {

	this.DialHalfBasic = DialHalfBasic;

	console.log('DialHalfBasic ' + DialHalfBasic);

	let dial = new DialHalfBasic({
		'containerId': document.getElementById('dial1-div'),
		'minValue': 0,
		'maxValue': 120,
		'backgroundColor': 'darkblue',
		'trimColor': '#551111',
		'needleColor': 'orange',
		'markerBackgroundColor': '#000044',
		'normalColor': 'green',
		'warningColor': 'red'
	});
};

module.exports = Svgdash;
*/
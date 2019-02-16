const Svgdash = require('../dist/Svgdash');
//const svgdash = new Svgdash();
//console.log('Svgdash ' + Svgdash);
console.log('Svgdash.DialHalfBasic ' + Svgdash.DialHalfBasic);
let DialHalfBasic = Svgdash.DialHalfBasic;

//      import { DialHalfBasic } from 'svgdash.js';
//      import { DialFullBasic } from 'svgdash.js';
//      import { DialFullBeamer } from 'svgdash.js';

      let dials = [];
      let values = [];

      dials[0] = new DialHalfBasic({
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
      dials[1] = new DialHalfBasic({
        'containerId': document.getElementById('dial2-div'),
        'minValue': 0,
        'maxValue': 120,
        'backgroundColor': '#111111',
        'trimColor': 'black',
        'needleColor': 'red',
        'markerBackgroundColor': 'black',
        'normalColor': '#114411',
        'warningColor': 'darkred'
      });
      values[0] = 0;
      values[1] = 0;

      setInterval(function() {
        for (let i = 0; i < dials.length; i += 1 ) {
          values[i] = (values[i] + -2 + Math.random() * 8) % 120;
          values[i] = values[i] > 0 ? values[i] : 0;
          dials[i].set(values[i]);
        }
      }, 200);
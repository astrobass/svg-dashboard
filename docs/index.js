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

dials[2] = new DialFullBasic({
  'containerId': document.getElementById('dial3-div'),
  'minValue': 0,
  'maxValue': 120,
  'backgroundColor': 'darkblue',
  'trimColor': 'darkred',
  'needleColor': 'darkred',
  'markerBackgroundColor': '#333333',
  'normalColor': 'green',
  'warningColor': 'red'
});

dials[3] = new DialFullBasic({
  'containerId': document.getElementById('dial4-div'),
  'minValue': 0,
  'maxValue': 120,
  'backgroundColor': 'darkblue',
  'trimColor': 'darkred',
  'needleColor': 'darkred',
  'markerBackgroundColor': '#333333',
  'normalColor': 'green',
  'warningColor': 'red'
});

dials[4] = new DialFullBeamer({
  'containerId': document.getElementById('dial5-div'),
  'range': [0, 120],
  'angleRange': [-30, 210],
  'backgroundColor': [20, 20, 20],
  'foregroundColor': [150, 150, 255],
  'brightness': 0.9,
  'diameter': 400
});
values[0] = 0;
values[1] = 0;
values[2] = 0;
values[3] = 0;
values[4] = 0;

setInterval(function() {
  for (let i = 0; i < dials.length; i += 1 ) {
    values[i] = (values[i] + -2 + Math.random() * 8) % 120;
    values[i] = values[i] > 0 ? values[i] : 0;
    dials[i].set(values[i]);
  }
}, 200);

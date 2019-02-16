import { DialHalfBasic } from './svgdash.js';
import { DialFullBasic } from './svgdash.js';
import { DialFullBeamer } from './svgdash.js';

function svgdash() {
};

svgdash.DialHalfBasic = DialHalfBasic;
svgdash.DialFullBasic = DialFullBasic;
svgdash.DialFullBeamer = DialFullBeamer;

export default svgdash;

/*
const dialElements = document.getElementsByClassName('dial-full');
const dialBeamerElements = document.getElementsByClassName('dial-full-beamer');
let dials = [];
let dialsBeamer = [];

for (let i=0; i<dialElements.length; i++) {
  const optionsString = dialElements[i].getAttribute('dash-options');
  const element = document.getElementById(dialElements[i].id);
  console.log(optionsString);
  dials[i] = new DialFullBasic(element, optionsString);
}

for (let i=0; i<dialBeamerElements.length; i++) {
  const optionsString = dialBeamerElements[i].getAttribute('dash-options');
  const element = document.getElementById(dialBeamerElements[i].id);
  console.log(optionsString);
  dials[i] = new DialFullBeamer(element, optionsString);
}
*/
function DialFullBeamer(options) {
  this.element = options.containerId;
  this.range = options.range || [0, 100];
  this.angleRange = options.angleRange || [0, 360];
  this.backgroundColor = options.backgroundColor || [200, 200, 200];
  this.foregroundColor = options.foregroundColor || [150, 150, 255];
  this.brightness = options.brightness || 1;
  this.diameter = options.diameter || 300;
  this.strokeWidth = 2;
  this.needleWidth = 6;
  this.markerWidth = 1;
  this.outerCircleWidth = 3;
  this.markerHeightMajor = 10;
  this.markerHeightMinor = 4;
  this.markerFontSize = Math.floor(this.diameter * 0.05);
  this.markerFontFamily = 'Arial, Helvetica, sans-serif';
  this.numMarkers = 61;
  this.markerDefaultColor = '#cdcdcd';
  this.width = this.diameter * 1.2;
  this.height = this.width;
  this.outerRadius = this.diameter / 2;
  this.outerRingRadius = this.diameter / 2 * 0.8;
  this.innerRadius = this.diameter / 2 * 0.3;
  this.markerRadius = this.outerRingRadius * 1.02;
  this.textRadius = this.outerRingRadius * 0.86;
  this.startMx = (this.width - this.markerRadius * 2) / 2;
  this.startY = this.height / 2;
  this.startTx = (this.width - this.textRadius * 2) / 2;
  this.startTy = this.height / 2;
  this.markers = [];
  this.document = this.element.ownerDocument;
  this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  this.svgNS = this.svg.namespaceURI;
  this.needle = document.createElementNS(this.svgNS, 'polygon');
  this.glass = document.createElementNS(this.svgNS, 'rect');
  this.gMarkers = document.createElementNS(this.svgNS, 'g');
  this.gGlass = document.createElementNS(this.svgNS, 'g');
  this.defs = document.createElementNS(this.svgNS, 'defs');
  this.prevTextIndex = 0;
  this.texts = [];
  this.textNodes = [];
  this.needleString = `${Math.floor(this.width / 2 + this.innerRadius)}, ${Math.floor(this.height / 2 + this.needleWidth / 2)} \
    ${Math.floor(this.width / 2 + this.innerRadius)}, ${Math.floor(this.height / 2 - this.needleWidth / 2)} \
    ${Math.floor(this.width / 2 - this.outerRingRadius)}, ${Math.floor(this.height / 2)}`;

  let circle;
  let x;
  let y;
  let tx;
  let ty;
  let markerAngle;
  let markerRadians;
  let prevTextIndex = 0;
  let textIndex;

  function getGlowFilter(filterName, floodColor, morphologyRadius, gaussianStdDeviation) {
    filter = document.createElementNS(this.svgNS, 'filter');
    morphology = document.createElementNS(this.svgNS, 'feMorphology');
    flood = document.createElementNS(this.svgNS, 'feFlood');
    composite = document.createElementNS(this.svgNS, 'feComposite');
    gaussian = document.createElementNS(this.svgNS, 'feGaussianBlur');
    merge = document.createElementNS(this.svgNS, 'feMerge');
    mergeNode1 = document.createElementNS(this.svgNS, 'feMergeNode');
    mergeNode2 = document.createElementNS(this.svgNS, 'feMergeNode');

    filter.setAttribute('id', filterName);
    filter.setAttribute('x', '-400%');
    filter.setAttribute('y', '-400%');
    filter.setAttribute('width', '900%');
    filter.setAttribute('height', '900%');
    morphology.setAttribute('operator', 'dilate');
    morphology.setAttribute('radius', morphologyRadius);
    morphology.setAttribute('in', 'SourceAlpha');
    morphology.setAttribute('result', 'thicken');
    filter.appendChild(morphology);
    gaussian.setAttribute('in', 'thicken');
    gaussian.setAttribute('stdDeviation', gaussianStdDeviation);
    gaussian.setAttribute('result', 'blurred');
    filter.appendChild(gaussian);
    flood.setAttribute('result', 'glowColor');
    flood.setAttribute('flood-color', `rgb(${floodColor[0]}, ${floodColor[1]}, ${floodColor[2]})`);
    filter.appendChild(flood);
    composite.setAttribute('in', 'glowColor');
    composite.setAttribute('in2', 'blurred');
    composite.setAttribute('operator', 'in');
    composite.setAttribute('result', 'softGlow_colored');
    filter.appendChild(composite);
    mergeNode1.setAttribute('in', 'softGlow_colored');
    merge.appendChild(mergeNode1);
    mergeNode2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mergeNode2);
    filter.appendChild(merge);

    return filter;
  }

  function getGlassFilter(filterName) {
    filter = document.createElementNS(this.svgNS, 'filter');
    //flood = document.createElementNS(svgNS, 'feFlood');
    turbulance = document.createElementNS(this.svgNS, 'feTurbulence');
    colorMatrix = document.createElementNS(this.svgNS, 'feColorMatrix');
    composite = document.createElementNS(this.svgNS, 'feComposite');
    merge = document.createElementNS(this.svgNS, 'feMerge');
    mergeNode1 = document.createElementNS(this.svgNS, 'feMergeNode');
    mergeNode2 = document.createElementNS(this.svgNS, 'feMergeNode');

    filter.setAttribute('id', filterName);
    filter.setAttribute('filterUnits', 'userSpaceOnUse');
    filter.setAttribute('x', 0);
    filter.setAttribute('y', 0);
    filter.setAttribute('width', this.width);
    filter.setAttribute('height', this.height);
    turbulance.setAttribute('baseFrequency', '.002,.004');
    turbulance.setAttribute('top', '-50%');
    turbulance.setAttribute('type', 'fractalNoise');
    turbulance.setAttribute('numOctaves', 4);
    turbulance.setAttribute('seed', 0);
    turbulance.setAttribute('result', 'FRACTAL-TEXTURE_10');
    filter.appendChild(turbulance);
    colorMatrix.setAttribute('in', 'FRACTAL-TEXTURE_10');
    colorMatrix.setAttribute('type', 'matrix');
    colorMatrix.setAttribute('values', '0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.2 1.1');
    colorMatrix.setAttribute('result', 'FRACTAL-TEXTURE_20');
    filter.appendChild(colorMatrix);
    composite.setAttribute('in', 'BackgroundImage');
    composite.setAttribute('in2', 'FRACTAL-TEXTURE_20');
    composite.setAttribute('operator', 'in');
    composite.setAttribute('result', 'comp');
    filter.appendChild(composite);
    mergeNode1.setAttribute('in', 'comp');
    merge.appendChild(mergeNode1);
    mergeNode2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mergeNode2);
    filter.appendChild(merge);

    return filter;
  }

  this.svg.setAttribute('style', 'display: block; margin: auto');
  this.svg.setAttribute('width', this.width);
  this.svg.setAttribute('height', this.height);
  this.svg.setAttribute('viewBox', `${0} ${0} ${this.width} ${this.height}`);

  // SVG Defs

  this.defs.appendChild(getGlowFilter('innercircle-filter', this.foregroundColor, 5 * this.brightness, 12 * this.brightness));
  this.defs.appendChild(getGlowFilter('outercircle-filter', this.backgroundColor, 4 * this.brightness, 10 * this.brightness));
  this.defs.appendChild(getGlowFilter('marker-filter', `rgb(255 * ${this.brightness}, 255 * ${this.brightness}, 255 * ${this.brightness})`, 3 * this.brightness, 6 * this.brightness));
  this.defs.appendChild(getGlowFilter('ring-filter', this.foregroundColor, 4 * this.brightness, 10 * this.brightness));
  this.defs.appendChild(getGlassFilter('glass-filter'));

  this.svg.appendChild(this.defs);

  // Draw outer circle

  this.circle = document.createElementNS(this.svgNS, 'circle');
  this.circle.setAttribute('cx', this.width / 2);
  this.circle.setAttribute('cy', this.height / 2);
  this.circle.setAttribute('r', this.outerRadius);
  this.circle.setAttribute('fill', `rgb(${this.backgroundColor[0]}, ${this.backgroundColor[1]}, ${this.backgroundColor[2]})`);
  this.circle.setAttribute('stroke', this.markerDefaultColor);
  this.circle.setAttribute('stroke-width', this.outerCircleWidth);
  //this.circle.setAttribute('filter', 'url(#outercircle-filter)');
  this.svg.appendChild(this.circle);

  // Draw outer ring circle

  this.circle = document.createElementNS(this.svgNS, 'circle');
  this.circle.setAttribute('cx', this.width / 2);
  this.circle.setAttribute('cy', this.height / 2);
  this.circle.setAttribute('r', this.outerRingRadius);
  this.circle.setAttribute('stroke', this.markerDefaultColor);
  this.circle.setAttribute('stroke-width', this.strokeWidth);
  this.circle.setAttribute('fill', `rgb(${this.backgroundColor[0]}, ${this.backgroundColor[1]}, ${this.backgroundColor[2]})`);
  //this.circle.setAttribute('filter', 'url(#ring-filter)');
  this.svg.appendChild(this.circle);

  // Draw markers

  this.gMarkers.setAttribute('id', 'markers');
  for (let i = 0; i < this.numMarkers; i += 1) {
    this.markers[i] = document.createElementNS(this.svgNS, 'rect');
    markerAngle = this.angleRange[0] + i * (this.angleRange[1] - this.angleRange[0]) / (this.numMarkers - 1);
    markerRadians = -Math.PI + 2 * Math.PI * markerAngle / 360;
    x = Math.round((this.startMx + this.markerRadius
      + this.markerRadius * Math.cos(markerRadians)) * 100) / 100;
    y = Math.trunc((this.startY
      + this.markerRadius * Math.sin(markerRadians)) * 100) / 100;

    this.markers[i].setAttribute('x', x);
    this.markers[i].setAttribute('y', y);
    this.markers[i].setAttribute('width', this.markerWidth);
    if (i % 5 === 0) {
      this.markers[i].setAttribute('height', this.markerHeightMajor);
    } else {
      this.markers[i].setAttribute('height', this.markerHeightMinor);
    }
    this.markers[i].setAttribute('transform', `rotate(${markerAngle + 90}, ${x}, ${y})`);
    this.markers[i].setAttribute('fill', this.markerDefaultColor);
    this.markers[i].setAttribute('stroke', this.markerDefaultColor);
    //this.markers[i].setAttribute('filter', 'url(#marker-filter)');
    this.gMarkers.appendChild(this.markers[i]);

    if (i % 5 === 0) {
      tx = Math.round((this.startTx + this.textRadius + this.textRadius * Math.cos(markerRadians)) * 100) / 100;
      ty = Math.trunc((this.startTy + this.textRadius * Math.sin(markerRadians)) * 100) / 100;
      this.texts[i] = document.createElementNS(this.svgNS, 'text');
      this.texts[i].setAttribute('id', `markerText ${i}`);
      this.texts[i].setAttribute('x', tx);
      this.texts[i].setAttribute('y', ty);
      this.texts[i].setAttribute('font-size', this.markerFontSize);
      this.texts[i].setAttribute('font-family', this.markerFontFamily);
      this.texts[i].setAttribute('fill', 'white');
      this.texts[i].setAttribute('text-anchor', 'middle');
      this.texts[i].setAttribute('alignment-baseline', 'middle');
      //this.texts[i].setAttribute('filter', 'url(#marker-filter)');
      this.textNodes[i] = document.createTextNode('');
      this.textNodes[i].nodeValue = this.range[0] + i * (this.range[1] - this.range[0]) / (this.numMarkers - 1);
      this.texts[i].appendChild(this.textNodes[i]);
      this.gMarkers.appendChild(this.texts[i]);
    }
  }
  this.svg.appendChild(this.gMarkers);

  // Draw inner circle

  this.circle = document.createElementNS(this.svgNS, 'circle');
  this.circle.setAttribute('cx', this.width / 2);
  this.circle.setAttribute('cy', this.height / 2);
  this.circle.setAttribute('r', this.innerRadius);
  this.circle.setAttribute('fill', `rgb(${this.backgroundColor[0]}, ${this.backgroundColor[1]}, ${this.backgroundColor[2]})`);
  //this.circle.setAttribute('filter', 'url(#innercircle-filter)');
  this.svg.appendChild(this.circle);

  // Draw needle

  this.needle.setAttribute('id', 'needle');
  this.needle.setAttribute('points', this.needleString);
  this.needle.setAttribute('fill', `rgb(${this.foregroundColor[0]}, ${this.foregroundColor[1]}, ${this.foregroundColor[2]})`);
  this.needle.setAttribute('transform', `rotate(${this.angleRange[0]}, ${this.width / 2}, ${this.height / 2})`);
  this.svg.appendChild(this.needle);

  // Draw glass

  this.gGlass.setAttribute('id', 'glass');
  this.gGlass.setAttribute('opacity', 0.5);
  //this.gGlass.setAttribute('filter', 'url(#glass-filter)');
  this.svg.appendChild(this.gGlass);

  this.element.appendChild(this.svg);
}

DialFullBeamer.prototype.set = function(value) {
  this.texts[this.prevTextIndex].setAttribute('font-size', this.markerFontSize);
  textIndex = 5 * Math.round(this.numMarkers * (value - this.range[0]) / (this.range[1] - this.range[0]) / 5);
  this.prevTextIndex = textIndex;
  this.texts[textIndex].setAttribute('font-size', Math.floor(this.markerFontSize * 1.6));
  angle = this.angleRange[0] + (this.angleRange[1] - this.angleRange[0]) * (value - this.range[0])
    / (this.range[1] - this.range[0]);
  this.needle.setAttribute('transform', `rotate(${angle}, ${this.width / 2}, ${this.height / 2})`);
};

module.exports = DialFullBeamer;
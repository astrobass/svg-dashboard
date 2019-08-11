function DialFullBasic(options) {
  this.strokeWidth = 2;
  this.needleWidth = 6;
  this.markerWidth = 3;
  this.width = 300;
  this.height = this.width;
  this.outerRadius = this.width / 2 * 0.95;
  this.middleRadius = this.width / 2 * 0.75;
  this.innerRadius = this.width / 2 * 0.25;
  this.markerRadius = this.middleRadius * 1.07;
  this.markerRadiusMajor = this.middleRadius * 1.20;
  this.markerRadiusMinor = this.middleRadius * 1.13;
  this.textRadius = this.middleRadius * 0.9;
  this.startMx = (this.width - this.markerRadius * 2) / 2;
  this.startLx = (this.width - this.markerRadiusMajor * 2) / 2;
  this.startLMinorx = (this.width - this.markerRadiusMinor * 2) / 2;
  this.startY = this.height / 2;
  this.startTx = (this.width - this.textRadius * 2) / 2;
  this. startTy = this.height / 2;
  this.needleString = `M ${(this.width / 2)} ${(this.height / 2 + this.needleWidth / 2)} L${(this.width / 2)} ${(this.height / 2 - this.needleWidth / 2)} L${(this.width / 2 - this.middleRadius)} ${this.height / 2}z`;
  this.element = options.containerId;
  this.noColor = '#cdcdcd';
  this.paths = [];
  this.numMarkers = 61;
  this.redMarkers = Math.floor(this.numMarkers * 0.8);
  this.document = this.element.ownerDocument;
  this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  this.svgNS = this.svg.namespaceURI;
  this.needle = document.createElementNS(this.svgNS, 'path');
  this.text = document.createElementNS(this.svgNS, 'text');
  this.textNode = document.createTextNode('');
  this.g = document.createElementNS(this.svgNS, 'g');
  this.texts = [];
  this.textNodes = [];
  this.min = options.minValue || 0;
  this.max = options.maxValue || 100;
  this.middleCircleFillColor = options.backgroundColor || '#2a2a2a';
  this.innerCircleFillColor = options.trimColor || '#660000';
  this.circleStrokeColor = options.trimColor || '#660000';
  this.needleColor = options.needleColor || '#da1b27';
  this.markerBackgroundColor = options.markerBackgroundColor || '#2a2a2a';
  this.normalColor = options.normalColor || 'green';
  this.warningColor = options.warningColor || 'red';

  let circle;
  let mx;
  let my;
  let lx;
  let ly;
  let tx;
  let ty;
  let pathString = '';


  // Set up SVG

  this.svg.setAttribute('width', this.width);
  this.svg.setAttribute('height', this.height);
  this.svg.setAttribute('viewBox', `${0} ${0} ${this.width} ${this.height}`);

  // SVG Defs

  // Draw elements

  // Draw outer circle

  this.circle = document.createElementNS(this.svgNS, 'circle');
  this.circle.setAttribute('cx', this.width / 2);
  this.circle.setAttribute('cy', this.height / 2);
  this.circle.setAttribute('r', this.outerRadius);
  this.circle.setAttribute('fill', this.markerBackgroundColor);
  this.svg.appendChild(this.circle);

  // Draw middle circle

  this.circle = document.createElementNS(this.svgNS, 'circle');
  this.circle.setAttribute('cx', this.width / 2);
  this.circle.setAttribute('cy', this.height / 2);
  this.circle.setAttribute('r', this.middleRadius);
  this.circle.setAttribute('stroke', this.circleStrokeColor);
  this.circle.setAttribute('stroke-width', this.strokeWidth);
  this.circle.setAttribute('fill', this.middleCircleFillColor);
  this.svg.appendChild(this.circle);

  // Draw markers

  this.g.setAttribute('id', 'markers');
  for (let i = 0; i < this.numMarkers; i += 1) {
    this.paths[i] = document.createElementNS(this.svgNS, 'path');
    mx = Math.round((this.startMx + this.markerRadius
      + this.markerRadius * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
    my = Math.trunc((this.startY
      + this.markerRadius * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
    if (i % 5 == 0) {
      lx = Math.round((this.startLx + this.markerRadiusMajor
        + this.markerRadiusMajor * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
      ly = Math.trunc((this.startY
        + this.markerRadiusMajor * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
    } else {
      lx = Math.round((this.startLMinorx + this.markerRadiusMinor
        + this.markerRadiusMinor * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
      ly = Math.trunc((this.startY
        + this.markerRadiusMinor * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
    }
    pathString = `M ${mx} ${my} L${lx} ${ly}`;
    this.paths[i].setAttribute('d', pathString);
    this.paths[i].setAttribute('stroke', this.noColor);
    this.paths[i].setAttribute('stroke-width', this.markerWidth);
    this.g.appendChild(this.paths[i]);

    if (i % 5 == 0) {
      tx = Math.round((this.startTx + this.textRadius
        + this.textRadius * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
      ty = Math.trunc((this.startTy
        + this.textRadius * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (this.numMarkers + 1))) * 100) / 100;
      this.texts[i] = document.createElementNS(this.svgNS, 'text');
      this.texts[i].setAttribute('id', `markerText ${i}`);
      this.texts[i].setAttribute('x', tx);
      this.texts[i].setAttribute('y', ty);
      this.texts[i].setAttribute('font-size', 12);
      this.texts[i].setAttribute('font-family', 'sans-serif');
      this.texts[i].setAttribute('fill', 'black');
      this.texts[i].setAttribute('stroke', 'white');
      this.texts[i].setAttribute('text-anchor', 'middle');
      this.texts[i].setAttribute('alignment-baseline', 'middle');
      this.textNodes[i] = document.createTextNode('');
      this.textNodes[i].nodeValue = this.min + i * (this.max - this.min) / (this.numMarkers - 1);
      this.texts[i].appendChild(this.textNodes[i]);
      this.g.appendChild(this.texts[i]);
    }
  }
  this.svg.appendChild(this.g);

  // Draw needle

  this.needle.setAttribute('id', 'needle');
  this.needle.setAttribute('d', this.needleString);
  this.needle.setAttribute('fill', this.needleColor);
  this.needle.setAttribute('stroke', 5);
  this.svg.appendChild(this.needle);

  // Draw inner circle

  this.circle = document.createElementNS(this.svgNS, 'circle');
  this.circle.setAttribute('cx', this.width / 2);
  this.circle.setAttribute('cy', this.height / 2);
  this.circle.setAttribute('r', this.innerRadius);
  this.circle.setAttribute('fill', this.innerCircleFillColor);
  this.svg.appendChild(this.circle);

  // Draw value

  this.text.setAttribute('id', 'valueText');
  this.text.setAttribute('x', '50%');
  this.text.setAttribute('y', '50%');
  this.text.setAttribute('font-size', 20);
  this.text.setAttribute('font-family', 'sans-serif');
  this.text.setAttribute('fill', 'white');
  this.text.setAttribute('stroke', 'white');
  this.text.setAttribute('text-anchor', 'middle');
  this.text.setAttribute('alignment-baseline', 'middle');
  this.text.appendChild(this.textNode);
  this.svg.appendChild(this.text);

  this.element.appendChild(this.svg);
}

DialFullBasic.prototype.set = function(value) {
  this.angle = 360 * (value - this.min) / (this.max - this.min);
  this.colorMarkers = Math.floor(this.angle / 360 * this.numMarkers);
  this.needle.setAttribute('transform', `rotate(${this.angle}, ${this.width / 2}, ${this.height / 2})`);
  this.textNode.nodeValue = Math.floor(value);
  for (let i = 0; i < this.numMarkers; i += 1) {
    if (i <= this.colorMarkers) {
      if (i >= this.redMarkers) {
        this.paths[i].setAttribute('stroke', this.warningColor);
      } else {
        this.paths[i].setAttribute('stroke', this.normalColor);
      }
    } else {
      this.paths[i].setAttribute('stroke', this.noColor);
    }
  }
};

module.exports = DialFullBasic;
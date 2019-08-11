function DialHalfBasic(options) {
    const strokeWidth = 2;
    const needleWidth = 6;
    const markerWidth = 3;
    const numMarkers = 61;
    const redMarkers = Math.floor(numMarkers * 0.8);
    const noColor = '#cdcdcd';
    this.width = 300;
    this.height = this.width / 2;
    const outerRadius = this.width / 2 * 0.95;
    const middleRadius = this.width / 2 * 0.75;
    const innerRadius = this.width / 2 * 0.25;
    const markerRadius = middleRadius * 1.07;
    const markerRadiusMajor = middleRadius * 1.20;
    const markerRadiusMinor = middleRadius * 1.13;
    const textRadius = middleRadius * 0.9;
    const startMx = (this.width - markerRadius * 2) / 2;
    const startY = this.height;
    const startLx = (this.width - markerRadiusMajor * 2) / 2;
    const startLMinorx = (this.width - markerRadiusMinor * 2) / 2;
    const startTx = (this.width - textRadius * 2) / 2;
    const startTy = this.height;
    const paths = [];
    const needleString = `M ${(this.width / 2)} ${(this.height + needleWidth / 2)} L${(this.width / 2)} ${(this.height - needleWidth / 2)} L${(this.width / 2 - middleRadius)} ${this.height}z`;
    const element = options.containerId;
    const document = element.ownerDocument;
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgNS = this.svg.namespaceURI;
    this.needle = document.createElementNS(this.svgNS, 'path');
    this.valueText = document.createElementNS(this.svgNS, 'text');
    this.valueTextNode = document.createTextNode('');
    this.g = document.createElementNS(this.svgNS, 'g');
    const texts = [];
    const textNodes = [];
    this.min = options.minValue || 0;
    this.max = options.maxValue || 100;
    const middleCircleFillColor = options.backgroundColor || '#2a2a2a';
    const innerCircleFillColor = options.trimColor || '#660000';
    const circleStrokeColor = options.trimColor || '#660000';
    const needleColor = options.needleColor || '#da1b27';
    const markerBackgroundColor = options.markerBackgroundColor || '#2a2a2a';
    const normalColor = options.normalColor || 'green';
    const warningColor = options.warningColor || 'red';

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
    this.circle.setAttribute('cy', this.height);
    this.circle.setAttribute('r', outerRadius);
    this.circle.setAttribute('fill', markerBackgroundColor);
    this.svg.appendChild(this.circle);

    // Draw middle circle

    this.circle = document.createElementNS(this.svgNS, 'circle');
    this.circle.setAttribute('cx', this.width / 2);
    this.circle.setAttribute('cy', this.height);
    this.circle.setAttribute('r', middleRadius);
    this.circle.setAttribute('stroke', circleStrokeColor);
    this.circle.setAttribute('stroke-width', strokeWidth);
    this.circle.setAttribute('fill', middleCircleFillColor);
    this.svg.appendChild(this.circle);

    // Draw markers

    this.g.setAttribute('id', 'markers');
    for (let i = 0; i < numMarkers; i += 1) {
      paths[i] = document.createElementNS(this.svgNS, 'path');
      mx = Math.round((startMx + markerRadius
        + markerRadius * Math.cos(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      my = Math.trunc((startY
        + markerRadius * Math.sin(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      if (i % 5 == 0) {
        lx = Math.round((startLx + markerRadiusMajor
          + markerRadiusMajor * Math.cos(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
        ly = Math.trunc((startY
          + markerRadiusMajor * Math.sin(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      } else {
        lx = Math.round((startLMinorx + markerRadiusMinor
          + markerRadiusMinor * Math.cos(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
        ly = Math.trunc((startY
          + markerRadiusMinor * Math.sin(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      }
      pathString = `M ${mx} ${my} L${lx} ${ly}`;
      paths[i].setAttribute('d', pathString);
      paths[i].setAttribute('stroke', noColor);
      paths[i].setAttribute('stroke-width', markerWidth);
      this.g.appendChild(paths[i]);

      if (i % 5 == 0) {
        tx = Math.round((startTx + textRadius
          + textRadius * Math.cos(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
        ty = Math.trunc((startTy
          + textRadius * Math.sin(-Math.PI + Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
        texts[i] = document.createElementNS(this.svgNS, 'text');
        texts[i].setAttribute('id', `markerText ${i}`);
        texts[i].setAttribute('x', tx);
        texts[i].setAttribute('y', ty);
        texts[i].setAttribute('font-size', 12);
        texts[i].setAttribute('font-family', 'sans-serif');
        texts[i].setAttribute('fill', 'black');
        texts[i].setAttribute('stroke', 'white');
        texts[i].setAttribute('text-anchor', 'middle');
        texts[i].setAttribute('alignment-baseline', 'middle');
        textNodes[i] = document.createTextNode('');
        textNodes[i].nodeValue = this.min + i * (this.max - this.min) / (numMarkers - 1);
        texts[i].appendChild(textNodes[i]);
        this.g.appendChild(texts[i]);
      }
    }
    this.svg.appendChild(this.g);

    // Draw needle

    this.needle.setAttribute('id', 'needle');
    this.needle.setAttribute('d', needleString);
    this.needle.setAttribute('fill', needleColor);
    this.needle.setAttribute('stroke', 5);
    this.svg.appendChild(this.needle);

    // Draw inner circle

    this.circle = document.createElementNS(this.svgNS, 'circle');
    this.circle.setAttribute('cx', this.width / 2);
    this.circle.setAttribute('cy', this.height);
    this.circle.setAttribute('r', innerRadius);
    this.circle.setAttribute('fill', innerCircleFillColor);
    this.svg.appendChild(this.circle);

    // Draw value text

    this.valueText.setAttribute('id', 'valueText');
    this.valueText.setAttribute('x', '50%');
    this.valueText.setAttribute('y', this.height * 0.94);
    this.valueText.setAttribute('font-size', 20);
    this.valueText.setAttribute('font-family', 'sans-serif');
    this.valueText.setAttribute('fill', 'white');
    this.valueText.setAttribute('stroke', 'white');
    this.valueText.setAttribute('text-anchor', 'middle');
    this.valueText.setAttribute('alignment-baseline', 'middle');
    this.valueText.appendChild(this.valueTextNode);
    this.svg.appendChild(this.valueText);

    element.appendChild(this.svg);
}

DialHalfBasic.prototype.set = function(value) {
  this.angle = 180 * (value - this.min) / (this.max - this.min);
  const colorMarkers = Math.floor(this.angle / 180 * this.numMarkers);

  this.needle.setAttribute('transform', `rotate(${this.angle}, ${this.width / 2}, ${this.height})`);
  this.valueTextNode.nodeValue = Math.floor(value);
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

module.exports = DialHalfBasic;
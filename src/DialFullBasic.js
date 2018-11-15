function DialFullBasic(options) {
  const strokeWidth = 2;
  const needleWidth = 6;
  const markerWidth = 3;
  const numMarkers = 61;
  const redMarkers = Math.floor(numMarkers * 0.8);
  const noColor = '#cdcdcd';
  const width = 300;
  const height = width;
  const outerRadius = width / 2 * 0.95;
  const middleRadius = width / 2 * 0.75;
  const innerRadius = width / 2 * 0.25;
  const markerRadius = middleRadius * 1.07;
  const markerRadiusMajor = middleRadius * 1.20;
  const markerRadiusMinor = middleRadius * 1.13;
  const textRadius = middleRadius * 0.9;
  const startMx = (width - markerRadius * 2) / 2;
  const startLx = (width - markerRadiusMajor * 2) / 2;
  const startLMinorx = (width - markerRadiusMinor * 2) / 2;
  const startY = height / 2;
  const startTx = (width - textRadius * 2) / 2;
  const startTy = height / 2;
  const paths = [];
  const needleString = `M ${(width / 2)} ${(height / 2 + needleWidth / 2)} L${(width / 2)} ${(height / 2 - needleWidth / 2)} L${(width / 2 - middleRadius)} ${height / 2}z`;
  const element = options.containerId;
  const document = element.ownerDocument;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const svgNS = svg.namespaceURI;
  const needle = document.createElementNS(svgNS, 'path');
  const text = document.createElementNS(svgNS, 'text');
  const textNode = document.createTextNode('');
  const g = document.createElementNS(svgNS, 'g');
  const texts = [];
  const textNodes = [];
  const min = options.minValue || 0;
  const max = options.maxValue || 100;
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

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `${0} ${0} ${width} ${height}`);

  // SVG Defs

  // Draw elements

  // Draw outer circle

  circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', width / 2);
  circle.setAttribute('cy', height / 2);
  circle.setAttribute('r', outerRadius);
  circle.setAttribute('fill', markerBackgroundColor);
  svg.appendChild(circle);

  // Draw middle circle

  circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', width / 2);
  circle.setAttribute('cy', height / 2);
  circle.setAttribute('r', middleRadius);
  circle.setAttribute('stroke', circleStrokeColor);
  circle.setAttribute('stroke-width', strokeWidth);
  circle.setAttribute('fill', middleCircleFillColor);
  svg.appendChild(circle);

  // Draw markers

  g.setAttribute('id', 'markers');
  for (let i = 0; i < numMarkers; i += 1) {
    paths[i] = document.createElementNS(svgNS, 'path');
    mx = Math.round((startMx + markerRadius
      + markerRadius * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
    my = Math.trunc((startY
      + markerRadius * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
    if (i % 5 == 0) {
      lx = Math.round((startLx + markerRadiusMajor
        + markerRadiusMajor * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      ly = Math.trunc((startY
        + markerRadiusMajor * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
    } else {
      lx = Math.round((startLMinorx + markerRadiusMinor
        + markerRadiusMinor * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      ly = Math.trunc((startY
        + markerRadiusMinor * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
    }
    pathString = `M ${mx} ${my} L${lx} ${ly}`;
    paths[i].setAttribute('d', pathString);
    paths[i].setAttribute('stroke', noColor);
    paths[i].setAttribute('stroke-width', markerWidth);
    g.appendChild(paths[i]);

    if (i % 5 == 0) {
      tx = Math.round((startTx + textRadius
        + textRadius * Math.cos(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      ty = Math.trunc((startTy
        + textRadius * Math.sin(-Math.PI + 2 * Math.PI * (i + 1) / (numMarkers + 1))) * 100) / 100;
      texts[i] = document.createElementNS(svgNS, 'text');
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
      textNodes[i].nodeValue = min + i * (max - min) / (numMarkers - 1);
      texts[i].appendChild(textNodes[i]);
      g.appendChild(texts[i]);
    }
  }
  svg.appendChild(g);

  // Draw needle

  needle.setAttribute('id', 'needle');
  needle.setAttribute('d', needleString);
  needle.setAttribute('fill', needleColor);
  needle.setAttribute('stroke', 5);
  svg.appendChild(needle);

  // Draw inner circle

  circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', width / 2);
  circle.setAttribute('cy', height / 2);
  circle.setAttribute('r', innerRadius);
  circle.setAttribute('fill', innerCircleFillColor);
  svg.appendChild(circle);

  // Draw value

  text.setAttribute('id', 'valueText');
  text.setAttribute('x', '50%');
  text.setAttribute('y', '50%');
  text.setAttribute('font-size', 20);
  text.setAttribute('font-family', 'sans-serif');
  text.setAttribute('fill', 'white');
  text.setAttribute('stroke', 'white');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('alignment-baseline', 'middle');
  text.appendChild(textNode);
  svg.appendChild(text);

  element.appendChild(svg);

  this.set = function set(value) {
    const angle = 360 * (value - min) / (max - min);
    const colorMarkers = Math.floor(angle / 360 * numMarkers);
    needle.setAttribute('transform', `rotate(${angle}, ${width / 2}, ${height / 2})`);
    textNode.nodeValue = Math.floor(value);
    for (let i = 0; i < numMarkers; i += 1) {
      if (i <= colorMarkers) {
        if (i >= redMarkers) {
          paths[i].setAttribute('stroke', warningColor);
        } else {
          paths[i].setAttribute('stroke', normalColor);
        }
      } else {
        paths[i].setAttribute('stroke', noColor);
      }
    }
  };
}
export default DialFullBasic;

function DialFullBasic(element, optionsString) {
  const options = JSON.parse(optionsString);
  const range = options.range || [0, 100];
  const angleRange = options.angleRange || [0, 360];
  const backgroundColor = options.backgroundColor || [200, 200, 200];
  const foregroundColor = options.foregroundColor || [150, 150, 255];
  const brightness = options.brightness || 1;
  const diameter = options.diameter || 300;
  const strokeWidth = 2;
  const needleWidth = 6;
  const markerWidth = 1;
  const outerCircleWidth = 3;
  const markerHeightMajor = 10;
  const markerHeightMinor = 4;
  const markerFontSize = Math.floor(diameter * 0.05);
  const markerFontFamily = 'Arial, Helvetica, sans-serif';
  const numMarkers = 61;
  const markerDefaultColor = '#cdcdcd';
  const width = diameter * 1.2;
  const height = width;
  const outerRadius = diameter / 2;
  const outerRingRadius = diameter / 2 * 0.8;
  const innerRadius = diameter / 2 * 0.3;
  const markerRadius = outerRingRadius * 1.02;
  const textRadius = outerRingRadius * 0.86;
  const startMx = (width - markerRadius * 2) / 2;
  const startY = height / 2;
  const startTx = (width - textRadius * 2) / 2;
  const startTy = height / 2;
  const markers = [];
  const document = element.ownerDocument;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const svgNS = svg.namespaceURI;
  const needle = document.createElementNS(svgNS, 'polygon');
  const glass = document.createElementNS(svgNS, 'rect');
  const gMarkers = document.createElementNS(svgNS, 'g');
  const gGlass = document.createElementNS(svgNS, 'g');
  const defs = document.createElementNS(svgNS, 'defs');
  const texts = [];
  const textNodes = [];
  const needleString = `${Math.floor(width / 2 + innerRadius)}, ${Math.floor(height / 2 + needleWidth / 2)} \
    ${Math.floor(width / 2 + innerRadius)}, ${Math.floor(height / 2 - needleWidth / 2)} \
    ${Math.floor(width / 2 - outerRingRadius)}, ${Math.floor(height / 2)}`;

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
    const filter = document.createElementNS(svgNS, 'filter');
    const morphology = document.createElementNS(svgNS, 'feMorphology');
    const flood = document.createElementNS(svgNS, 'feFlood');
    const composite = document.createElementNS(svgNS, 'feComposite');
    const gaussian = document.createElementNS(svgNS, 'feGaussianBlur');
    const merge = document.createElementNS(svgNS, 'feMerge');
    const mergeNode1 = document.createElementNS(svgNS, 'feMergeNode');
    const mergeNode2 = document.createElementNS(svgNS, 'feMergeNode');

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
    const filter = document.createElementNS(svgNS, 'filter');
    // const flood = document.createElementNS(svgNS, 'feFlood');
    const turbulance = document.createElementNS(svgNS, 'feTurbulence');
    const colorMatrix = document.createElementNS(svgNS, 'feColorMatrix');
    const composite = document.createElementNS(svgNS, 'feComposite');
    const merge = document.createElementNS(svgNS, 'feMerge');
    const mergeNode1 = document.createElementNS(svgNS, 'feMergeNode');
    const mergeNode2 = document.createElementNS(svgNS, 'feMergeNode');

    filter.setAttribute('id', filterName);
    filter.setAttribute('filterUnits', 'userSpaceOnUse');
    filter.setAttribute('x', 0);
    filter.setAttribute('y', 0);
    filter.setAttribute('width', width);
    filter.setAttribute('height', height);
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

  svg.setAttribute('style', 'display: block; margin: auto');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `${0} ${0} ${width} ${height}`);

  // SVG Defs

  defs.appendChild(getGlowFilter('innercircle-filter', foregroundColor, 5 * brightness, 12 * brightness));
  defs.appendChild(getGlowFilter('outercircle-filter', backgroundColor, 4 * brightness, 10 * brightness));
  defs.appendChild(getGlowFilter('marker-filter', `rgb(255 * ${brightness}, 255 * ${brightness}, 255 * ${brightness})`, 3 * brightness, 6 * brightness));
  defs.appendChild(getGlowFilter('ring-filter', foregroundColor, 4 * brightness, 10 * brightness));
  defs.appendChild(getGlassFilter('glass-filter'));

  svg.appendChild(defs);

  // Draw outer circle

  circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', width / 2);
  circle.setAttribute('cy', height / 2);
  circle.setAttribute('r', outerRadius);
  circle.setAttribute('fill', `rgb(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`);
  circle.setAttribute('stroke', markerDefaultColor);
  circle.setAttribute('stroke-width', outerCircleWidth);
  circle.setAttribute('filter', 'url(#outercircle-filter)');
  svg.appendChild(circle);

  // Draw outer ring circle

  circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', width / 2);
  circle.setAttribute('cy', height / 2);
  circle.setAttribute('r', outerRingRadius);
  circle.setAttribute('stroke', markerDefaultColor);
  circle.setAttribute('stroke-width', strokeWidth);
  circle.setAttribute('fill', `rgb(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`);
  circle.setAttribute('filter', 'url(#ring-filter)');
  svg.appendChild(circle);

  // Draw markers

  gMarkers.setAttribute('id', 'markers');
  for (let i = 0; i < numMarkers; i += 1) {
    markers[i] = document.createElementNS(svgNS, 'rect');
    markerAngle = angleRange[0] + i * (angleRange[1] - angleRange[0]) / (numMarkers - 1);
    markerRadians = -Math.PI + 2 * Math.PI * markerAngle / 360;
    x = Math.round((startMx + markerRadius
      + markerRadius * Math.cos(markerRadians)) * 100) / 100;
    y = Math.trunc((startY
      + markerRadius * Math.sin(markerRadians)) * 100) / 100;

    markers[i].setAttribute('x', x);
    markers[i].setAttribute('y', y);
    markers[i].setAttribute('width', markerWidth);
    if (i % 5 === 0) {
      markers[i].setAttribute('height', markerHeightMajor);
    } else {
      markers[i].setAttribute('height', markerHeightMinor);
    }
    markers[i].setAttribute('transform', `rotate(${markerAngle + 90}, ${x}, ${y})`);
    markers[i].setAttribute('fill', markerDefaultColor);
    markers[i].setAttribute('stroke', markerDefaultColor);
    markers[i].setAttribute('filter', 'url(#marker-filter)');
    gMarkers.appendChild(markers[i]);

    if (i % 5 === 0) {
      tx = Math.round((startTx + textRadius + textRadius * Math.cos(markerRadians)) * 100) / 100;
      ty = Math.trunc((startTy + textRadius * Math.sin(markerRadians)) * 100) / 100;
      texts[i] = document.createElementNS(svgNS, 'text');
      texts[i].setAttribute('id', `markerText ${i}`);
      texts[i].setAttribute('x', tx);
      texts[i].setAttribute('y', ty);
      texts[i].setAttribute('font-size', markerFontSize);
      texts[i].setAttribute('font-family', markerFontFamily);
      texts[i].setAttribute('fill', 'white');
      texts[i].setAttribute('text-anchor', 'middle');
      texts[i].setAttribute('alignment-baseline', 'middle');
      texts[i].setAttribute('filter', 'url(#marker-filter)');
      textNodes[i] = document.createTextNode('');
      textNodes[i].nodeValue = range[0] + i * (range[1] - range[0]) / (numMarkers - 1);
      texts[i].appendChild(textNodes[i]);
      gMarkers.appendChild(texts[i]);
    }
  }
  svg.appendChild(gMarkers);

  // Draw inner circle

  circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', width / 2);
  circle.setAttribute('cy', height / 2);
  circle.setAttribute('r', innerRadius);
  circle.setAttribute('fill', `rgb(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`);
  circle.setAttribute('filter', 'url(#innercircle-filter)');
  svg.appendChild(circle);

  // Draw needle

  needle.setAttribute('id', 'needle');
  needle.setAttribute('points', needleString);
  needle.setAttribute('fill', `rgb(${foregroundColor[0]}, ${foregroundColor[1]}, ${foregroundColor[2]})`);
  needle.setAttribute('transform', `rotate(${angleRange[0]}, ${width / 2}, ${height / 2})`);
  svg.appendChild(needle);

  // Draw glass

  gGlass.setAttribute('id', 'glass');
  gGlass.setAttribute('opacity', 0.5);
  gGlass.setAttribute('filter', 'url(#glass-filter)');
  //svg.appendChild(gGlass);

  element.appendChild(svg);

  this.set = function set(value) {
    texts[prevTextIndex].setAttribute('font-size', markerFontSize);
    textIndex = 5 * Math.round(numMarkers * (value - range[0]) / (range[1] - range[0]) / 5);
    prevTextIndex = textIndex;
    texts[textIndex].setAttribute('font-size', Math.floor(markerFontSize * 1.6));
    const angle = angleRange[0] + (angleRange[1] - angleRange[0]) * (value - range[0])
      / (range[1] - range[0]);
    needle.setAttribute('transform', `rotate(${angle}, ${width / 2}, ${height / 2})`);
  };
}
export default DialFullBasic;

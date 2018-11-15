var dial = (function () {
  var load = function(element) {
    if( typeof element == 'undefined' ) {
      console.log('Element passed to dial is undefined');
      return;
    }
    var document = element.ownerDocument;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var svgNS = svg.namespaceURI;
    var circle = document.createElementNS(svgNS,'circle');
    circle.setAttribute('x',5);
    circle.setAttribute('y',5);
    circle.setAttribute('width',500);
    circle.setAttribute('height',500);
    circle.setAttribute('fill','#95B3D7');
    svg.appendChild(circle);
    element.appendChild(svg);
  }

  return {
    load: load
  };
})();

export default dial;

<html>
  <head>
    <title>Style Guide</title>
    <style>
      body {
        background-color: #f00;
      }
      .dash-container {
        display: flex;
        margin: 10px;
        padding: 10px;
        background-color: #eee;
      }
      .dash-column {
        flex: 1;
      }
      .dial-half {
        text-align: center;
        width: 100%;
        height: 180px;
      }
      .dial-full .dial-full-beamer {
        text-align: center;
        width: 100%;
        height: 470px;
      }
    </style>
  </head>
  <body>
    <div class="dash-container">
      <div class="dash-column">
        <div class="dial">
          <div class="dial-half" id="dial1-div"></div>
        </div>
      </div>
      <div class="dash-column">
        <div class="dial-half" id="dial2-div"></div>
      </div>
    </div>
    <div class="dash-container">
      <div class="dash-column">
        <div class="dial-full" id="dial3-div" dash-options='{
        "minValue": 0,
        "maxValue": 120,
        "backgroundColor": "darkblue",
        "trimColor": "darkred",
        "needleColor": "darkred",
        "markerBackgroundColor": "#333333",
        "normalColor": "green",
        "warningColor": "red"
      }'></div>
      </div>
      <div class="dash-column">
        <div class="dial-full" id="dial4-div" dash-options='{
        "minValue": 0,
        "maxValue": 120,
        "backgroundColor": "darkblue",
        "trimColor": "darkred",
        "needleColor": "darkred",
        "markerBackgroundColor": "#333333",
        "normalColor": "green",
        "warningColor": "red"
      }'></div>
      </div>
    </div>
    <div class="dash-container">
      <div class="dash-column">
        <div class="dial-full-beamer" id="dial5-div" dash-options='{
        "range": [0, 120],
        "angleRange": [-30, 210],
        "backgroundColor": [20, 20, 20],
        "foregroundColor": [150, 150, 255],
        "brightness": 0.9,
        "diameter": 400
      }'></div>
      </div>
      <div class="dash-column">
        <div class="dial-full-beamer" id="dial6-div" dash-options='{
        "range": [0, 120],
        "angleRange": [-30, 210],
        "backgroundColor": [20, 20, 20],
        "foregroundColor": [150, 150, 255],
        "brightness": 0.1,
        "diameter": 300
      }'></div>
      </div>
    </div>
    <script src="dist/svgdash.js"></script>
    <script src="dist/index.js"></script>
  </body>
</html>

import {Deck} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import {HexagonLayer, HeatmapLayer} from '@deck.gl/aggregation-layers';
import mapboxgl from 'mapbox-gl';

const POLICE_KILLINGS = './policeviolence.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 41.47,
  longitude: -105,
  zoom: 4,
  bearing: 0,
  pitch: 30
};

// Set your mapbox token here
mapboxgl.accessToken = 'pk.eyJ1IjoiYmxjZWJyYSIsImEiOiJja2FvcjE5em8wNm1kMnhxeXpjb3g0MmI5In0.N5xiWcB9OB_RuGLo81CE0A';
//process.env.MapboxAccessToken; // eslint-disable-line

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  // Note: deck.gl will be in charge of interaction and event handling
  interactive: false,
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch
});

export const deck = new Deck({
  canvas: 'deck-canvas',
  width: '100%',
  height: '100%',
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  onViewStateChange: ({viewState}) => {
    map.jumpTo({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch
    });
  },
  layers: [
    new GeoJsonLayer({
      id: 'airports',
      data: POLICE_KILLINGS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 0.5,
      pointRadiusScale: 2000,
      getRadius: f => 1/map.getZoom(),
      // f => 2,// - f.properties.'Subject\'s age',
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          el.innerHTML = `<h1>${object.properties["Subject's name"]}</h1>
            <h5><b>${object.properties["Full Address"]} County</b></h5>
            <p><b><i><pre>Age: ${object.properties["Subject's age"]}&#9;&#9;Race: ${object.properties["Subject's race with imputations"]}&#9;&#9;Gender: ${object.properties["Subject's gender"]}</pre></i></b></p>
            <p>${object.properties["Date of injury resulting in death (month/day/year)"]}:
              ${object.properties[ "A brief description of the circumstances surrounding the death"]}</p>`
          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }

    },
      onClick: ({object, x, y}) => {
        window.open(`${object.properties["Link to news article or photo of official document"]}`);
      }
      //  info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    }),
  ]
});

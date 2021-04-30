# Map Visualization of Police-Related Deaths in the United States

## About
Uses a [DeckGL](https://deck.gl/) scatterplot layer on top of a [Mapbox](https://docs.mapbox.com/mapbox-gl-js/overview/) map with data from [Fatal Encounters](https://fatalencounters.org/).  
This was my final project for my Introduction to Information Visualization class at Oregon State University.

## Usage

To run this example, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). You can either set an environment variable:

```bash
export MapboxAccessToken=<mapbox_access_token>
```

Or set `mapboxgl.accessToken` directly in `app.js`.

Other options can be found at [using with Mapbox GL](../../../../docs/get-started/using-with-mapbox-gl.md).

To install dependencies:

```bash
npm install
# or
yarn
```

Also, you will need a dataset in GEOJSON format. The data I used came from [Fatal Encounters](https://fatalencounters.org/). `app.js` is set up to use data from a file called `policeviolence.geojson`.

Commands:
* `npm start` is the development target, to serves the app and hot reload.
* `npm run build` is the production target, to create the final bundle and write to disk.

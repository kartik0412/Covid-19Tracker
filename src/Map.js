import React from "react";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken = "pk.eyJ1Ijoia2FydGlrMDQxMiIsImEiOiJjanpjOHJ5NWMwMnhyM2NvN256a2FqZ2JsIn0.JQW_I7PxnmES5rUDOj2Kxg";
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
});

export class Map extends React.Component {
    render() {
        return <div id="map"></div>;
    }
}

export default Map;

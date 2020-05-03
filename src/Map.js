import React from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "./Map.css";

export default class Map extends React.Component {
    handlemapselect(e) {
        let x = document.getElementsByTagName("path");
        for (let i = 0; i < x.length; i++) {
            if (x[i].id) document.getElementById(x[i].id).setAttribute("class", "svg-map__location");
        }
        let statename = e.target.getAttribute("name");
        this.props.clickMap(statename);
        this.props.show();
        document.getElementById(e.target.id).setAttribute("class", "activeclass");
    }
    render() {
        return (
            <div className="map-box">
                <p>Last updated : {this.props.updatetime}</p>
                <h1>Click on State/UT to view their stats </h1>
                <SVGMap onLocationClick={(e) => this.handlemapselect(e)} map={India} />
            </div>
        );
    }
}

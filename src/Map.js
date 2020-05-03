import React from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "./Map.css";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
        };
    }
    handlemapselect(e) {
        let statename = e.target.getAttribute("name");
        this.props.clickMap(statename);
        document.getElementById(e.target.id).setAttribute("class", "activeclass");
        if (this.state.name) {
            document.getElementById(this.state.name).setAttribute("class", "svg-map__location");
        }
        this.setState({ name: e.target.id });
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

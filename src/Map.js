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
        e.stopPropagation();
        let statename = e.target.getAttribute("name");
        this.props.clickMap(statename);
        document.getElementById(e.target.id).setAttribute("class", "activeclass");
        if (this.state.name) {
            document.getElementById(this.state.name).setAttribute("class", "svg-map__location");
        }
        this.setState({ name: e.target.id });
    }
    mouseOut() {
        if (this.state.name) {
            document.getElementById(this.state.name).setAttribute("class", "svg-map__location");
        }
        this.props.clickMap("Total");
    }
    render() {
        return (
            <div onClick={() => this.mouseOut()} className="map-box">
                <SVGMap onLocationClick={(e) => this.handlemapselect(e)} map={India} />
            </div>
        );
    }
}

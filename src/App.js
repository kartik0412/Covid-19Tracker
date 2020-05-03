import React from "react";
import Card from "./Card";
import axios from "axios";
import Chart from "./Chart";
import Table from "./Table";
import Map from "./Map";
import "./App.css";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            statewise: null,
            timeseries: null,
            state: 0,
            show: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.show = this.show.bind(this);
        this.clickMap = this.clickMap.bind(this);
    }

    async componentDidMount() {
        try {
            let { data } = await axios.get("https://api.covid19india.org/data.json");
            this.setState({
                timeseries: data.cases_time_series,
                statewise: data.statewise,
                state: 0,
            });
        } catch (err) {}
    }

    handleChange(e) {
        this.setState({
            state: e.target.value,
        });
    }
    show() {
        this.setState({ show: true });
    }
    getstate(x) {
        for (let i = 0; i < this.state.statewise.length; i++) {
            if (this.state.statewise[i].state === x) return i;
        }
        return 0;
    }

    clickMap(x) {
        this.setState({
            state: this.getstate(x),
        });
    }

    render() {
        const { statewise, timeseries, state, show } = this.state;
        return (
            <>
                <h1 className="displaystate">Total</h1>
                <div style={{ width: "100%" }} className="outer-box">
                    {statewise ? (
                        <>
                            <Card
                                color1={"rgba(255,7,58,.6)"}
                                color2={"#ff073a"}
                                color3={"rgba(255,7,58,.13)"}
                                delta={statewise[0] ? statewise[0].deltaconfirmed : 0}
                                value={statewise[0] ? statewise[0].confirmed : 0}
                                title={"Confirmed"}
                            />
                            <Card
                                color1={"rgba(0,123,255,.6)"}
                                color2={"#007bff"}
                                color3={"rgba(0,123,255,.18)"}
                                value={statewise[0] ? statewise[0].active : 0}
                                title={"Active"}
                            />
                            <Card
                                color1={"rgba(40,167,69,.6)"}
                                color2={"#28a745"}
                                color3={"rgba(40,167,69,.2)"}
                                delta={statewise[0] ? statewise[0].deltarecovered : 0}
                                value={statewise[0] ? statewise[0].recovered : 0}
                                title={"Recovered"}
                            />
                            <Card
                                color1={"rgba(108,117,125,.6)"}
                                color2={"#6c757d"}
                                color3={"rgba(108,117,125,.13)"}
                                delta={statewise[0] ? statewise[0].deltadeaths : 0}
                                value={statewise[0] ? statewise[0].deaths : 0}
                                title={"Deaths"}
                            />
                        </>
                    ) : (
                        ""
                    )}
                </div>
                {statewise && show ? (
                    <>
                        <h1 id="statename" className="displaystate">
                            {statewise[state].state}
                        </h1>
                        <div style={{ width: "100%" }} className="outer-box">
                            <>
                                <Card
                                    color1={"rgba(255,7,58,.6)"}
                                    color2={"#ff073a"}
                                    color3={"rgba(255,7,58,.13)"}
                                    delta={statewise[state] ? statewise[state].deltaconfirmed : 0}
                                    value={statewise[state] ? statewise[state].confirmed : 0}
                                    title={"Confirmed"}
                                />
                                <Card
                                    color1={"rgba(0,123,255,.6)"}
                                    color2={"#007bff"}
                                    color3={"rgba(0,123,255,.18)"}
                                    value={statewise[state] ? statewise[state].active : 0}
                                    title={"Active"}
                                />
                                <Card
                                    color1={"rgba(40,167,69,.6)"}
                                    color2={"#28a745"}
                                    color3={"rgba(40,167,69,.2)"}
                                    delta={statewise[state] ? statewise[state].deltarecovered : 0}
                                    value={statewise[state] ? statewise[state].recovered : 0}
                                    title={"Recovered"}
                                />
                                <Card
                                    color1={"rgba(108,117,125,.6)"}
                                    color2={"#6c757d"}
                                    color3={"rgba(108,117,125,.13)"}
                                    delta={statewise[state] ? statewise[state].deltadeaths : 0}
                                    value={statewise[state] ? statewise[state].deaths : 0}
                                    title={"Deaths"}
                                />
                            </>
                        </div>
                    </>
                ) : (
                    ""
                )}
                <Map
                    clickMap={this.clickMap}
                    show={this.show}
                    updatetime={statewise && statewise[state] ? statewise[state].lastupdatedtime : 0}
                />
                {timeseries ? (
                    this.state.state === 0 ? (
                        <Chart timeseries={timeseries} />
                    ) : (
                        <div className="table-box">{<Table state={statewise[state].state} />}</div>
                    )
                ) : (
                    ""
                )}
            </>
        );
    }
}

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
            mode: "light",
            isloading: true,
        };
        this.toggleMode = this.toggleMode.bind(this);
        this.seeTotal = this.seeTotal.bind(this);
        this.clickMap = this.clickMap.bind(this);
    }

    async componentDidMount() {
        try {
            let newColorScheme = "light";
            if (window.matchMedia) {
                if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                    newColorScheme = "light";
                    document.body.className = "lightmode";
                } else {
                    newColorScheme = "night";
                    document.body.className = "nightmode";
                }
            }
            let { data } = await axios.get("https://api.covid19india.org/data.json");
            this.setState({
                timeseries: data.cases_time_series,
                statewise: data.statewise,
                state: 0,
                mode: newColorScheme,
                isloading: false,
            });
        } catch (err) {}
    }
    seeTotal() {
        this.setState({
            state: 0,
        });
    }

    toggleMode() {
        let x = "light";
        if (this.state.mode === "light") {
            x = "night";
            document.body.className = "nightmode";
        } else {
            x = "light";
            document.body.className = "lightmode";
        }
        this.setState({
            mode: x,
        });
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
            show: false,
        });
    }

    render() {
        const { statewise, timeseries, state, show, mode, isloading } = this.state;
        return (
            <>
                {isloading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        <div className="heading">
                            <h1>
                                <span className="left">C</span>
                                <span>
                                    <img alt="virus.png" className="image" src="virus.png" />
                                </span>
                                <span className="right">vid-19 India Tracker</span>
                                {this.state.mode === "light" ? (
                                    <span className="display-mode">
                                        <img alt="night.png" onClick={this.toggleMode} src="night.png" />
                                    </span>
                                ) : (
                                    <span className="display-mode">
                                        <img alt="light.png" onClick={this.toggleMode} src="light.png" />
                                    </span>
                                )}
                            </h1>
                        </div>
                        <div style={{ width: "100%" }} className="outer-box">
                            <div className="block-1">
                                <div className="block-1-left">{statewise[state].state}</div>
                                {state !== 0 && (
                                    <div onClick={this.seeTotal} className="block-1-right">
                                        See Total
                                    </div>
                                )}
                            </div>
                            {statewise ? (
                                <div className="block-2">
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
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <Map
                            mode={mode}
                            clickMap={this.clickMap}
                            updatetime={statewise && statewise[state] ? statewise[state].lastupdatedtime : 0}
                        />
                        {timeseries ? (
                            this.state.state === 0 ? (
                                <Chart timeseries={timeseries} />
                            ) : (
                                <div className="table-box">{<Table mode={mode} state={statewise[state].state} />}</div>
                            )
                        ) : (
                            ""
                        )}
                    </>
                )}
            </>
        );
    }
}

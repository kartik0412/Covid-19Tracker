import React from "react";
import Card from "./Card";
import axios from "axios";
import Chart from "./Chart";
import Table from "./Table";
import "./App.css";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            statewise: null,
            timeseries: null,
            state: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            let { data } = await axios.get("https://api.covid19india.org/data.json");
            this.setState({
                statewise: data.statewise,
                timeseries: data.cases_time_series,
                state: 0,
            });
        } catch (err) {}
    }

    handleChange(e) {
        this.setState({
            state: e.target.value,
        });
    }

    render() {
        const { statewise, timeseries, state } = this.state;
        return (
            <>
                <div className="form-group">
                    <select onChange={this.handleChange} className="form-control">
                        {statewise &&
                            statewise.map((i, j) => (
                                <option key={j} value={j}>
                                    {i.state}
                                </option>
                            ))}
                    </select>
                </div>
                <div style={{ width: "100%" }} className="row outer-box">
                    {statewise ? (
                        <>
                            <Card
                                color={"orange"}
                                delta={statewise[state].deltaconfirmed}
                                value={statewise[state].confirmed}
                                updatetime={statewise[state].lastupdatedtime}
                                title={"Confirmed"}
                            />
                            <Card
                                color={"blue"}
                                value={statewise[state].active}
                                updatetime={statewise[state].lastupdatedtime}
                                title={"Active"}
                            />
                            <Card
                                color={"green"}
                                delta={statewise[state].deltarecovered}
                                value={statewise[state].recovered}
                                updatetime={statewise[state].lastupdatedtime}
                                title={"Recovered"}
                            />
                            <Card
                                color={"red"}
                                delta={statewise[state].deltadeaths}
                                value={statewise[state].deaths}
                                updatetime={statewise[state].lastupdatedtime}
                                title={"Deaths"}
                            />
                        </>
                    ) : (
                        ""
                    )}
                </div>
                {timeseries ? (
                    this.state.state == 0 ? (
                        <Chart timeseries={timeseries} />
                    ) : (
                        <div className="table-box">
                            <Table state={statewise[state].state} />
                        </div>
                    )
                ) : (
                    ""
                )}
            </>
        );
    }
}

import React from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            data: [],
        };
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.state !== this.state.state && nextProps.state !== "Total") {
            let info = await this.findstate(this.state.data, nextProps.state);
            if (info !== -1) {
                this.setState({ info: info.districtData });
            } else {
                this.setState({ info: [] });
            }
        }
    }

    async componentDidMount() {
        try {
            if (this.props.state !== "Total") {
                let { data } = await axios.get("https://api.covid19india.org/v2/state_district_wise.json");
                let info = await this.findstate(data, this.props.state);
                if (info !== -1) {
                    this.setState({ info: info.districtData, data: data });
                }
            }
        } catch (err) {}
    }

    findstate(data, x) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].state === x) {
                return data[i];
            }
        }
        return -1;
    }
    modify(data) {
        let x = data.filter((i) => i.district !== "Unknown");
        return x;
    }

    render() {
        const columns = [
            {
                name: "District",
                selector: "district",
                sortable: true,
                width: "140px",
                left: true,
                style: {
                    color: this.props.mode === "light" ? "black" : "white",
                    backgroundColor: this.props.mode === "light" ? "white" : "black",
                },
            },
            {
                name: "Confirmed",
                selector: "confirmed",
                sortable: true,
                center: true,
                width: "85px",
                style: {
                    color: this.props.mode === "light" ? "black" : "white",
                    backgroundColor: this.props.mode === "light" ? "white" : "black",
                },
            },
            {
                name: "Active",
                selector: "active",
                sortable: true,
                center: true,
                width: "85px",
                style: {
                    color: this.props.mode === "light" ? "black" : "white",
                    backgroundColor: this.props.mode === "light" ? "white" : "black",
                },
            },
            {
                name: "Recovered",
                selector: "recovered",
                sortable: true,
                center: true,
                width: "75px",
            },
            {
                name: "Deaths",
                selector: "deceased",
                sortable: true,
                center: true,
                width: "85px",
                style: {
                    color: this.props.mode === "light" ? "black" : "white",
                    backgroundColor: this.props.mode === "light" ? "white" : "black",
                },
            },
        ];
        return (
            <DataTable
                title={this.props.state}
                columns={columns}
                data={this.modify(this.state.info)}
                defaultSortField="confirmed"
                defaultSortAsc={false}
            />
        );
    }
}

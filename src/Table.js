import React from "react";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";

const columns = [
    {
        name: "District",
        selector: "district",
        sortable: true,
        width: "150px",
    },
    {
        name: "Confirmed",
        selector: "confirmed",
        sortable: true,
    },
    {
        name: "Active",
        selector: "active",
        sortable: true,
        center: true,
    },
    {
        name: "Recovered",
        selector: "recovered",
        sortable: true,
        center: true,
    },
    {
        name: "Deaths",
        selector: "deceased",
        sortable: true,
        center: true,
    },
];

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
        };
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.state !== this.state.state && nextProps.state !== "Total") {
            let info = await this.findstate(this.state.data, nextProps.state);
            this.setState({ info: info.districtData });
        }
    }

    async componentDidMount() {
        try {
            if (this.props.state !== "Total") {
                let { data } = await axios.get("https://api.covid19india.org/v2/state_district_wise.json");
                let info = await this.findstate(data, this.props.state);
                this.setState({ info: info.districtData, data: data });
            }
        } catch (err) {}
    }
    findstate(data, x) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].state === x) {
                return data[i];
            }
        }
    }
    modify(data) {
        let x = data.filter((i) => i.district !== "Unknown");
        return x;
    }

    render() {
        return (
            <Card>
                <DataTable
                    title={this.props.state}
                    columns={columns}
                    data={this.modify(this.state.info)}
                    defaultSortField="confirmed"
                    defaultSortAsc={false}
                    sortIcon={<SortIcon />}
                />
            </Card>
        );
    }
}

import React from "react";
import { Line } from "react-chartjs-2";

export default class LineChart extends React.Component {
    getlabel = (a) => {
        let labels = [];
        for (let i = a.length - 30; i < a.length; i++) {
            labels.push(a[i].date);
        }
        return labels;
    };

    getdata = (a) => {
        let data = [];
        for (let i = a.length - 30; i < a.length; i++) {
            data.push(Number(a[i].totalconfirmed));
        }
        return data;
    };
    getdata2 = (a) => {
        let data = [];
        for (let i = a.length - 30; i < a.length; i++) {
            data.push(Number(a[i].totaldeceased));
        }
        return data;
    };
    getdata3 = (a) => {
        let data = [];
        for (let i = a.length - 30; i < a.length; i++) {
            data.push(Number(a[i].totalrecovered));
        }
        return data;
    };

    render() {
        let data = {
            labels: this.getlabel(this.props.timeseries),
            datasets: [
                {
                    label: "Confirmed",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(255,7,58,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(255,7,58,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255,7,58,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.getdata(this.props.timeseries),
                },
                {
                    label: "Recovered",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "green",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "green",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "green",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.getdata3(this.props.timeseries),
                },
                {
                    label: "Deaths",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(108,117,125,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(108,117,125,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(108,117,125,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.getdata2(this.props.timeseries),
                },
            ],
        };
        return (

            <Line data={data} height={360} width={600} options={{ maintainAspectRatio: false }} />
        );
    }
}

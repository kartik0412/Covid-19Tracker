import React from 'react';
import { VictoryPie } from 'victory'

export default class PieChart extends React.Component {
    render() {
        let data = [
            { x: 'Active', y: Number(this.props.data.active) },
            { x: 'Recovered', y: Number(this.props.data.recovered) },
            { x: 'Deaths', y: Number(this.props.data.deaths) }
        ];
        const graphicColor = ['rgba(0,123,255,1)', 'rgba(40,167,69,1)', 'rgba(108,117,125,1)'];
        return (
            <VictoryPie
                animate={{ duration: 700 }}
                padAngle={1}
                origin={{ y: 130 }}
                radius={100}
                innerRadius={60}
                data={data}
                colorScale={graphicColor}
                style={{
                    labels: {
                        fontSize: 12
                    }
                }}
            />
        );
    }
}

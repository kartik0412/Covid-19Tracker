import React from "react";
import CountUp from "react-countup";
import "./Card.css";

class Card extends React.Component {
    render() {
        return (
            <div className="card-box col-sm-3 ">
                <div className="card-main">
                    <div className="card-number">
                        <CountUp separator={","} start={0} end={this.props.value} duration={1} />
                    </div>
                    <div style={{ color: this.props.color }} className="card-delta">
                        {this.props.delta ? (
                            <>
                                [+
                                <CountUp separator={","} start={0} end={this.props.delta} duration={1} />]
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    <div style={{ color: this.props.color }} className="card-title">
                        {this.props.title}
                        <p>Last Updated : {this.props.updatetime}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;

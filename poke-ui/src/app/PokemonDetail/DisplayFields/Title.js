import React, { Component } from "react";

export default class FieldTitle extends Component {
  render() {
    let { fieldValue, className } = this.props;

    return <h1 className={className}>{fieldValue}</h1>;
  }
}

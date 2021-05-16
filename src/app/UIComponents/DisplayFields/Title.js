import React, { Component } from "react";

/** @class Create a form field title */
export default class FieldTitle extends Component {
  render() {
    let { fieldValue, className } = this.props;

    return <h1 className={className}>{fieldValue}</h1>;
  }
}

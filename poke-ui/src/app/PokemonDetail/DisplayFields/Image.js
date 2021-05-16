import React, { Component } from "react";

export default class FieldImage extends Component {
  render() {
    let { fieldValue, fieldName, className } = this.props;

    return (
      <div className={className}>
        <img className="img-fluid" src={fieldValue} alt={fieldName} />
      </div>
    );
  }
}

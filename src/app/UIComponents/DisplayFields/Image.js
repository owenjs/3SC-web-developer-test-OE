import React, { Component } from "react";

/** @class Create a Image form field  */
export default class FieldImage extends Component {
  render() {
    let { fieldValue, fieldName, className } = this.props;

    return (
      <div className={className}>
        <img className="img-fluid" src={fieldValue} alt={fieldName || 'Pokemon Image'} />
      </div>
    );
  }
}

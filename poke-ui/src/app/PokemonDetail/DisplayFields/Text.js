import React, { Component } from "react";

export default class FieldText extends Component {
  constructor(props) {
    super(props)

    this.fieldId = Math.floor((Math.random() * 10000) + 1);
  }

  render() {
    let { fieldValue, fieldName, className } = this.props;

    return (
      <div className={'d-flex flex-column h-100' + (className ? ` ${className}` : '')}>
        {fieldName ? <label htmlFor={'formField' + this.fieldId} className="form-label">{fieldName}</label> : null}
        <input id={'formField' + this.fieldId} className="form-control mt-auto" type="text" placeholder={fieldValue} aria-label="readonly pokemon detail" readOnly />
      </div>
    );
  }
}

import React, { Component } from "react";

/** @class Create a form field group of other form fields */
export default class FieldGroup extends Component {
  render() {
    let { fieldValue, fieldName } = this.props;

    return (
      <div className="border p-2">
        {fieldName ? <label className="form-label h4">{fieldName}</label> : null}
        <div class="row g-3">
          {fieldValue.map((fieldInfo, i) => (<div className='col-auto' key={i}><fieldInfo.fieldComponent {...fieldInfo} /></div>))}
        </div>
      </div>
    );
  }
}

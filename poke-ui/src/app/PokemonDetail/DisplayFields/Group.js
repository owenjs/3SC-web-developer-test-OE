import React, { Component } from "react";

export default class FieldGroup extends Component {
  render() {
    let { fieldValue, fieldName } = this.props;

    return (
      <div className="border p-2">
        <label className="form-label h4">{fieldName}</label>
        <div class="row g-3">
          {fieldValue.map((fieldInfo, i) => (<div className='col-auto' key={i}><fieldInfo.fieldComponent {...fieldInfo} /></div>))}
        </div>
      </div>
    );
  }
}

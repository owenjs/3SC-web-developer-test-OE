import React, { Component } from "react";

export default class UITabs extends Component {
  render() {
    let { tabsInfo } = this.props;

    return (
      <div className="overflow-auto position-relative">
        <ul className="nav nav-tabs sticky-top bg-white">
          {tabsInfo.map((tabInfo, i) => this.buildTab(tabInfo, i))}
        </ul>

        <div class="tab-content overflow-hidden mt-3">
          {tabsInfo.map((tabInfo, i) => this.buildTabPane(tabInfo, i))}
        </div>
      </div>
    );
  }

  buildTab(tabInfo, id) {
    let { activeTabId, fnHandleTabChange } = this.props;

    return (
      <li className="nav-item" key={id}>
        <button 
          className={"nav-link" + (activeTabId === tabInfo.id  ? ' active' : '')} 
          id={`${tabInfo.id}-tab`} 
          data-bs-toggle="tab" 
          data-bs-target={`#${tabInfo.id}`} 
          type="button" 
          role="tab" 
          aria-controls={tabInfo.id} 
          aria-selected={activeTabId === tabInfo.id  ? 'true' : 'false'}
          onClick={() => fnHandleTabChange(tabInfo.id)}>
            {tabInfo.text}
        </button>
      </li>
    );
  }

  buildTabPane(tabInfo, id) {
    let { activeTabId, tabPaneProps } = this.props;

    return (
      <div 
        className={"tab-pane fade" + (activeTabId === tabInfo.id  ? ' show active' : '')} 
        id={tabInfo.id}
        key={id}
        role="tabpanel" 
        aria-labelledby={`${tabInfo.id}-tab`} >
          <tabInfo.tabComponent {...tabPaneProps} />
      </div>
    );
  }
}
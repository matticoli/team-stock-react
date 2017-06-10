import React, {Component} from "react";

import ContentList from './ContentList';

class ContentRoot extends Component {
  render() {
      return (
          <main className="mdl-layout__content">
              <div className="page-content">

                  <div id="app-container">
                      <div className="container-fluid box">
                          <div className="row">
                              <div className="col-md-offset-1 col-md-10">
                                  {(this.props.isAdmin) ? (
                                          <button id="add"
                                                  className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                                                  onClick={this.props.showEditModal}>
                                              <i className="material-icons">settings</i>
                                          </button>
                                      ) : (<div/>)
                                  }
                                    <h4>
                                        Selected Team: 
                                        <label id="selected-team"> {this.props.selectedTeam}</label>
                                    </h4>
                                  <ul id="item-list" className="mdl-list">
                                      <ContentList categories={this.props.categories}
                                                   categoryData={this.props.categoryData}
                                                   itemData={this.props.itemData}
                                                   selectedTeam={this.props.selectedTeam}
                                                   handleItemSelect={this.props.handleItemSelect}/>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      );
  }
}

export default ContentRoot;

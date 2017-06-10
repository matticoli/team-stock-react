import React, {Component} from "react";


class Header extends Component {
  render() {
      return (
          <header className="mdl-layout__header App-Header">
              <div className="mdl-layout__header-row">
                  <i className="material-icons">work</i>
                  <h4 id="title">TEAM<label>STOCK</label></h4>
                  <div className="mdl-layout-spacer"></div>
                  <label>Filter:</label>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                      <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                          <i className="material-icons">search</i>
                      </label>
                      <div className="mdl-textfield__expandable-holder">
                          <input id="search" className="mdl-textfield__input" />
                      </div>
                  </div>
              </div>
          </header>
      );
  }
}

export default Header;

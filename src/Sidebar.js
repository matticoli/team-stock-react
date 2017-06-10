import React, {Component} from "react";

import User from "./User";

class SidebarItem extends Component {
    render() {
        return (
            <a id="drawer-team-storage"
               className="mdl-navigation__link"
               onClick={this.onClick.bind(this) || undefined}>
                <i className="material-icons">{this.props.icon}</i>
                {this.props.name}
            </a>
        );
    }

    onClick() {
        this.props.onClick(this.props.name);
    }
}

class Sidebar extends Component {
  render() {
      return (
          <div id="drawer-container" className="mdl-layout__drawer">
              <nav className="navbar navbar-custom">
                  <User user={this.props.user} firebase={this.props.firebase}/>
              </nav>
              <div className="sidebar-nav-container">
                  <nav id="sidebar-nav" className="mdl-navigation">
                      <br />
                      <hr />
                      <span className="mdl-layout-title">Teams</span>
                      <hr />
                      <SidebarItem name="Storage" icon="storage" onClick={this.props.itemClickHandler}/>
                      <div id="sidebar-teams"></div>
                      {
                          (this.props.user) ? (
                              this.props.teams.map((team) =>{
                                  return <SidebarItem key={team[".key"]} name={team[".key"]} icon="people" onClick={this.props.itemClickHandler}/>
                              })
                          ) : (
                              <SidebarItem name="You must sign in to view teams" icon="warning" onClick={this.props.itemClickHandler} />
                          )
                      }
                  </nav>
              </div>
          </div>
      );
  }
}

export default Sidebar;

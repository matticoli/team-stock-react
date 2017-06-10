import React, {Component} from "react";

import Toastr from 'toastr';
import ReactTooltip from 'react-tooltip';

import SwitchButton from 'react-switch-button';


class EditModalUser extends Component {
    render() {
        return (
            <div className="mdl-grid">
                <ReactTooltip id="desc"
                              className="tooltip"
                              place="right"
                              type="info" />
                <button disabled className="mdl-cell mdl-cell--1-col mdl-icon mdl-button mdl-button--icon mdl-js-button mdl-color--grey mdl-color-text--black">
                    {this.props.pic ? (
                        <div>
                            <i>
                                <img alt={this.props.name} className="item-pic" src={this.props.pic} />
                            </i>
                        </div>
                    ) : (
                        <div>
                            <i className="material-icons mdl-badge mdl-badge--overlap">
                                person
                            </i>
                        </div>
                    )}
                </button>
                <button className="mdl-cell mdl-cell--1-col mdl-button mdl-js-button mdl-color--grey mdl-color-text--black"
                        data-tip={this.props.uid || ""} data-for="desc">
                    <label>
                        {this.props.uid}
                    </label>
                </button>
                <button className="mdl-cell mdl-cell--2-col mdl-button mdl-js-button mdl-color--grey mdl-color-text--black"
                        data-tip={this.props.name || ""} data-for="desc">
                    <label>
                        {this.props.name}
                    </label>
                </button>
                <button className="mdl-cell mdl-cell--2-col mdl-button mdl-js-button mdl-color--grey mdl-color-text--black"
                        data-tip={this.props.email || ""} data-for="desc">
                    <label>
                        {this.props.email}
                    </label>
                </button>

                <div className="mdl-cell mdl-cell--2-col mdl-button mdl-color--grey mdl-color-text--black">
                    <SwitchButton name={"active-switch-"+this.props.uid}
                              onChange={this.handleActiveChange.bind(this)}
                              label="Active"
                              defaultChecked={this.props.active}/>
                </div>
                <div className="mdl-cell mdl-cell--2-col mdl-button mdl-color--grey mdl-color-text--black">
                    <SwitchButton name={"admin-switch-"+this.props.uid}
                                  onChange={this.handleAdminChange.bind(this)}
                                  label="Admin"
                                  defaultChecked={this.props.admin}/>
                </div>
                <button className="mdl-cell mdl-cell--1-col mdl-button mdl-js-button mdl-color--red"
                        onClick={this.delete.bind(this)}>
                    <i className="material-icons mdl-color-text--black">delete_forever</i>
                </button>
            </div>
        )
    }

    delete() {
        if(window.confirm("Are you sure you would like to delete item "+this.props.name+"?\nTHIS CANNOT BE UNDONE")) {
            this.props.dbref.remove().then(()=>{
                Toastr.success("Item removed successfully");
            });
        }
    }

    handleActiveChange(change) {
        const status = change.target.checked;
        this.props.dbref.child('active').set(status).then(()=>{
            Toastr.success(this.props.name+"'s account has been "+(status ? "activated" : "deactivated")+" successfully!");
        })
    }

    handleAdminChange(change) {
        const status = change.target.checked;
        this.props.dbref.child('admin').set(status).then(()=>{
            Toastr.success(this.props.name+(status ? " promoted to admin" : " demoted to user")+" successfully!");
        })
    }
}

class EditModalUserPanel extends Component {

  render() {
      return (
          <div className="mdl-tabs__panel" id="items-panel">
              <h5>Users</h5>
              <br/>
              {this.props.users.map( (user)=> {
                  return <EditModalUser key={user.uid}
                                        uid={user.uid}
                                        name={user.name}
                                        pic={user.pic}
                                        email={user.email}
                                        active={user.active}
                                        admin={user.admin}
                                        dbref={this.props.dbref.child(user.uid)}/>
              })}
          </div>
      );
  }
}

export default EditModalUserPanel;

import React, {Component} from "react";

import Toastr from 'toastr';

class ItemModalTeamEntry extends Component {
    render() {
        return (
                <li className="mdl-list__item">
                    <div className={(this.props.change ? "mdl-color--orange " : "")+"mdl-button mdl-button--raised"}
                         disabled={this.props.disabled}>
                        <i className={"material-icons mdl-badge mdl-badge--overlap"}
                           data-badge={(this.props.qty || 0) + (this.props.change || 0)}>
                            business_center
                        </i>
                        {this.props.name}
                    </div>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                            ref="addOneButton"
                            onClick={this.add.bind(this)}
                            disabled={this.props.disabled}>
                        <i className="material-icons">exposure_plus_1</i>
                    </button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                            ref="removeOneButton"
                            onClick={this.remove.bind(this)}
                            disabled={this.props.disabled}>
                        <i className="material-icons">exposure_neg_1</i>
                    </button>
                    <div className={(this.props.change) ? "mdl-button mdl-button--raised" : ""}
                         disabled={this.props.disabled}>
                        <i className={(this.props.change) ? "material-icons mdl-badge mdl-badge--overlap" : ""}
                              data-badge={(this.props.change > 0 ? "+" : "")+this.props.change}>
                        </i>
                    </div>
                </li> 
        )
    }

    add() {
        this.props.handleChange(this.props.name, 1);
    }

    remove() {
        this.props.handleChange(this.props.name, -1);
    }




}

class ItemModal extends Component {

    componentWillMount() {
        this.setState({
            showSaveDialog: false
        });
    }

    render() {
        const saveDialog = (
            <div className="dialog">
                <h5>Apply changes?</h5>
                <br/>
                <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--black mdl-color--red"
                        onClick={this.hideSaveDialog.bind(this)} >
                    <i className="material-icons">close</i>
                    <label>Cancel</label>
                </button>
                <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--black mdl-color--green"
                        onClick={this.save.bind(this)} >
                    <i className="material-icons">save</i>
                    <label>Confirm</label>
                </button>
            </div>
        );

        return (
            <div className="modal">
                {this.state.showSaveDialog && saveDialog}
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                        <h4>{this.props.selectedItem}</h4>
                        <img alt={this.props.selectedItem} className="item-pic-full" src={this.props.itemData.photoURL}/>
                        <h5 className="item-pic-full">{this.props.itemData.description}</h5>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                        <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--black mdl-color--red"
                                onClick={this.cancel.bind(this)}
                                disabled={this.state.showSaveDialog}>
                            <i className="material-icons">close</i>Cancel
                        </button>
                        <button className="mdl-button mdl-js-button mdl-color-text--black mdl-button--colored mdl-color--green"
                                onClick={this.showSaveDialog.bind(this)}
                                disabled={this.state.showSaveDialog}>
                            <i className="material-icons">save</i>Apply
                        </button>
                        <ItemModalTeamEntry key="Storage"
                                            name="Storage"
                                            qty={this.props.itemData.distribution["Storage"]}
                                            handleChange={this.handleChange.bind(this)}
                                            change={this.state["Storage"] || 0}
                                            disabled={this.state.showSaveDialog}/>
                        {Object.keys(this.props.teams).map(//TODO: Use team list instead to ensure all teams added
                            //2 sided table; move left and right
                            (key)=>{
                              const team = this.props.teams[key][".key"]; //TODO: Find a cleaner way to do this
                              return <ItemModalTeamEntry key={team}
                                                         name={team}
                                                         qty={this.props.itemData.distribution[team]}
                                                         handleChange={this.handleChange.bind(this)}
                                                         change={this.state[team] || 0}
                                                         disabled={this.state.showSaveDialog}/>
                            }
                        )}
                    </div>
                </div>
            </div>
        );
  }

  handleChange(team, qty) {
      let changes={};
      changes[team] = (this.state[team] || 0)+qty;
      this.setState(changes);
  }

  showSaveDialog() {
        if(window.confirm("Apply changes?")) {
            this.save();
        }
      // this.setState({
      //     showSaveDialog: true
      // });
  }

  hideSaveDialog() {
      this.setState({
          showSaveDialog: false
      });
  }

  save() {
      let changes = this.state;
      changes['showSaveDialog'] = null;

      let newDistrib = {};
      Object.keys(changes).forEach((key)=> {
          if(changes[key]) {
             newDistrib[key] = (this.props.itemData.distribution[key] || 0) + changes[key];
          }
      });

      console.log(newDistrib);

      this.props.dbref.child('distribution').update(newDistrib);
      Toastr.success("Changes made successfully");

      this.setState({
          showSaveDialog: false
      });
      this.cancel();
  }

  cancel() {
      this.props.handleItemSelect(null);
  }
}

export default ItemModal;

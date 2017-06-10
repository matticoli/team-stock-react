import React, {Component} from "react";

import Toastr from 'toastr';
import ReactTooltip from 'react-tooltip';

import EditModalUserPanel from "./EditModalUserPanel"

class EditModalCategory extends Component {
    render() {
        return (
            <div className="mdl-grid">
                <div disabled className="mdl-cell mdl-cell--1-col mdl-icon mdl-button mdl-js-button mdl-button--icon mdl-color--grey">
                    <i className="material-icons mdl-color-text--black">build</i>
                </div>
                <button className="mdl-cell mdl-cell--5-col mdl-button mdl-js-button mdl-color--grey mdl-color-text--black"
                        onClick={this.edit.bind(this)}>
                    <label>{this.props.name} </label>
                </button>
                <button className="mdl-cell mdl-cell--1-col mdl-button mdl-js-button mdl-color--red"
                        onClick={this.delete.bind(this)}>
                    <i className="material-icons mdl-color-text--black">delete_forever</i>
                </button>

            </div>
        )
    }

    delete() {
        if(window.confirm("Are you sure you would like to delete category "+this.props.name+"?\nTHIS CANNOT BE UNDONE")) {
            this.props.dbref.remove().then(()=>{
                Toastr.success("Category removed successfully");
            });
        }
    }

    edit() {
        const desc = window.prompt("Current description:\n\n"+this.props.description+"\n\nAdd new description for category "+this.props.name+":");
        if(desc) {
            this.props.dbref.set(desc).then(()=>{
                Toastr.success("Category updated successfully");
            });
        }
    }
}

class EditModalItem extends Component {
    render() {
        console.log(this.props.categories);
        console.log(this.props.category);
        console.log(this.props.categories.includes(this.props.category));
        return (
            <div className="mdl-grid">
                <ReactTooltip id="desc"
                              className="tooltip"
                              place="right"
                              type="info" />
                <button className="mdl-cell mdl-cell--1-col mdl-icon mdl-button mdl-button--icon mdl-js-button mdl-color--grey mdl-color-text--black"
                        onClick={this.editPhotoURL.bind(this)}>
                    {this.props.photoURL ? (
                        <div>
                            <i>
                                <img alt={this.props.name} className="item-pic" src={this.props.photoURL} />
                            </i>
                        </div>
                    ) : (
                        <div>
                            <i className="material-icons mdl-badge mdl-badge--overlap">
                                donut_small
                            </i>
                        </div>
                    )}
                </button>
                <button className="mdl-cell mdl-cell--3-col mdl-button mdl-js-button mdl-color--grey mdl-color-text--black"
                        disabled>
                    <label>
                        <i className="material-icons mdl-color-text--black">donut_small</i>
                        {this.props.name}
                        </label>
                </button>
                <button className="mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-color--grey mdl-color-text--black"
                        onClick={this.editDescription.bind(this)}
                        data-tip={this.props.description || ""} data-for="desc">
                    <label>
                        <i className="material-icons mdl-color-text--black">description</i>
                        {this.props.description}
                    </label>
                </button>
                <div className={"mdl-cell mdl-cell--2-col mdl-button mdl-js-button "+
                ((this.props.categories.includes(this.props.category)) ? "mdl-color--grey" :"mdl-color--orange mdl-color-text--white")}>
                    <select className={"mdl-button mdl-js-button "+
                    ((this.props.categories.includes(this.props.category)) ? "mdl-color--grey" :"mdl-color--orange mdl-color-text--white")}
                            value={this.props.category}
                            onChange={this.handleItemCategoryChange.bind(this)}>
                        <option value="SELECT CATEGORY">{(!this.props.category?"▼":"")}SELECT CATEGORY</option>
                        {this.props.categories.map( (categ)=> {
                            return <option key={categ} value={categ}>{(this.props.category===categ?"▼":"")}{categ}</option>
                        })}
                    </select>
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

    editDescription() {
        const desc = window.prompt("Current description:\n\n"+this.props.description+"\n\nAdd new description for item "+this.props.name+":");
        if(desc) {
            this.props.dbref.child('description').set(desc).then(()=>{
                Toastr.success("Item updated successfully");
            });
        }
    }

    editPhotoURL() {
        const photoURL = window.prompt("Current URL:\n\n"+this.props.photoURL+"\n\nAdd new item URL for item "+this.props.name+":");
        if(photoURL && photoURL!="") {
            this.props.dbref.child('photoURL').set(photoURL).then(()=>{
                Toastr.success("Item photo updated successfully!");
            });
        } else if(photoURL==="") {
            this.props.dbref.child('photoURL').remove().then(()=>{
                Toastr.success("Item photo removed successfully!");
            });
        }
    }

    handleItemCategoryChange(changeEvent) {
        this.props.dbref.child('category').set(changeEvent.target.value).then(()=> {
           Toastr.success("Category changed successfully!");
        });
    }
}

class EditModalTeam extends Component {
    render() {
        return (
            <div className="mdl-grid">
                <div disabled className="mdl-cell mdl-cell--1-col mdl-icon mdl-button mdl-js-button mdl-button--icon mdl-color--grey">
                    <i className="material-icons mdl-color-text--black">people</i>
                </div>
                <button disabled className="mdl-cell mdl-cell--5-col mdl-button mdl-js-button mdl-color--grey mdl-color-text--black">
                    <label>{this.props.name} </label>
                </button>
                <button className="mdl-cell mdl-cell--1-col mdl-button mdl-js-button mdl-color--red"
                        onClick={this.delete.bind(this)}>
                    <i className="material-icons mdl-color-text--black">delete_forever</i>
                </button>

            </div>
        )
    }

    delete() {
        if(window.confirm("Are you sure you would like to delete team "+this.props.name+"?\nTHIS CANNOT BE UNDONE")) {
            this.props.dbref.remove().then(()=>{
                Toastr.success("Team removed successfully");
            });
        }
    }
}

class EditModal extends Component {

    componentWillMount() {
        this.setState({
            showdeleteDialog: false,
            activeTab: 'categories-panel'
        });
    }

    render() {
        const deleteDialog = (
            <div className="dialog">
                <h5>Are you sure? This can not be undone!</h5>
                <br/>
                <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--white mdl-color--red"
                        onClick={this.hidedeleteDialog.bind(this)} >
                    <i className="material-icons">close</i>
                    <label>Cancel</label>
                </button>
                <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--white mdl-color--green"
                        onClick={this.done.bind(this)} >
                    <i className="material-icons">save</i>
                    <label>Confirm</label>
                </button>
            </div>
        );

        console.log(JSON.stringify(this.props.teams));

        const panels = {
            'categories-panel': (
                <div className="mdl-tabs__panel is-active" id="categories-panel">
                    <h5>Categories</h5>
                    <br/>
                    <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--black mdl-color--green"
                            onClick={this.addCategory.bind(this)}>
                        <i className="material-icons mdl-color-text--black">add</i>
                        <label>Add Category</label>
                    </button>
                    {this.props.categories.map( (category)=> {
                        return <EditModalCategory key={category}
                                                  name={category}
                                                  description={this.props.categoryData[category]}
                                                  dbref={this.props.dbref.child('categories').child(category)}/>
                    })}
                </div>

            ),
            'items-panel': (
                <div className="mdl-tabs__panel" id="items-panel">
                    <h5>Items</h5>
                    <br/>
                    <h7 className="item-pic-full"><i className="material-icons mdl-color-text--yellow">warning</i>Items without a category will not be displayed</h7>
                    <br/>
                    <br/>
                    <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--black mdl-color--green"
                            onClick={this.addItem.bind(this)}>
                        <i className="material-icons mdl-color-text--black">add</i>
                        <label>Add Item</label>
                    </button>
                    {this.props.items.map( (item)=> {
                        return <EditModalItem key={item.name}
                                                  name={item.name}
                                                  description={item.description}
                                                  category={item.category}
                                                  categories={this.props.categories}
                                                  photoURL={item.photoURL}
                                                  dbref={this.props.dbref.child('items').child(item.name)}/>
                    })}
                </div>
            ),
            'teams-panel': (
                <div className="mdl-tabs__panel" id="teams-panel">
                    <h5>Teams</h5>
                    <br/>
                    <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--black mdl-color--green"
                            onClick={this.addTeam.bind(this)}>
                        <i className="material-icons mdl-color-text--black">add</i>
                        <label>Add Team</label>
                    </button>
                    {this.props.teams.map( (team)=> {
                        return <EditModalTeam key={team}
                                              name={team}
                                              dbref={this.props.dbref.child('teams').child(team)}/>
                    })}
                </div>
            ),
            'users-panel': (
                <EditModalUserPanel users={this.props.users}
                                    dbref={this.props.dbref.child('users')} />
            )
        };

        return (
            <div className="modal">
                {this.state.showdeleteDialog && deleteDialog}
                <button className="mdl-button mdl-js-button mdl-button--colored mdl-color-text--black mdl-color--blue"
                        onClick={this.done.bind(this)}
                        disabled={this.state.showDeleteDialog}>
                    <i className="material-icons mdl-color-text--black">check_circle</i>Done
                </button>
                <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div className="mdl-tabs__tab-bar">
                        <a target="categories-panel" onClick={this.tabSelect.bind(this)}
                           className={(this.state.activeTab === 'categories-panel' ? "mdl-color--grey " : "")
                               +"mdl-button mdl-color-text--black mdl-tabs__tab"}>
                            Categories
                        </a>
                        <a target="items-panel" onClick={this.tabSelect.bind(this)}
                           className={(this.state.activeTab === 'items-panel' ? "mdl-color--grey " : "")
                               +"mdl-button mdl-color-text--black mdl-tabs__tab"}>Items</a>
                        <a target="teams-panel" onClick={this.tabSelect.bind(this)}
                           className={(this.state.activeTab === 'teams-panel' ? "mdl-color--grey " : "")
                               +"mdl-button mdl-color-text--black mdl-tabs__tab"}>Teams</a>
                        <a target="users-panel" onClick={this.tabSelect.bind(this)}
                           className={(this.state.activeTab === 'users-panel' ? "mdl-color--grey " : "")
                           +"mdl-button mdl-color-text--black mdl-tabs__tab"}>Users</a>
                    </div>
                    {panels[this.state.activeTab]}
                </div>
            </div>
        );
  }

  addCategory() {
        let category = prompt("Category Name: ");
        if(this.props.categories.includes(category)) {
            Toastr.error("Category already exists!");
            return;
        }
        let cats={};
        cats[category] = prompt("Enter description for "+category+": ")
        this.props.dbref.child('categories').update(cats);
  }

  addTeam() {
        let team = prompt("Team ID: ");
        if(this.props.teams.includes(team)) {
            Toastr.error("Team already exists!");
            return;
        }
        this.props.dbref.child('teams').child(team).set("").then(()=>{
            Toastr.success("Team added successfully!");
        });
  }


    addItem() {
        let item = prompt("Item Name: ");
        if(this.props.items.includes(item)) {
            Toastr.error("Item already exists!");
            return;
        }
        const dbItem = {
            name: item,
            description: prompt("Enter description for "+item+": "),
            distribution: {
                'Storage': 0
            },
            category: "Unsorted",
            photoURL: ""

        }
        this.props.dbref.child('items').child(item).set(dbItem);
    }

  tabSelect(tab) {
      this.setState({
          activeTab: tab.target.target
      });
  }

  handleChange(team, qty) {
      let changes={};
      changes[team] = (this.state[team] || 0)+qty;
      this.setState(changes);
  }

  showdeleteDialog() {
      this.setState({
          showdeleteDialog: true
      });
  }

  hidedeleteDialog() {
      this.setState({
          showdeleteDialog: false
      });
  }

  done() {
      this.props.hideEditModal();
  }
}

export default EditModal;

import React, {Component} from "react";

import ReactTooltip from 'react-tooltip';

class ContentListCategory extends Component {
    render() {
        return (
            <div>
                <ReactTooltip id="cat"
                    className="tooltip"
                    place="right"
                    type="info" />
                <li className="mdl-list__item mdl-color-text--white">
                    <span className="mdl-list__item-primary-action">
                        <span className="mdl-list__item-primary-content">
                            <i data-tip={this.props.description || ""} data-for="cat" className="material-icons  mdl-list__item-avatar">build</i>
                            <label>
                                {this.props.name}
                            </label>
                        </span>
                    </span>
                </li>
                <ul className="mdl-list">
                {/*<div className="mdl-grid">*/}

                    {this.selectItemsByCategory(this.props.itemData).map(
                    (item)=>{
                        return <ContentListItem key={item.name}
                                                name={item.name}
                                                description={item.description}
                                                photoURL={item.photoURL}
                                                qty={(item.distribution && item.distribution[this.props.selectedTeam]) || 0}
                                                handleItemSelect={this.props.handleItemSelect}
                        />
                    }
                )}
                {/*</div>*/}
                </ul>
            </div>

        );
    }

    selectItemsByCategory(itemData) {
        // console.log(itemData);
        let items = [];
        for (let key in itemData) {//TODO Replace with foreach
            if(itemData[key].category===this.props.name) {
                items.push(itemData[key]);
            }
        }
        // console.log(items);
        return items;
    }
}

class ContentListItem extends Component {
    render() {
        return (
            <li  className="mdl-list__item mdl-color-text--white" onClick={this.onClick.bind(this)}>
            {/*<div className="mdl-cell mdl-cell--3-col" onClick={this.onClick.bind(this)}>*/}
                <span className="mdl-list__item-secondary-action">
                    <span className="mdl-list__item-secondary-content">
                        <label>
                            <ReactTooltip id="item"
                                          className="tooltip"
                                          place="right"
                                          type="info"/>
                            {this.props.photoURL ? (
                                <div>
                                    <i data-tip={this.props.description || ""}
                                       data-for="item"
                                       className="mdl-badge mdl-badge--overlap"
                                       data-badge={this.props.qty || 0}>
                                        <img alt={this.props.name} className="item-pic" src={this.props.photoURL} />
                                    </i>
                                    {this.props.name}
                                </div>
                                ) : (
                                <div>
                                    <i data-tip={this.props.description || ""}
                                       data-for="item"
                                       className="material-icons mdl-badge mdl-badge--overlap"
                                       data-badge={this.props.qty || 0}>
                                        donut_small
                                    </i>
                                    {this.props.name}
                                </div>
                            )}
                        </label>
                    </span>
                </span>
        {/*</div>*/}
            </li>
        );
    }

    onClick() {
        this.props.handleItemSelect(this.props.name);
    }
}

class ContentList extends Component {
  render() {
      return (
          <div>
              {this.props.categories.map((category) => {
                  return (
                      <ContentListCategory key={category}
                                           name={category}
                                           description={this.props.categoryData[category]}
                                           itemData={this.props.itemData}
                                           selectedTeam={this.props.selectedTeam}
                                           handleItemSelect={this.props.handleItemSelect}/>
                  )
              })}
          </div>
      );
  }
}

export default ContentList;

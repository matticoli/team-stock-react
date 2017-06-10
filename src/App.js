import React, {Component} from "react";

import "./App.css";
import Firebase from "firebase";
import ReactFireMixin from 'reactfire';
import ReactMixin from 'react-mixin';
import Toastr from 'toastr';

import ContentRoot from "./ContentRoot";
import Header from "./Header";
import ItemModal from "./ItemModal";
import EditModal from "./EditModal";
import Sidebar from "./Sidebar";


class App extends Component {
  componentWillMount() {
    this.firebaseInit();
    this.toastrSetup();
    this.setState(this.getInitState());
  }

  componentDidMount() {
      this.ref = Firebase.database().ref().child('sbhsrobotics_github_io'); //TODO: Swap this out for actual domain ref
      Firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
      this.bindAsArray(this.ref.child('categories'), "categories");
      this.bindAsObject(this.ref.child('categories'), "categoryData");
      this.bindAsArray(this.ref.child('items'), "items");
      this.bindAsArray(this.ref.child('settings'), "settings");
      this.bindAsArray(this.ref.child('teams'), "teams");
      this.bindAsArray(this.ref.child('users'), "users");
  }

  getInitState() {
      return ({
          categories: [],
          items: [],
          admin: {
              '.key': 'admin',
              '.value': false
          },
          user: null,
          selectedTeam: 'Storage',
          selectedItem: null
      });
  }

  render() {
      if(this.state.selectedItem) {
          return (<ItemModal handleItemSelect={this.handleItemSelect.bind(this)}
                             selectedItem={this.state.selectedItem}
                             itemData={this.state.items.find(
                                 (item) => {
                                    return item.name === this.state.selectedItem;
                                })
                             }
                             teams={this.state.teams}
                             dbref={this.ref.child('items').child(this.state.selectedItem)}/>);
      } else if(this.state.showEditModal) {
          return(<EditModal hideEditModal={this.hideEditModal.bind(this)}
                            items={this.state.items}
                            categories={this.getKeys(this.state.categories)}
                            categoryData={this.state.categoryData}
                            teams={this.getKeys(this.state.teams)}
                            users={this.state.users}
                            dbref={this.ref}/>);
      }

      return (
          <div className="App mdl-layout-container">
              <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                  <Header/>
                  <Sidebar teams={this.state.teams}
                           user={this.state.user}
                           firebase={Firebase}
                           itemClickHandler={this.handleSidebarAction.bind(this)}/>
                  <ContentRoot isAdmin={this.state.admin['.value']}
                               selectedTeam={this.state.selectedTeam}
                               categories={this.getKeys(this.state.categories)}
                               categoryData={this.state.categoryData || {}}
                               itemData={this.state.items}
                               handleItemSelect={this.handleItemSelect.bind(this)}
                               showEditModal={this.showEditModal.bind(this)}/>
              </div>
          </div>
      );
  }

  handleItemSelect(item) {
      this.setState({
          selectedItem: item
      });
  }

  showEditModal() {
      this.setState({
          showEditModal: true
      });
  }

  hideEditModal() {
      this.setState({
          showEditModal: false
      });
  }

  handleSidebarAction(action){
      if(!this.state.user) {
        Toastr.error("You must be signed in!");
        return;
      }

      switch(action) {
          case "Settings":
              break;
          default:
              if(action==='Storage' || this.getKeys(this.state.teams).includes(action)) {
                  this.setState({
                      selectedTeam: action
                  });
              } else {
                  Toastr.error("Error switching to team "+action);
              }
              break;
      }
  }

  getKeys(firebaseBoundArray) {
      let keys = [];
      for (let index in firebaseBoundArray) {
        keys.push(firebaseBoundArray[index]['.key']);
      }
      return keys;
  }

  getValues(firebaseBoundArray) {
      let values = [];
      for (let index in firebaseBoundArray) {
        values.push(firebaseBoundArray[index]['.value']);
      }
      return values;
  }

  firebaseInit() {

      var config = {
          apiKey: "AIzaSyDngY1_F-GtlyunvSOUKK4XJ3SE-5lSDnk",
          authDomain: "team-stock.firebaseapp.com",
          databaseURL: "https://team-stock.firebaseio.com",
          projectId: "team-stock",
          storageBucket: "team-stock.appspot.com",
          messagingSenderId: "407480016236"
      };
      Firebase.initializeApp(config);
  }

  toastrSetup() {
      Toastr.options = {
          'closeButton': true,
          'debug': false,
          'newestOnTop': false,
          'progressBar': false,
          'positionClass': 'toast-bottom-center',
          'preventDuplicates': false,
          'onclick': null,
          'showDuration': '3000',
          'hideDuration': '3000',
          'timeOut': '3000',
          'extendedTimeOut': '3000',
          'showEasing': 'swing',
          'hideEasing': 'linear',
          'showMethod': 'fadeIn',
          'hideMethod': 'fadeOut'
      }
  }
  onAuthStateChanged(user) {
      if(user && this.state.isAdmin===undefined) {
          this.bindAsObject(this.ref.child('users').child(user.uid).child('admin'), "admin");
      }
      this.saveUserIfNew(user);
      this.setState({
          user: user
      });
  }

    saveUserIfNew(user) {

        // If database isn't initialized, wait until it is
        if (!this.ref) {
            this.saveUserIfNew(user);
            return;
        }

        // Get reference to user entry in database
        const userRef = this.ref.child('users').child(user.uid);

        // Check if user exists
        userRef.once('value').then(function (snapshot) {
            if(snapshot && snapshot.val() != null) {
                // User already exists
                Toastr.success('Welcome back, ' + user.displayName + '!')
                // Check if user has permission to access database
                // If not, show access denied toast
                if (!(snapshot.val().active)) {
                    Toastr.error('You do not have permission to access the database.', 'Uh oh..');
                }
            } else {
                // User does not exist, add user
                console.log('Adding new user to database...');
                userRef.set({ // Note: New user can not write to 'active' property, so it must be omitted until an admin activates the user.
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    pic: user.photoURL
                }).then(function () {
                    console.log('New user added successfully!');
                    Toastr.success('Welcome, ' + user.displayName + '!');
                    // this.slack.bind(this)('_New user *'+user.displayName+' - '+user.email+'* has logged in for the first time._\n' +
                    //     '_An admin must log in to enable this account._');
                }.bind(this)).catch(function (error) {
                    Toastr.error("Error creating new user - please contact database administrator");
                    // console.error('Error writing new user to Firebase Database', error);
                    Toastr.error('Error saving new user to database. You may need to sign out and sign back in.', 'Uh oh...');
                });
            }
        }.bind(this));
    }
}



ReactMixin(App.prototype, ReactFireMixin);

export default App;

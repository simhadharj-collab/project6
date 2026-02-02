import React, { Component } from 'react';
import './App.css';
import { APIURL, callApi } from './lib';
export default class App extends Component {
  constructor(){
    super();
    this.state = { data: [], showpopup: false, userdata: null };
    this.getData = this.getData.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }
  componentDidMount()
  {
    callApi("GET",APIURL,"",this.getData);
  }
  getData(res)
  {
    this.setState({data:res});
  }
  showUserInfo(user){
    this.setState({ showpopup: true, userdata: user });
  }
  closeUserInfo(){
    this.setState({ showpopup: false, userdata: null });
  }
  render() {
    const { data, showpopup, userdata } = this.state;
    return (
      <div className="app">
        <div className="header">example for API fetch functions</div>
        <div className="section">
          <h1>welcome</h1>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>username</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id} onClick={() => this.showUserInfo(user)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='footer'>2500031371 </div>

        {showpopup && (
          <div className='overlay'>
            <div className='popup'>
              <div className='popupHeader'>
                <button onClick={this.closeUserInfo}>X</button>
              </div>
              <div className='popupSection'>
                <p>
                  <span>ID</span>
                  <span>{userdata?.id}</span>
                </p>
                <p>
                  <span>Name</span>
                  <span>{userdata?.name}</span>
                </p>
                <p>
                  <span>Username</span>
                  <span>{userdata?.username}</span>
                </p>
                <p>
                  <span>Email ID</span>
                  <span>{userdata?.email}</span>
                </p>
                <p>
                  <span>Address</span>
                  <span>{userdata?.address?.street}, {userdata?.address?.city} - {userdata?.address?.zipcode}</span>
                </p>
                <p>
                  <span>Phone</span>
                  <span>{userdata?.phone}</span>
                </p>
                <p>
                  <span>Website</span>
                  <span>{userdata?.website}</span>
                </p>
                <p>
                  <span>Company</span>
                  <span>{userdata?.company?.name}<br/>{userdata?.company?.bs}</span>
                </p>
              </div>
              <div className='popupFooter'></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
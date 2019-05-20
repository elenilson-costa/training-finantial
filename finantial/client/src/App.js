import React, { Component } from 'react';
import './App.css';
import MainMenu from './MainMenu';
import Customers from './customers/Customers';

class App extends Component {

  state = {
    bodyExpanded: true
  }
  
  styleBody(){
    if (this.state.bodyExpanded){
        return 'bodyExpanded';
    }else{
        return 'bodyNotExpanded';
    }
  }

  styleBodyChange(){
    console.log("styleBodyChange ini: "+this.state.bodyExpanded);
    const status = ! this.state.bodyExpanded;
    console.log("const: "+status);
    this.setState({bodyExpanded: status});
    console.log("styleBodyChange Fim: "+this.state.bodyExpanded);
  }

  render() {
    return (
      <div className="div-Main">
        <div className="header">
          <h1 className="title">EpcCloud</h1>
        </div>
        <MainMenu bodyHandler={()=>this.styleBodyChange()} />
        <div className={this.styleBody()}>
          <Customers/>
        </div>
      </div>
    );
  }
}

export default App;

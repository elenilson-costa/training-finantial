import React, { Component } from 'react';
import './App.css';
import MainMenu from './MainMenu';
import Customers from './customers/Customers';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class App extends Component {

  state = {
    bodyExpanded: true,
    forms:{
      customer: { tabTitle: "Customers",command: <Customers key="45679" closeForm={()=>this.closeForm()}/> }
    },
    tabControl:{
           currentTab: 0,
           tab1: { title: "Customers", command: <Customers key="45678" closeForm={()=>this.closeForm()}/> },
           tab2: { title: "", command: "" },
           tab3: { title: "", command: "" },
           tab4: { title: "", command: "" },
           tab5: { title: "", command: "" }
    }
  }

  closeForm(){
    const tabControl = this.state.tabControl;
    if (tabControl.currentTab === 0){
      tabControl.tab1.title = "";
      tabControl.tab1.command = "";
    }else if(tabControl.currentTab === 1){
      tabControl.tab2.title = "";
    }else if(tabControl.currentTab === 2){
      tabControl.tab3.title = "";
    }else if(tabControl.currentTab === 3){
      tabControl.tab4.title = "";
    }else if(tabControl.currentTab === 4){
      tabControl.tab5.title = "";
    }
    this.setState({tabControl: tabControl});
  }

  showForm(formName){
    const tabControl = this.state.tabControl;
    if (tabControl.tab1.title === ""){
      tabControl.tab1.title = Object.assign({}, this.state.forms[formName].tabTitle);
      tabControl.tab1.command = <Customers key="Customers1" closeForm={()=>this.closeForm()}/>;

    }else if(tabControl.tab2.title === ""){
      
      tabControl.tab2.title = "Customers";
      tabControl.tab2.command = ()=> {return <Customers key="Customers1" closeForm={()=>this.closeForm()}/>};

    }else if(tabControl.tab3.title === ""){
      
    }else if(tabControl.tab4.title === ""){
      
    }else if(tabControl.tab5.title === ""){
      
    }

    this.setState({tabControl: tabControl});

  }

  styleBody(){
    if (this.state.bodyExpanded){
        return 'bodyExpanded';
    }else{
        return 'bodyNotExpanded';
    }
  }

  styleBodyChange(){
    const status = ! this.state.bodyExpanded;
    this.setState({bodyExpanded: status});
  }

  render() {
    return (
      <div className="div-Main">
        <div className="header">
          <h1 className="title">Archer Cloud Services</h1>
        </div>
        <MainMenu bodyHandler={()=>this.styleBodyChange()} showForm={(formName)=>this.showForm(formName)} />
        <div className={this.styleBody()}>
          
            <Tabs onSelect={(index)=>{
                                        const tabControl = this.state.tabControl;
                                        tabControl.currentTab = index;
                                        this.setState({tabControl: tabControl});
                                     }}
                  key="Tabs1">
              <TabList key="TabList1">
                <Tab key="tab1">{this.state.tabControl.tab1.title}</Tab>
                <Tab key="tab2">{this.state.tabControl.tab2.title}</Tab>
                <Tab key="tab3">{this.state.tabControl.tab3.title}</Tab>
                <Tab key="tab4">{this.state.tabControl.tab4.title}</Tab>
                <Tab key="tab5">{this.state.tabControl.tab5.title}</Tab>
              </TabList>

              <TabPanel key="TabPanel1">{this.state.tabControl.tab1.command}</TabPanel>
              <TabPanel key="TabPanel2">{this.state.tabControl.tab2.command}</TabPanel>
              <TabPanel key="TabPanel3">{this.state.tabControl.tab3.command}</TabPanel>
              <TabPanel key="TabPanel4">{this.state.tabControl.tab4.command}</TabPanel>
              <TabPanel key="TabPanel5">{this.state.tabControl.tab5.command}</TabPanel>

            </Tabs>

        </div>
      </div>
    );
  }
}

export default App;

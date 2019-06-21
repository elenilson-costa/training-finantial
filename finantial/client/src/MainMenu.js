import React, { Component } from 'react';
import './App.css';
import MenuTreeComponent from './MenuTreeComponent';
import MenuIcon from '@material-ui/icons/Menu';

class MainMenu extends Component {

    state = {
        menuOpened: true
    }
    
    styleMenu(){
        if (this.state.menuOpened){
            return 'menuOpened';
        }else{
            return 'menuClosed';
        }
    }

    styleChange(){
        this.setState({menuOpened: ! this.state.menuOpened});
        console.log("execução");
        this.props.bodyHandler();
    }

    render(){
        return (
            <div className={this.styleMenu()}>
                <button className="menuIcon" onClick={e=>this.styleChange(e)}>
                    <MenuIcon/>
                </button>
                <div className="menuDimension">
                    <MenuTreeComponent showForm={(formName)=>this.props.showForm(formName)}/>
                </div>
            </div>
        );
    }

}

export default MainMenu;
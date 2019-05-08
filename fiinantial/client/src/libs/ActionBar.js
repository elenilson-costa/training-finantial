import React from "react";
import "./ActionBar.css";

import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import Search from '@material-ui/icons/Search';
import AddCircle from '@material-ui/icons/AddCircle';
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Refresh from '@material-ui/icons/Refresh';
import Close from '@material-ui/icons/Close';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import List from '@material-ui/icons/List';
import Print from '@material-ui/icons/Print';

class ActionBar extends React.Component{
  
    state = {
        formMode: "empty", //empty, noempty, search, insert, edit
        styleDisabledColor: "grey",
        checkButtonStatus: "disabled",
        cancelButtonStatus: "disabled",
        searchButtonStatus: "enabled",
        addButtonStatus: "enabled",
        editButtonStatus: "disabled",
        deleteButtonStatus: "disabled",
        refreshButtonStatus: "enabled",
        firstButtonStatus: "disabled",
        previousButtonStatus: "disabled",
        nextButtonStatus: "disabled",
        lastButtonStatus: "disabled",
        tableButtonStatus: "enabled",
        printButtonStatus: "disabled"
    }

    //empty, noempty, search, insert, edit
    setFormMode(mode){
        if (mode==="empty"){
            this.setState(
                {
                    formMode: "empty",
                    checkButtonStatus: "disabled",
                    cancelButtonStatus: "disabled",
                    searchButtonStatus: "enabled",
                    addButtonStatus: "enabled",
                    editButtonStatus: "disabled",
                    deleteButtonStatus: "disabled",
                    refreshButtonStatus: "enabled",
                    firstButtonStatus: "disabled",
                    previousButtonStatus: "disabled",
                    nextButtonStatus: "disabled",
                    lastButtonStatus: "disabled",
                    tableButtonStatus: "enabled",
                    printButtonStatus: "disabled"
                }
            );

            this.props.stateController(
                this.props.blockLib.setObjectReadOnly(this.props.callerState, true)
            );

        }else if (mode==="noempty"){
            this.setState(
                {
                    formMode: "noempty",
                    checkButtonStatus: "disabled",
                    cancelButtonStatus: "disabled",
                    searchButtonStatus: "enabled",
                    addButtonStatus: "enabled",
                    editButtonStatus: "enabled",
                    deleteButtonStatus: "enabled",
                    refreshButtonStatus: "enabled",
                    firstButtonStatus: "enabled",
                    previousButtonStatus: "enabled",
                    nextButtonStatus: "enabled",
                    lastButtonStatus: "enabled",
                    tableButtonStatus: "enabled",
                    printButtonStatus: "disabled"
                }
            );
            this.props.stateController(
                this.props.blockLib.setObjectReadOnly(this.props.callerState, true)
            );
        }else if (mode==="search"){
            this.setState(
                {
                    formMode: "search",
                    checkButtonStatus: "enabled",
                    cancelButtonStatus: "enabled",
                    searchButtonStatus: "disabled",
                    addButtonStatus: "disabled",
                    editButtonStatus: "disabled",
                    deleteButtonStatus: "disabled",
                    refreshButtonStatus: "disabled",
                    firstButtonStatus: "disabled",
                    previousButtonStatus: "disabled",
                    nextButtonStatus: "disabled",
                    lastButtonStatus: "disabled",
                    tableButtonStatus: "disabled",
                    printButtonStatus: "disabled"
                }
            );
            
            this.props.stateController(
               this.props.blockLib.clear(this.props.callerState)
            );

            this.props.stateController(
                this.props.blockLib.setObjectReadOnly(this.props.callerState, false)
            );

        }else if (mode==="insert"){
            this.setState(
                {
                    formMode: "insert",
                    checkButtonStatus: "enabled",
                    cancelButtonStatus: "enabled",
                    searchButtonStatus: "disabled",
                    addButtonStatus: "disabled",
                    editButtonStatus: "disabled",
                    deleteButtonStatus: "disabled",
                    refreshButtonStatus: "disabled",
                    firstButtonStatus: "disabled",
                    previousButtonStatus: "disabled",
                    nextButtonStatus: "disabled",
                    lastButtonStatus: "disabled",
                    tableButtonStatus: "disabled",
                    printButtonStatus: "disabled"
                 }
            );

            this.props.stateController(
                this.props.blockLib.clear(this.props.callerState)
             );
 
            this.props.stateController(
                this.props.blockLib.setObjectReadOnly(this.props.callerState, false)
            );

            /* To be implemented. After Insert Click.
            const objectConfig = this.props.blockLib.getObjectConfig(this.props.callerState);

            if (typeof objectConfig.afterInsertMode() !== undefined){
                
                this.props.stateController(
                    this.props.blockLib.getObject(this.props.callerState)[
                        this.props.blockLib.getObjectName(this.props.callerState)
                    ] = objectConfig.afterInsertMode()
                );

            }*/

        }else if (mode==="edit"){
            this.setState(
                {
                    formMode: "insert",
                    checkButtonStatus: "enabled",
                    cancelButtonStatus: "enabled",
                    searchButtonStatus: "disabled",
                    addButtonStatus: "disabled",
                    editButtonStatus: "disabled",
                    deleteButtonStatus: "disabled",
                    refreshButtonStatus: "disabled",
                    firstButtonStatus: "disabled",
                    previousButtonStatus: "disabled",
                    nextButtonStatus: "disabled",
                    lastButtonStatus: "disabled",
                    tableButtonStatus: "disabled",
                    printButtonStatus: "disabled"
                 }
            );
            this.props.stateController(
                this.props.blockLib.setObjectReadOnly(this.props.callerState, false)
            );

        }
    }

    clickCheck(){
        if (this.state.formMode === "search"){
            try{
                this.props.executeQuery();
                this.setFormMode("noempty");
            }catch(exception){
                console.log(exception);
            }
            
        }else if (this.state.formMode === "insert"){
            try{
                this.props.insertData();
            }catch(exception){
                console.log(exception);
            }
        }
    }
    
    clickCancel(){
        const backupObject = this.props.blockLib.returnObjectBackup(this.props.callerState);
        this.props.stateController(
            backupObject
        );
        if (this.props.blockLib.objectIsClear(backupObject)){
            this.setFormMode("empty");
        }else{
            this.setFormMode("noempty");
        }

    }

    clickNext(){
        this.props.stateController(
            this.props.blockLib.recordsNav(this.props.callerState, 'NEXT')
        );
    }

    clickPrevious(){
        this.props.stateController(
            this.props.blockLib.recordsNav(this.props.callerState, 'PREVIOUS')
        );
    }

    clickFirst(){
        this.props.stateController(
            this.props.blockLib.recordsNav(this.props.callerState, 'FIRST')
        );
    }

    clickLast(){
        this.props.stateController(
            this.props.blockLib.recordsNav(this.props.callerState, 'LAST')
        );
    }

    clickEdit(){
        this.setFormMode("edit");
        this.props.stateController(
            this.props.blockLib.setObjectReadOnly(this.props.callerState, false)
        );

    }

    render(){
        return(
            <div className="actionbar">
                <button className="buttons" 
                        style={{left:"15px", top: "2px", color: this.state.checkButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                        disabled={this.state.checkButtonStatus==="disabled"}
                        title="Confirm"
                        onClick={()=>this.clickCheck()}>
                        <CheckCircle/>
                </button>

                <button className="buttons" style={{left:"60px", top: "2px", color: this.state.cancelButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.cancelButtonStatus==="disabled"}
                title="Cancel"
                onClick={(x)=>this.clickCancel()}>
                    <Cancel/>
                </button>

                <button className="buttons" style={{left:"150px", top: "2px", color: this.state.searchButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                        disabled={this.state.searchButtonStatus==="disabled"}
                        title="Search"
                        onClick={(x)=>(this.setFormMode("search"))}>
                    <Search/>
                </button>

                <button className="buttons" style={{left:"195px", top: "2px", color: this.state.addButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.addButtonStatus==="disabled"}
                title="Add"
                onClick={(x)=>(this.setFormMode("insert"))}>
                    <AddCircle/>
                </button>

                <button className="buttons" style={{left:"240px", top: "2px", color: this.state.editButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.editButtonStatus==="disabled"}
                title="Edit"
                onClick={(x)=>(this.clickEdit())}>
                    <Edit/>
                </button>

                <button className="buttons" style={{left:"285px", top: "2px", color: this.state.deleteButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.deleteButtonStatus==="disabled"}
                title="Delete">
                    <DeleteForever/>
                </button>

                <button className="buttons" style={{left:"330px", top: "2px", color: this.state.refreshButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.refreshButtonStatus==="disabled"}
                title="Refresh"
                onClick={(x)=>(this.setFormMode("refresh"))}>
                    <Refresh/>
                </button>

                <button className="buttons" style={{left:"420px", top: "2px", color: this.state.firstButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.firstButtonStatus==="disabled"}
                title="First Record"
                onClick={()=>this.clickFirst()}>
                    <FirstPage/>
                </button>

                <button className="buttons" style={{left:"465px", top: "2px", color: this.state.previousButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.previousButtonStatus==="disabled"}
                title="Previous Record"
                onClick={()=>this.clickPrevious()}>
                    <ChevronLeft/>
                </button>

                <button className="buttons" style={{left:"510px", top: "2px", color: this.state.nextButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.nextButtonStatus==="disabled"}
                title="Next Record"
                onClick={()=>this.clickNext()}>
                    <ChevronRight/>
                </button>

                <button className="buttons" style={{left:"555px", top: "2px", color: this.state.lastButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.lastButtonStatus==="disabled"}
                title="Last Record"
                onClick={()=>this.clickLast()}>
                    <LastPage/>
                </button>

                <button className="buttons" style={{left:"645px", top: "2px", color: this.state.tableButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.tableButtonStatus==="disabled"}
                title="Toggle Form/Table">
                    <List/>
                </button>

                <button className="buttons" style={{left:"690px", top: "2px", color: this.state.printButtonStatus === "disabled" ? this.state.styleDisabledColor : ""  }}
                disabled={this.state.printButtonStatus==="disabled"}
                title="Print">
                    <Print/>
                </button>

                <button className="buttons" style={{left:"960px", top: "2px"}} title="Close Form"><Close/></button>
            </div>
        );
    }
}

export default ActionBar;

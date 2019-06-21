import React from 'react';
import './App.css';
import { Treebeard } from 'react-treebeard';
import {treeBeardTheme} from './TreeOverrides';

const data = {
    id: "0|Financial",
    name: 'Financial',
    toggled: true,
    children: [
        {
            id: "1|Registers",
            name: 'Registers',
            children: [
                { id: "11|registers_customers", name: 'Customers' },
                { id: "12|child2", name: 'child2' }
            ]
        },
        {
            id: "1|Transactions",
            name: 'Transactions',
            loading: true,
            children: []
        },
        {
            id: "1|Reports",
            name: 'Reports',
            children: [
                {
                    id: '21|nested parent',
                    name: 'nested parent',
                    children: [
                        { id: "nested child 1" , name: 'nested child 1' },
                        { id: "nested child 2", name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

class MenuTreeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {cursor: ''};
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle(node, toggled){
        if(this.state.cursor){
            let cursor = this.state.cursor;
            cursor.active = false
            this.setState({cursor: cursor})
        }
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });

        if (node.id === "11|registers_customers"){
            this.props.showForm("customer");
        }
    }
    render(){

        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
                decorators={this.decorators}
                style={treeBeardTheme}
            />
        );
    }

}

export default MenuTreeComponent;
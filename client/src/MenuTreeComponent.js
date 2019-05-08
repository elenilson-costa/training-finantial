import React from 'react';
import './App.css';
import { Treebeard } from 'react-treebeard';
import {treeBeardTheme} from './TreeOverrides';

const data = {
    name: 'Financial',
    toggled: true,
    children: [
        {
            name: 'Registers',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'Transactions',
            loading: true,
            children: []
        },
        {
            name: 'Reports',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
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
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
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
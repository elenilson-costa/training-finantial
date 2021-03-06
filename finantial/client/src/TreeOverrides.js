import React from 'react';
import {decorators, theme} from 'react-treebeard';


// theme.tree.base.backgroundColor = props.theme.palette.background.paper;
theme.tree.base.backgroundColor = '#21252B';
theme.tree.base.color = 'black';
theme.tree.node.activeLink.background = '#21252B';
theme.tree.node.toggle.arrow.fill = '#428BCA';
theme.tree.node.toggle.width = 10;
theme.tree.node.toggle.height = 10;
theme.tree.node.header.base.color = '#428BCA';
theme.tree.node.loading.color = 'orange';

export const treeBeardTheme = theme;

export class TreeContainer extends decorators.Container {
    renderToggleDecorator() {
        const {style, node} = this.props;

        if (node.isRoot) {
            return <div/>;
        }

        return <decorators.Toggle style={style.toggle}/>;
    }
}

const defaultHeader = decorators.Header;

export function getTreeDecorators(LeafItem, leafProps) {
    decorators.Container = TreeContainer;

    decorators.Header = (props) => {
        /* eslint-disable */
        if (props.node.isRoot) {
            return <div/>;
        } else if (props.node.isFolder) {
            return defaultHeader(props);
        }
        /* eslint-enable */
        return <LeafItem nodeData={props.node} {...leafProps}/>;
    };
}

import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    
    render() {
        const {
            col,
            isFinishNode,
            isStartNode,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
        } = this.props;
        const extraClassName = isFinishNode
            ? 'node-finish'
            : isStartNode
            ? 'node-start'
            : isWall
            ? 'node-wall'
            : '';

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
            </div>
        );
    }
}

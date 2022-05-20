import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getShortestPath } from '../Algorithms/dijkstra';
import './PathfindingSimulator.css'

//Starting Points for StartNode and FinishNode
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingSimulator extends Component {
	constructor() {
		super();
		this.state = {
			grid: [],
			mouseIsPressed: false,
		};
	}

	componentDidMount() {
		const grid = getGrid();
		this.setState({ grid });
	}

	handleMouseDown(row, col) {
		const newGrid = getGrid_withWalls(this.state.grid, row, col);
		this.setState({ grid: newGrid, mouseIsPressed: true });
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed) { return; }
		const newGrid = getGrid_withWalls(this.state.grid, row, col);
		this.setState({ grid: newGrid });
	}

	handleMouseUp() {
		this.setState({ mouseIsPressed: false });
	}

	searchAnimation(visitedNodesInOrder, ShortestPath) {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					this.pathFound(ShortestPath);
				}, 10 * i);
				return;
			}
			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
			}, 10 * i);
		}
	}

	pathFound(ShortestPath) {
		for (let i = 0; i < ShortestPath.length; i++) {
			setTimeout(() => {
				const node = ShortestPath[i];
				document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
			}, 50 * i);
		}
	}

	dijkstraVisualization() {
		const {grid} = this.state;
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
		const ShortestPath = getShortestPath(finishNode);
		this.searchAnimation(visitedNodesInOrder, ShortestPath);
	}

	render() {
		const {grid, mouseIsPressed} = this.state;

		return (
			<>
				<button onClick={() => this.dijkstraVisualization()}>
					Visualize Dijkstra's Algorithm
				</button>
				<div className="grid">
					{grid.map((row, rowIdx) => {
						return (
							<div key={rowIdx}>
								{row.map((node, nodeIdx) => {
									const { row, col, isFinishNode, isStartNode, isWall } = node;
									return (
										<Node
											key={nodeIdx}
											col={col}
											isFinishNode={isFinishNode}
											isStartNode={isStartNode}
											isWall={isWall}
											mouseIsPressed={mouseIsPressed}
											onMouseDown={(row, col) => this.handleMouseDown(row, col)}
											onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
											onMouseUp={() => this.handleMouseUp()}
											row={row}>
										</Node>
									);
								})}
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

const getGrid = () => {
	const grid = [];
	for (let row = 0; row < 20; row++) {
		const currentRow = [];
		for (let col = 0; col < 50; col++) {
			currentRow.push(createNode(col, row));
		}
		grid.push(currentRow);
	}
	return grid;
};

const createNode = (col, row) => {
	return {
		col,
		row,
		isStartNode: row === START_NODE_ROW && col === START_NODE_COL,
		isFinishNode: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
		distance: Infinity,
		isVisited: false,
		isWall: false,
		previousNode: null,
	};
};

const getGrid_withWalls = (grid, row, col) => {
	const newGrid = grid.slice();
	const node = newGrid[row][col];
	const newNode = {
		...node,
		isWall: !node.isWall,
	};
	newGrid[row][col] = newNode;
	return newGrid;
};
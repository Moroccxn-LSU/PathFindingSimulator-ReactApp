/*Dijkstra's algorithm was taught in my Adv. Data. Str. class and it can find the shortest path
 in O(V + Elog(V)) time by keeping track of which nodes were visited and which were not. This is 
 done by making each node point to its previous and once the shortest path is computed it backtracks
 from the last node and outputs the visited nodes in order to achieve that shortest path*/


export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getNodes(grid);

    while (!!unvisitedNodes.length) {
        sortNodes_Dist(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) { continue; }
        if (closestNode.distance === Infinity) { return visitedNodesInOrder; }

        closestNode.isVisted = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) { return visitedNodesInOrder; }
        updateNeighbors(closestNode, grid);
    }
}

function sortNodes_Dist(unvisitedNodes) {
    unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

function updateNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) { neighbors.push(grid[row - 1][col]); }
    if (row < grid.length - 1) { neighbors.push(grid[row + 1][col]); }
    if (col > 0) { neighbors.push(grid[row][col - 1]); }
    if (col < grid[0].length - 1) { neighbors.push(grid[row][col + 1]); }

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getNodes(grid) {
    const nodes = [];

    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }

    return nodes;
}

export function getShortestPath(finishNode) {
    const nodesShortestPath = [];
    let currentNode = finishNode;

    while (currentNode !== null) {
        nodesShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesShortestPath;
}
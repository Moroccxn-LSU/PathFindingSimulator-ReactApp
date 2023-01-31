// A* Pathfinding Algorithm in Javascript
// Exportable function for use in React.js App

export function aStarPathfinding(startNode, endNode, grid) {

    // Create an open list and closed list to keep track of nodes
    let openList = [];
    let closedList = [];
  
    // Add the starting node to the open list
    openList.push(startNode);
  
    // Loop until the end node is found or the open list is empty
    while (openList.length > 0) {
  
      // Get the node with the lowest fScore from the open list and add it to the closed list
      let currentNode = getLowestFScoreNode(openList);
      closedList.push(currentNode);
  
      // If we have reached our destination, return the path we took to get there
      if (currentNode === endNode) {
        return getPath();
      }
  
      // Get all adjacent nodes of current node and add them to the open list if they are not already in it or in the closed list. Calculate their scores as well. 
      let adjacentNodes = getAdjacentNodes(currentNode, grid);
  
      for (let i = 0; i < adjacentNodes.length; i++) {
  
        let adjacentNode = adjacentNodes[i];
  
        if (!openList.includes(adjacentNode) && !closedList.includes(adjacentNode)) {
  
          // Calculate scores for this node and add it to our open list of nodes to explore next iteration  									  
          adjacentNode.gScore = currentNode.gScore + 1;   // Distance from start node + 1 for each step taken from current node  				  
          adjacentNode.hScore = calculateHScore(adjacentNode, endNode);   // Heuristic score - estimated distance from end node  		    
          adjacentNode.fScore = adjacentNode.gScore + adjacentNode.hScore;   // Total score - g + h scores combined  	    
  
          openList.push(adjacentNode);    
  
        } else {    
  
          let existingFScore = calculateFScore(adjacentNodes[i]);    
  
          if (existingFScore > currentFScore) {      
  
            // Update g, h and f scores of this node      
            adjacentNodes[i].gScore = currentGScore + 1;      
            adjacentNodes[i].hScore = calculateHscore(adjacentNodes[i], endnode);      
            adjacentNodes[i].fscore = existingFscore;    
  
          }    
  
        }  
  
      }  
  
    }  
  
    return false; // No path found!  
  }
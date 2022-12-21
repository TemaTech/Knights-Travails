function knightMoves(start, end) {
    const root = new Node(start, null, null);
    const queue = [root];
    const visited = new Set();
    let shortestPath = [start];

    while(queue.length > 0) {
        const current = queue.shift();
        visited.add(`${current.position[0]},${current.position[1]}`);

        if (current.position[0] == end[0] && current.position[1] == end[1]) {
            return visited;
        }

        const moves = generateMoves(current.position);

        for (const move of moves) {
            if (!visited.has(`${move[0]},${move[1]}`)) {
                const child = new Node(move, null, null);
                if ((child.position[0] + child.position[1]) < (current.position[0] + current.position[1])) {
                    current.left = child;
                } else {
                    current.right = child;
                }
                queue.push(child);
            }
        }
    }
}

class Node {
    constructor(position, left, right) {
        this.position = position;
        this.left = left;
        this.right = right;
    }
}

function generateMoves(position) {
    const posX = position[0];
    const posY = position[1];

    const directions = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [-2, 1], [2, -1], [-2, -1]];

    const moves = [];

    for (let d of directions) {
        const newArr = [posX + d[0], posY + d[1]];
        if ((newArr[0] >= 0 && newArr[0] <= 8) && (newArr[1] >= 0 && newArr[1] <= 8)) {
            moves.push(newArr);
        }
    }

    return moves;
}

// Create a function that will use data about root, left, right, to find the shortest path in this binary tree to the node user is looking for.
function getPath(root, node) {
    if (root === null) {
        return null;
    }

    if (root.position[0] === node[0] && root.position[1] === node[1]) {
        return [root.position];
    }

    const leftPath = getPath(root.left, node);
    const rightPath = getPath(root.right, node);

    if (leftPath !== null) {
        return [root.position].concat(leftPath);
    } else if (rightPath !== null) {
        return [root.position].concat(rightPath);
    } else {
        return null;
    }
}

console.log(knightMoves([0,0], [3,3])); // [[0,0],[1,2]]

// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]
// knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]
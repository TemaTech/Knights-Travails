function knightMoves(A, B) {
    // Add nodes
    const gameboard = new Map();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            gameboard.set(`${i},${j}`, []);
        }
    }

    // Add edges
    for (let square of gameboard) {
        const arr = square[0].split(',');
        arr[0] = parseInt(arr[0]);
        arr[1] = parseInt(arr[1]);

        square[1] = allPossibleMoves(arr[0], arr[1]);

        gameboard.set(square[0], square[1]);
    }

    function bfs(start, visited = new Set(), path = []) {
        path.push(start);
        visited.add(`${start[0]},${start[1]}`);
        const moves = gameboard.get(start.splice(',').join(',').toString());

        
        for (const move of moves) {
            if (move[0] == B[0] && move[1] == B[1]) {
                console.log(path)
                return path;
            } else if (!visited.has(`${move[0]},${move[1]}`)) {
                dfs(move, visited, path);
            }
        }
    }
    return dfs(A)
}

function allPossibleMoves(x, y) {
    const allPossibleMoves = [];

    const moves = [
        [x + 1, y + 2],
        [x - 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y - 2],
        [x + 2, y + 1],
        [x - 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y - 1]
    ];

    for (let move of moves) {
        if (move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8) {
            allPossibleMoves.push(move);
        }
    }

    return allPossibleMoves
}

console.log(knightMoves([0, 0],[3, 3]));

// > knightMoves([3,3],[4,3])
// => You made it in 3 moves!  Here's your path:
//   [3,3]
//   [4,5]
//   [2,4]
//   [4,3]
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

    function bfs(start, end) {
        const queue = [[start, []]];
        const visited = new Set();

        while(queue.length > 0) {
            const [pos, path] = queue.shift();
            visited.add(`${pos[0]},${pos[1]}`);

            if (pos[0] === end[0] && pos[1] === end[1]) {
                return path;
            }

            const moves = gameboard.get(`${pos[0]},${pos[1]}`);
            for (const move of moves) {
                if (!visited.has(`${move[0]},${move[1]}`)) {
                    queue.push([move, [...path, move]]);
                }
            }
        }
        
        return null;
    }
    const path = bfs(A, B);
    path.unshift(A)
    if (path) {
        console.log(`You made it in ${path.length} moves! Here's your path:`);
        console.log(path);
    } else {
        console.log(`No path was found from ${A} to ${B}, try again :(`);
    }
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

console.log(knightMoves([3, 3],[4, 3]));

// > knightMoves([3,3],[4,3])
// => You made it in 3 moves!  Here's your path:
//   [3,3]
//   [4,5]
//   [6,4]
//   [4,3]
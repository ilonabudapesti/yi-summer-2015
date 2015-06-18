var o = "water"; // water
var M = "land"; // land

var board = [ 
  [o,o,o,o,M,o,o,o,o,o],
  [o,o,o,M,M,o,o,o,o,o],
  [o,o,o,o,M,o,o,M,M,o],
  [o,o,M,o,M,o,o,o,M,o],
  [o,o,o,o,M,M,o,o,o,o],
  [o,o,o,M,M,M,M,o,o,o],
  [M,M,M,M,M,M,M,M,M,M],
  [o,o,M,M,o,M,M,M,o,o],
  [o,o,o,o,o,M,M,o,o,o],
  [M,o,o,o,M,M,o,o,o,o]
];

function continentCounter (board, x, y) {
  // we fell off the board
  // or we fell into water
  if (x < 0 || x > 9 || y < 0 || y > 9 || board[x][y] === "water") {
    return 0;
  }

  var count = 1;
  board[x][y] = true;

  count = count + continentCounter(board, x-1, y-1);
  count = count + continentCounter(board, x-1, y);
  count = count + continentCounter(board, x-1, y+1);

  count = count + continentCounter(board, x, y-1);
  count = count + continentCounter(board, x, y+1);


  count = count + continentCounter(board, x+1, y-1);
  count = count + continentCounter(board, x+1, y);
  count = count + continentCounter(board, x+1, y+1);


  return count;
}

continentCounter(board,  0, 4); // 31

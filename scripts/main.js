const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

let field = [
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	[6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	[6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	[6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	[6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	[6, 7, 0, 1, 2, 3, 4, 5, 6, 7]
];

let tetrisBlocks = [];
let imgSources =
[
	"/images/GreyBlock.png",
	"/images/RedBlock.png",
	"/images/OrangeBlock.png",
	"/images/YellowBlock.png",
	"/images/GreenBlock.png",
	"/images/CyanBlock.png",
	"/images/BlueBlock.png",
	"/images/PurpleBlock.png"
];

let loadCount = 0;

for (let i = 0; i < imgSources.length; i++)
{
	let img = new Image();
	img.src = imgSources[i];
	tetrisBlocks.push(img);
	tetrisBlocks[i].onload = function()
	{
		loadCount++;
		if (loadCount == imgSources.length)
		{
			startGame();
		}
	}
}

class Tetromino
{
	constructor(colorIndex, uprightMatrix, rightMatrix, upsideDownMatrix, leftMatrix)
	{
		this.colorIndex = colorIndex;
		this.matrices = [uprightMatrix, rightMatrix, upsideDownMatrix, leftMatrix];
	}
}

//I don't really like calling them by these names but its easier for making the variables short so whatever ^\/(:/)\/^
//Also this is pretty long so I might come back to this at some point and move it into another file or something, idk
let zPiece = new Tetromino
(
	1,
	//Upright
	[
		[1,1,0],
		[0,1,1],
		[0,0,0]
	],
	//Right
	[
		[0,0,1],
		[0,1,1],
		[0,1,0]
	],
	//Upside down
	[
		[0,0,0],
		[1,1,0],
		[0,1,1]
	],
	//Left
	[
		[0,0,1],
		[0,1,1],
		[0,1,0]
	]
);
let lPiece = new Tetromino
(
	2,
	//Upright
	[
		[0,0,1],
		[1,1,1],
		[0,0,0]
	],
	//Right
	[
		[0,1,0],
		[0,1,0],
		[0,1,1]
	],
	//Upside down
	[
		[0,0,0],
		[1,1,1],
		[1,0,0]
	],
	//Left
	[
		[1,1,0],
		[0,1,0],
		[0,1,0]
	]
);
let oPiece = new Tetromino
(
	3,
	//Upright
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	],
	//Right
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	],
	//Upside down
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	],
	//Left
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	]
);
let sPiece = new Tetromino
(
	4,
	//Upright
	[
		[0,1,1],
		[1,1,0],
		[0,0,0]
	],
	//Right
	[
		[0,0,1],
		[0,1,1],
		[0,1,0]
	],
	//Upside down
	[
		[0,1,1],
		[1,1,0],
		[0,0,0]
	],
	//Left
	[
		[0,0,1],
		[0,1,1],
		[0,1,0]
	]
);
let iPiece = new Tetromino
(
	5,
	//Upright
	[
		[0,0,0,0],
		[1,1,1,1],
		[0,0,0,0],
		[0,0,0,0]
	],
	//Right
	[
		[0,0,1,0],
		[0,0,1,0],
		[0,0,1,0],
		[0,0,1,0]
	],
	//Upside down
	[
		[0,0,0,0],
		[0,0,0,0],
		[1,1,1,1],
		[0,0,0,0]
	],
	//Left
	[
		[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0]
	]
);
let rPiece = new Tetromino
(
	6,
	//Upright
	[
		[1,0,0],
		[1,1,1],
		[0,0,0]
	],
	//Right
	[
		[0,1,1],
		[0,1,0],
		[0,1,0]
	],
	//Upside down
	[
		[0,0,0],
		[1,1,1],
		[0,0,1]
	],
	//Left
	[
		[1,1,0],
		[0,1,0],
		[0,1,0]
	]
);
let tPiece = new Tetromino
(
	7,
	//Upright
	[
		[0,1,0],
		[1,1,1],
		[0,0,0]
	],
	//Right
	[
		[0,1,0],
		[0,1,1],
		[0,1,0]
	],
	//Upside down
	[
		[0,0,0],
		[1,1,1],
		[0,1,0]
	],
	//Left
	[
		[0,1,0],
		[1,1,0],
		[0,1,0]
	]
);
//Put all the tetrominos into an array sorted by hue for easy access
let tetrominos = [zPiece, lPiece, oPiece, sPiece, iPiece, rPiece, tPiece];

//Current piece (tuple? int array?)
//[0] = current tetromino/piece
//[1] = rotation
//[2] = x position
//[3] = y position
let currentPiece = [0, 0, 0, 0];

//Actual game code finally
function startGame()
{
	renderScreen();
}

//Draw the board, update the UI elements
function renderScreen()
{
	for (let i = 0; i < 10; i++)
	{
		for (let j = 0; j < 20; j++)
		{
			//Render the block (with the color being determined by the field)
			ctx.drawImage(tetrisBlocks[field[j][i]], i * 25, j * 25, 25, 25);
			ctx.stroke();
		}
	}
}

//TODO: Make a function for rendering pieces based off of the current piece
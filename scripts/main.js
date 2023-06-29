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
		if (loadCount == imgSources.length - 1)
		{
			startGame();
		}
	}
}

function startGame()
{
	renderScreen();
}

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
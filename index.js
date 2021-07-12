const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = 10;

const rectangles = [];
let splitRectangleVertical = true;

canvas.addEventListener("click", onRectangleClick);

function createRectangles(x, y, width, height,color) {
  rectangles.push({ x, y, width, height ,color});
}

function drawRectangle() {
  rectangles.forEach((rectangle) => {
      context.fillStyle=rectangle.color;
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.closePath();
    context.fill();
    context.stroke();
  });
}

function onRectangleClick(e) {
  //find the actual rectangle that is clicked
  const clickedIndex = rectangles.findIndex((rectangle) => {
    if (
      e.x > rectangle.x &&
      e.x < rectangle.x + rectangle.width &&
      e.y > rectangle.y &&
      e.y < rectangle.y + rectangle.height
    ) {
      return true;
    }
  });

  if (clickedIndex === -1) {
    splitRectangleVertical = !splitRectangleVertical;
    return;
  }

  const clickedRectangle = rectangles[clickedIndex];

  rectangles.splice(clickedIndex, 1);

  splitRectangle(clickedRectangle, {
    x: e.x - clickedRectangle.x,
    y: e.y - clickedRectangle.y,
  });
}

function splitRectangle(rectangle, position) {
  //console.log("split rectangle",rectangle,position);
  if (splitRectangleVertical) {
    rectangles.push({
      x: rectangle.x,
      y: rectangle.y,
      width: position.x,
      height: rectangle.height,
      color:getColor()
    });
    rectangles.push({
      x: rectangle.x + position.x,
      y: rectangle.y,
      width: rectangle.width - position.x,
      height: rectangle.height,
      color:getColor()
    });
  } else {
    rectangles.push({
      x: rectangle.x,
      y: rectangle.y,
      width: rectangle.width,
      height: position.y,
      color:getColor()
    });

    rectangles.push({
      x: rectangle.x,
      y: rectangle.y + position.y,
      width: rectangle.width,
      height: rectangle.height - position.y,
      color:getColor()
    });
  }
  splitRectangleVertical = !splitRectangleVertical;
  drawRectangle();
}

function getColor() {
  const colors = [
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#C53632",
    "#3E4984",
    "#F8DD67",
  ];
  return colors[Math.floor(Math.random()*colors.length)];
}

createRectangles(0, 0, window.innerWidth, window.innerHeight,"#EBEBED");
drawRectangle();

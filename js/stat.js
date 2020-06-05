'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var FONT_GAP = 16;
var FIRST_GAP = 45;
var BETWEEN_GAP = 50;
var GAP = 10;
var TEXT_GAP = 25;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + TEXT_GAP + GAP + FONT_GAP);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + FIRST_GAP + (BAR_WIDTH + BETWEEN_GAP) * i, CLOUD_HEIGHT - GAP);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 150) + '%, 50%';
    }
    ctx.fillRect(CLOUD_X + FIRST_GAP + (BAR_WIDTH + BETWEEN_GAP) * i, CLOUD_HEIGHT - GAP - FONT_GAP, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + FIRST_GAP + (BAR_WIDTH + BETWEEN_GAP) * i, CLOUD_HEIGHT - GAP - FONT_GAP - GAP - (BAR_HEIGHT * times[i]) / maxTime);
  }
};

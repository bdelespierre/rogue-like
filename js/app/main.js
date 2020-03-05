import Game from '/js/lib/game.js';
import TestState from '/js/app/states/test_state.js';
import Tilesets from '/js/app/tilesets.js';
import Map from '/js/lib/map.js';

Game.create(document.getElementById('game')).load(Tilesets).then(function (game) {
    game.setState(new TestState(game)).run();
    game.getLoader().loadTmx('/assets/test_map.tmx').then(function (tmx) {
        tmx.getTilesets();
    })
});

document.getElementById('pause').addEventListener('click', function() {
    MainLoop.stop();
});

document.getElementById('resume').addEventListener('click', function() {
    MainLoop.start();
});

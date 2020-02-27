import Game      from '/js/lib/game.js';
import TestState from '/js/states/test_state.js';
import Tilesets  from '/js/maps/tilesets.js';

Game.create(document.getElementById('game')).load(Tilesets).then(
    () => game.setState(new TestState(game)).run()
);

document.getElementById('pause').addEventListener('click', function() {
    MainLoop.stop();
});

document.getElementById('resume').addEventListener('click', function() {
    MainLoop.start();
});

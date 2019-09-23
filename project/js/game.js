var config = {
    type: Phaser.AUTO,
    width: 3000,
    height: 3000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
	backgroundColor: 0x003366,
	scene: [Scene1,Scene2,Scene3,Scene4,Scene5,Scene6,Scene7]
};

var game = new Phaser.Game(config);

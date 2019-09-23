
class Scene1 extends Phaser.Scene {
	constructor() {
		super("preloadstart");
	}
	
	preload(){
		this.load.image("start", "background/start.jpg");
        this.load.audio("music1", ["music/GameMusic1.mp3", "music/GameMusic1.ogg"]);
		this.load.audio("hurt",["music/hurt.mp3"]);
		this.load.audio("success",["music/success.mp3"]);
		this.load.audio("gameover",["music/gameover.mp3"]);
		this.load.audio("victory",["music/victory.mp3"]);
	}
	
	create(){
		this.scene.start("preload");
        this.sound.add("music1");
        this.sound.play("music1",{loop: true});
	}
}

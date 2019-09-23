var values= [0,0,0,0,0,0,0,0,0];
 class Scene2 extends Phaser.Scene {
	constructor() {
		super("preload");
		this.a
		this.b=null;
	}

	preload(){
		this.a = this.add.image(window.innerWidth/2,window.innerHeight/2,'start');
		this.b = this.add.text(window.innerWidth/2 - window.innerWidth/20, window.innerHeight/2 + window.innerHeight/30, "Loading game...");
		this.load.image('level', 'background/level.jpg');
		this.load.image('space', 'background/space.jpg');
		this.load.image('menu', 'background/menu.jpg');
		this.load.image('start', 'background/start.jpg');
		this.load.image('levels', 'background/levels.png');
		this.load.image('menubutton','background/mainmenu.png');
		this.load.image('gg','background/blocks.png');
		this.load.image('cont','background/cont.png');
		
		this.load.spritesheet('knock', 'player/knock.jpg', { frameWidth: 150, frameHeight: 50 });
		
		for(var i =1; i < 9;i++){
			var x = 'player/'+i+'.jpg';
			var y = 'player'+i;
			this.load.spritesheet(y, x, { frameWidth: 150, frameHeight: 150 });
		}
		for(var i =1; i<9;i++){
			var x = 'enemy/'+i+'.jpg';
			var y = 'enemy'+i;
			this.load.spritesheet(y, x, { frameWidth: 150, frameHeight: 150 });
		}
		for(var i =1; i<9;i++){
			var x = 'bullet/'+i+'.jpg';
			var y = 'bullet'+i;
			this.load.spritesheet(y, x, { frameWidth: 150, frameHeight: 150 });
		}
	}
	create(){
		if(this.b!=null){
			this.b.destroy();
			this.b = this.add.text(window.innerWidth/2 - window.innerWidth/12, window.innerHeight/2 + window.innerHeight/30, "Click anywhere to start...");
			this.a.setInteractive().on('pointerdown', () => this.clicked() );
		}
	}
	
	clicked(){
		this.scene.start("menu",{values:values});
	}
}

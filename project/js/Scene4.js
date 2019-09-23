class Scene4 extends Phaser.Scene {
	constructor() {
		super("help");
	}
        
        init(data){
            this.values = data.values;
        }
	
	preload(){
		this.add.image(window.innerWidth/2,window.innerHeight/2,'level');
		
		
		this.add.text(window.innerWidth/10*3, window.innerHeight/5, " For centuries, space boxing has been the most popular sport in the \n galaxy. Few people on earth know of its existence......until now! \n For the first time ever, you will get to play as your very own space \n boxer, taking on harder and more advanced opponents along your journey.\n Through reflex and speed can you pass all levels.",{ fill: '#00FF00' }).setFontSize(15).setStroke('#00FF00', 1);
		this.add.text(window.innerWidth*0.37, window.innerHeight/3," Main Character (Spaceboxer): Different color boxes with \n colored outlines. Your goal is to always be in the same \n color as the enemy.",{ fill: '#FF0000' }).setFontSize(15).setStroke('#FF0000', 1);
		this.add.text(window.innerWidth*0.37, window.innerHeight*0.42," Enemy:Different color boxes with no outlines. They can \n throw corresponding color bullets in an attempt to make \n you lose. Once a number of them hit you, you lose.  ",{ fill: '#FFFFFF' }).setFontSize(15).setStroke('#FFFFFF', 1);
		this.add.text(window.innerWidth/10*3, window.innerHeight*0.51," Developers: Yong Chen, SeokHoon Kim, Brendan Kondracki",{ fill: '#FFA500' }).setFontSize(15).setStroke('#FFA500', 1);
		
		this.physics.add.sprite(window.innerWidth*0.36,window.innerHeight*0.60,'menubutton').setInteractive().on('pointerdown', () => this.clicked() );
		this.physics.add.sprite(window.innerWidth*0.33,window.innerHeight*0.41,'gg');
	}
	
	clicked(){
		this.scene.start("menu",{values:this.values});
	}
}

class Scene5 extends Phaser.Scene {
	constructor() {
		super("control");
	}
        
        init(data){
            this.values = data.values;
        }
	
	preload(){
		this.add.image(window.innerWidth/2,window.innerHeight/2,'level');
		this.add.image(window.innerWidth/2,window.innerHeight*0.42,'cont');
		this.add.text(window.innerWidth*0.43, window.innerHeight*0.16," Basic Controls",{ fill: '#FFA500' }).setFontSize(25).setStroke('#FFA500', 3);
		
		this.add.text(window.innerWidth*0.44, window.innerHeight*0.36," Spacebar to use hacks.",{ fill: '#008000' }).setFontSize(15).setStroke('#008000', 1);
		this.add.text(window.innerWidth*0.44, window.innerHeight*0.415," Z and X to change color of player.",{ fill: '#ffff00' }).setFontSize(15).setStroke('#ffff00', 1);
		this.add.text(window.innerWidth*0.44, window.innerHeight*0.475," Move the player up and down.",{ fill: '#0000ff' }).setFontSize(15).setStroke('#0000ff', 1);
		this.add.text(window.innerWidth*0.44, window.innerHeight*0.535," Move the player left and right.",{ fill: '#800080' }).setFontSize(15).setStroke('#800080', 1);
		this.add.text(window.innerWidth*0.44, window.innerHeight*0.59," Esc to pause and unpause the game.",{ fill: '#FFA500' }).setFontSize(15).setStroke('#FFA500', 1);
		
		
		this.physics.add.sprite(window.innerWidth*0.42,window.innerHeight*0.7,'menubutton').setInteractive().on('pointerdown', () => this.clicked() );
		
		
	}
	
	clicked(){
		this.scene.start("menu",{values:this.values});
	}
}

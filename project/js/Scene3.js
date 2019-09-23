class Scene3 extends Phaser.Scene {
	constructor() {
		super("menu");
	}
        
        init(data){
            this.values = data.values;
            console.log(this.values);
        }
	
	create(){
		this.add.image(window.innerWidth/2,window.innerHeight/2,'menu').setInteractive().on('pointerdown', () => this.clicked() );
	}
	
	clicked(){
		var x = game.input.mousePointer.x;
		var y =game.input.mousePointer.y;
		
		if(x > (((window.innerWidth-1500)/2)+662) && x < (((window.innerWidth-1500)/2)+838)){
			if(y > (((window.innerHeight-750)/2)+293) && y < (((window.innerHeight-750)/2)+341)){
				this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625], followbots:0, rate:5, speed:200, life:5, catchh:0, level:1,values:values});
			}
			else if(y > (((window.innerHeight-750)/2)+350) && y < (((window.innerHeight-750)/2)+398)) {
				this.scene.start("levels",{values:this.values});
			}
			else if(y > (((window.innerHeight-750)/2)+407) && y < (((window.innerHeight-750)/2)+460)) {
				this.scene.start("control",{values:this.values});
			}
			else if(y > (((window.innerHeight-750)/2)+469) && y < (((window.innerHeight-750)/2)+517)) {
				this.scene.start("help",{values:this.values});
			}
		}
	}
	
}

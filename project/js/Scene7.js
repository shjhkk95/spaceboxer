
var button1;
var button2;
var button3;
var menu; 
var text = "Pass previous level";
var style = { font: "50px Arial", fill: "#ff0044", align: "center" };
var timer = 0;
var values= [0,0,0,0,0,0,0,0,0]
class Scene7 extends Phaser.Scene {
	constructor() {
		super("levels");
	}
        
        init(data){
            values = data.values;
        }
	
	create(){
		this.add.image(window.innerWidth/2,window.innerHeight/2,'level').setInteractive().on('pointerdown', () => this.click() );
		this.input.keyboard.on('keydown_TWO', () => this.clicked1() );
		this.input.keyboard.on('keydown_THREE', () => this.clicked2() );
		this.input.keyboard.on('keydown_FOUR', () => this.clicked3() );
		this.input.keyboard.on('keydown_FIVE', () => this.clicked4() );
		this.input.keyboard.on('keydown_SIX', () => this.clicked5() );
		this.input.keyboard.on('keydown_SEVEN', () => this.clicked6() );
		this.input.keyboard.on('keydown_EIGHT', () => this.clicked7() );
		this.input.keyboard.on('keydown_NINE', () => this.clicked8() ); 
		this.input.keyboard.on('keydown_ZERO', () => this.clicked9() ); 
		
		this.text = this.add.text(window.innerWidth/2 - window.innerWidth/8, window.innerHeight/20, text, style);
		this.text.visible = false;
		this.physics.add.sprite(window.innerWidth/2,window.innerHeight/5*2,'levels');
	}
	
	clicked1(){ values[0] = 1;}
	clicked2(){ values[1] = 1;}
	clicked3(){ values[2] = 1;}
	clicked4(){ values[3] = 1;}
	clicked5(){ values[4] = 1;}
	clicked6(){ values[5] = 1;}
	clicked7(){ values[6] = 1;}
	clicked8(){ values[7] = 1;}
	clicked9(){ values[8] = 1;}
	
	update(){
		if (timer != 0){
			timer ++;
			this.text.visible = true;
			if (timer == 20){
				this.text.visible = false;
				timer = 0;
			}
		}
	}
	
	
	click(){
		var x = game.input.mousePointer.x;
		var y =game.input.mousePointer.y;
		console.log(x,y); 
		
		if(x > (((window.innerWidth-1500)/2)+352-18) && x < (((window.innerWidth-1500)/2)+528-18)  && y > (((window.innerHeight-750)/2)+173-2) && y < (((window.innerHeight-750)/2)+241-2)){        
			this.scene.start("menu",{values:values});
		}
		else if(y > (((window.innerHeight-750)/2)+294-2) && y < (((window.innerHeight-750)/2)+354-2)){
			if(x > (((window.innerWidth-1500)/2)+352-18) && x < (((window.innerWidth-1500)/2)+503-18)){  
				this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625], followbots:0, rate:5, speed:200, life:5, catchh:0, level:1,values:values});
			}
			else if(x > (((window.innerWidth-1500)/2)+519-18) && x < (((window.innerWidth-1500)/2)+672-18)){ 
				if(values[0]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375,2625,1500], followbots:0, rate:4, speed:300, life:5,catchh:0,level:2,values:values});
				}
				else{
					timer=1;
				}
			}
			else if(x > (((window.innerWidth-1500)/2)+687-18) && x < (((window.innerWidth-1500)/2)+839-18) ){    
				if(values[1]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2625,1500], followbots:0, rate:3, speed:400, life:7,catchh:0,level:3,values:values});
				}
				else {
					timer =1;
				}
			
			}	
			else if(x > (((window.innerWidth-1500)/2)+854-18) && x < (((window.innerWidth-1500)/2)+1004-18)){
				if(values[2]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2000,2625,2625,1500], followbots:1, rate:3, speed:400, life:7,catchh:2,level:4,values:values});				
				}
				else{
					timer =1;
				}
			}
			else if(x > (((window.innerWidth-1500)/2)+1020-18) && x < (((window.innerWidth-1500)/2)+1172-18)){  
				if(values[3]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2000,2625,2000,375], followbots:2, rate:5, speed:300, life:10,catchh:2,level:5,values:values});	
				}
				else{
					timer=1;
				}
			}
		}
		else if(y > (((window.innerHeight-750)/2)+370) && y < (((window.innerHeight-750)/2)+428)){
			if(x > (((window.innerWidth-1500)/2)+352-18) && x < (((window.innerWidth-1500)/2)+503-18)){  
				
				if(values[4]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2000,375], followbots:3, rate:5, speed:300, life:12,catchh:3,level:6,values:values});				
				}
				else{
					timer =1;
				}
		
			}
			else if(x > (((window.innerWidth-1500)/2)+519-18) && x < (((window.innerWidth-1500)/2)+672-18)){ 
				if(values[5] ==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:2, rate:4, speed:300, life:15,catchh:3,level:7,values:values});
				}
				else{
					timer=1;
				}
			}
			else if(x > (((window.innerWidth-1500)/2)+687-18) && x < (((window.innerWidth-1500)/2)+839-18) ){    
				if(values[6]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:3, rate:4, speed:400, life:15,catchh:3,level:8,values:values});
				}
				else{
					timer =1;
				}
			}
			else if(x > (((window.innerWidth-1500)/2)+854-18) && x < (((window.innerWidth-1500)/2)+1004-18)){   
				if(values[7]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:3, rate:3, speed:400, life:15,catchh:4,level:9,values:values});
				}
				else{
					timer =1;
				}
			}
			else if(x > (((window.innerWidth-1500)/2)+1020-18) && x < (((window.innerWidth-1500)/2)+1172-18)){  
				if(values[8]==1){
					this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:4, rate:4, speed:300, life:15,catchh:5,level:10,values:values});
				}
				else{
					timer=1;
				}
			}
		}
		
	}
}
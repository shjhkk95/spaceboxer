var player;
var cursors;
var skey;
var zKey;
var xKey;
var space; 
var escKey;
var knock;
var globalCamera = null;
var currPlayer = 1;
var minimapCamera;
var startTime; 
var startTime2;
var reverse = false;
var followsprite = new Array();
var sidesprite =new Array();
var bullets = new Array(); 
var textt = new Array();
var one; 
var two;
var end;
var gameLevel = 1;
var cheatEnabled = false;
var oldLife = 0;
var changecolor=0;
var won = false;
var paused = false;



class Scene6 extends Phaser.Scene {
	constructor() {
		super("startgame");
	}
	
	init(data)
	{
		this.followbots = data.followbots;  
		this.sidebot = data.sidebot;
		this.rate = data.rate;
		this.speed = data.speed;
		this.life = data.life;
		this.catchh = data.catchh;
		this.level = data.level;
                this.values = data.values;
	}
	
	create ()
	{
		end = 0;
		this.sound.add("shooting");
		this.add.image(1500,1500,'space');
		one = this.add.text(window.innerWidth/25, window.innerHeight/20, 'Enemies:'+ (this.followbots + this.sidebot.length/2), { fill: '#cc9933' }).setFontSize(30);
		two = this.add.text(window.innerWidth/25 * 21, window.innerHeight/20, 'Health:'+this.life, { fill: '#cc9933' }).setFontSize(30);
		one.setScrollFactor(0);﻿
		two.setScrollFactor(0);
		
		cursors = this.input.keyboard.createCursorKeys();
		player = this.physics.add.sprite(1575, 1575, 'player1');
		player.setCollideWorldBounds(true);
        var counter = 0; 
		
		
		followsprite.push(player);
		while (counter < this.followbots){
			var detected = false;
			var x = (Math.floor(Math.random() * 12) + 2)*150 + 375; 
			var y = (Math.floor(Math.random() * 12) + 2)*150 + 375;
			var xLeft = x - 75;
			var yTop = y - 75;
			var colorNumber = Math.floor(Math.random() * 8) + 1;
			
			if (xLeft < 750 + 450 && xLeft + 150 > 750 && yTop < 750 + 450 && yTop + 150 > 750||
				xLeft < 1800 + 450 && xLeft + 150 > 1800 && yTop < 750 + 450 && yTop + 150 > 750 ||
				xLeft < 750 + 450 && xLeft + 150 > 750 && yTop < 1800 + 450 && yTop + 150 > 1800||
				xLeft < 1800 + 450 && xLeft + 150 > 1800 && yTop < 1800 + 450 && yTop + 150 > 1800){
				continue;
			}   
			
			for (let sprite of followsprite){
				if (xLeft < sprite.x + 75 && xLeft + 150 > sprite.x - 75 && yTop < sprite.y + 75 && yTop + 150 > sprite.y - 75){
					detected = true;
					break;
				}
			}

			if (!detected){
				var temp = this.physics.add.sprite(x, y, 'enemy'+colorNumber);
				temp.setImmovable(true);
				counter ++;
				followsprite.push(temp);
				var texr = this.add.text(x-22, y-22, ""+this.catchh, { fill: '‎#000000' }).setFontSize(60);
				textt.push(texr);
			}
		}
		followsprite.shift();
		
		for(counter = 0; counter < this.sidebot.length; counter+=2){
			var colorNumber = Math.floor(Math.random() * 8) + 1;
			var temp = this.physics.add.sprite(this.sidebot[counter], this.sidebot[counter+1], 'enemy'+colorNumber);
			if(temp.y-80 < 300) {
				if(temp.x+80>2700){
					temp.setVelocityY(200);
				}
				else {
					temp.setVelocityX(200);
				}
			}
			else if(temp.y+80 > 2700){
				if(temp.x-80< 300){
					temp.setVelocityY(-200);
				}
				else {
					temp.setVelocityX(-200);  
				}
			}
			else {
				if(temp.x-80<300){
					temp.setVelocityY(-200);
				}
				else{
					temp.setVelocityY(200);
				}
			}
			sidesprite.push(temp);
			sidesprite[counter/2].property = counter/2;
		}
		
		minimapCamera = this.cameras.add(0, 0, window.innerWidth, window.innerHeight);
		skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
		xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		minimapCamera.startFollow(player); 
		minimapCamera.setBounds(0, 0, 3000, 3000);
		
		for(var i =0;i <sidesprite.length;i++){
			this.physics.add.overlap(player, sidesprite[i], function(player,bot){
				this.sideoverlap(player,bot);
			}, null, this);
			
		}
		
		for(var i=0; i < followsprite.length;i++){
			this.physics.add.collider(player, followsprite[i], this.followoverlap, null, this);
		}
		startTime =  new Date();
		startTime2 = new Date(); 

		
		
	}

	update()
	{   
		


		var currentTime =  new Date();
		if(Phaser.Input.Keyboard.JustDown(space)){
			if(!cheatEnabled){
				two.setText("Health:Infinite")
				cheatEnabled = true;
			}
			else{
				two.setText("Health:" + this.life);
				cheatEnabled = false;
			}
		}
                
		if(Phaser.Input.Keyboard.JustDown(xKey)){
			if(currPlayer === 8)
				currPlayer = 1;
			else
				currPlayer++;
			var playerX = player.x;
			var playerY = player.y;
			var vX = player.body.velocity.x;
			var vY = player.body.velocity.y;
			var newImage = "player" + currPlayer;
			player.disableBody(true, true);
			player = this.physics.add.sprite(playerX, playerY, newImage);
			
			for(var i =0;i <sidesprite.length;i++){
				this.physics.add.overlap(player, sidesprite[i], function(player,bot){
					this.sideoverlap(player,bot);
				}, null, this);
			}
			
			for(var i =0; i < bullets.length;i++){
				this.physics.add.overlap(player, bullets[i], this.bulletoverlap, null, this);
			}
			for(var i=0; i < followsprite.length;i++){
				this.physics.add.collider(player, followsprite[i], this.followoverlap, null, this);
			}
		
			player.setCollideWorldBounds(true);
			player.setVelocityX(vX);
			player.setVelocityY(vY);
			minimapCamera.startFollow(player); 
		}
		
		if(Phaser.Input.Keyboard.JustDown(zKey)){
			if(currPlayer === 1)
				currPlayer = 8;
			else
				currPlayer--;
			var playerX = player.x;
			var playerY = player.y;
			var vX = player.body.velocity.x;
			var vY = player.body.velocity.y;
			var newImage = "player" + currPlayer;
			player.disableBody(true, true);
			player = this.physics.add.sprite(playerX, playerY, newImage);
			for(var i =0;i <sidesprite.length;i++){
				this.physics.add.overlap(player, sidesprite[i], function(player,bot){
					this.sideoverlap(player,bot);
				}, null, this);
			}
			for(var i =0; i < bullets.length;i++){
				this.physics.add.overlap(player, bullets[i], this.bulletoverlap, null, this);
			}
			
			for(var i=0; i < followsprite.length;i++){
				this.physics.add.collider(player, followsprite[i], this.followoverlap, null, this);
			}
			player.setCollideWorldBounds(true);
			player.setVelocityX(vX);
			player.setVelocityY(vY);
			minimapCamera.startFollow(player); 
		}
		
		if (cursors.left.isDown)
		{
			player.setVelocityY(0);
			player.setVelocityX(-350);
		}
		else if (cursors.right.isDown)
		{
			player.setVelocityY(0);
			player.setVelocityX(350);
		}
		else if (cursors.up.isDown)
		{
			player.setVelocityX(0);
			player.setVelocityY(-350);
		}
		else if (cursors.down.isDown)
		{
			player.setVelocityX(0);
			player.setVelocityY(350);
		}
		
		if(skey.isDown)
		{
			player.setVelocity(0);
		}
		
		if(player.x < 225 || player.x > 2775 || player.y< 225 || player.y > 2775 || 
		   player.x > 825 && player.x <1125 && player.y > 825 && player.y <1125 ||
		   player.x > 1875 && player.x <2175 && player.y > 825 && player.y <1125 ||
		   player.x > 825 && player.x <1125 && player.y > 1875 && player.y <2175 ||
		   player.x > 1875 && player.x <2175 && player.y > 1875 && player.y <2175) {
		   var textt = this.add.text(window.innerWidth/4, window.innerHeight/3, 'Game Over', { fill: '#0f0' }).setFontSize(150);
		   textt.setInteractive().on('pointerdown', () => this.clicked());
		   textt.setScrollFactor(0);﻿
		   if(end==0){
				this.sound.play("gameover");
				end =1;
			}
		   this.physics.pause();
		}
		
		
		for( var i =0; i < sidesprite.length;i++){
			
			if(sidesprite[i]!=null){
				var xarray = [Math.round(sidesprite[i].x)-5, Math.round(sidesprite[i].x)+5];
				var yarray=[Math.round(sidesprite[i].y)-5, Math.round(sidesprite[i].y)+5];
				
				var x=Math.round(sidesprite[i].x);
				var y=Math.round(sidesprite[i].y);
				
				for(var j = xarray[0]; j <= xarray[1];j++){
					if(j==375){ 
						x = 375; 
						break; 
					}
					else if(j==2625){ 
						x=2625; 
						break; 
					}
				}
				
				for( var j = yarray[0]; j <=yarray[1];j++){
					if(j==375){  
						y = 375; 
						break; 
					}
					else if(j==2625){ 
						y =2625; 
						break; 
					}
				}
				
				if(!reverse){
					if(x ==375 && y==2625){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityY(-200);
					}
					else if(x ==375 && y==375){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityX(200);
					}
					else if(x ==2625 && y==2625){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityX(-200);
					}
					else if(x ==2625 && y==375){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityY(200);
					}
				}
				else{
					if(x ==375 && y==2625){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityX(200);
					}
					else if(x ==375 && y==375){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityY(200);
					}
					else if(x ==2625 && y==2625){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityY(-200);
					}
					else if(x ==2625 && y==375){
						sidesprite[i].setVelocity(0);
						sidesprite[i].setVelocityX(-200);
					}
				}
			}
		}
		
		if(((currentTime.getTime() - startTime2.getTime())/1000) > this.rate){
			for(var i =0; i < sidesprite.length;i++){
				
				if(sidesprite[i]!=null){
					var xarray = [Math.round(sidesprite[i].x)-5, Math.round(sidesprite[i].x)+5];
					var yarray=[Math.round(sidesprite[i].y)-5, Math.round(sidesprite[i].y)+5];
					
					var x=Math.round(sidesprite[i].x);
					var y=Math.round(sidesprite[i].y);
					
					for(var j = xarray[0]; j <= xarray[1];j++){
						if(j==375){ 
							x = 375; 
							break; 
						}
						else if(j==2625){ 
							x=2625; 
							break; 
						}
					}
					
					for( var j = yarray[0]; j <=yarray[1];j++){
						if(j==375){  
							y = 375; 
							break; 
						}
						else if(j==2625){ 
							y =2625; 
							break; 
						}
					}
					
					var t = Math.floor(Math.random() * 3) + 1;
					var speedd = Math.floor(Math.random() * this.speed) + (this.speed-100);
					
					if(x==375 && y!=375 && y!=2625){
						if(t==1 || t==2){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							var bult = this.physics.add.sprite(sidesprite[i].x+90, sidesprite[i].y, 'bullet'+t);
							bult.setVelocityX(speedd);
							bullets.push(bult);
						}
						else if(t==3){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							if(sidesprite[i].body.velocity.x > 0 || sidesprite[i].body.velocity.y > 0){
								var bult = this.physics.add.sprite(sidesprite[i].x, sidesprite[i].y-90, 'bullet'+t);
								bult.setVelocityY(0-speedd);
								bullets.push(bult);
							}
							else{
								var bult = this.physics.add.sprite(sidesprite[i].x, sidesprite[i].y+90, 'bullet'+t);
								bult.setVelocityY(speedd);
								bullets.push(bult);
							}
						}
					}
					else if(x==2625 && y!=375 && y!=2625){
						if(t==1 || t==2){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							var bult = this.physics.add.sprite(sidesprite[i].x-90, sidesprite[i].y, 'bullet'+t);
							bult.setVelocityX(0-speedd);
							bullets.push(bult);
						}
						else if(t==3){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							if(sidesprite[i].body.velocity.x > 0 || sidesprite[i].body.velocity.y > 0){
								var bult = this.physics.add.sprite(sidesprite[i].x, sidesprite[i].y-90, 'bullet'+t);
								bult.setVelocityY(0-speedd);
								bullets.push(bult);
							}
							else{
								var bult = this.physics.add.sprite(sidesprite[i].x, sidesprite[i].y+90, 'bullet'+t);
								bult.setVelocityY(speedd);
								bullets.push(bult);
							}
						}
						
					}
					else if (y ==375 && x!=375 && x!=2625){
						if(t==1 || t==2){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							var bult = this.physics.add.sprite(sidesprite[i].x, sidesprite[i].y+90, 'bullet'+t);
							bult.setVelocityY(speedd);
							bullets.push(bult);
						}
						else if(t==3){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							if(sidesprite[i].body.velocity.x > 0 || sidesprite[i].body.velocity.y > 0){
								var bult = this.physics.add.sprite(sidesprite[i].x-90, sidesprite[i].y, 'bullet'+t);
								bult.setVelocityX(0-speedd);
								bullets.push(bult);
							}
							else{
								var bult = this.physics.add.sprite(sidesprite[i].x+90, sidesprite[i].y, 'bullet'+t);
								bult.setVelocityX(speedd);
								bullets.push(bult);
							}
						}
						
					}
					else if(y==2625 && x!=375 && x!=2625){
						if(t==1 || t==2){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							var bult = this.physics.add.sprite(sidesprite[i].x, sidesprite[i].y-90, 'bullet'+t);
							bult.setVelocityY(0-speedd);
							bullets.push(bult);
						}
						else if(t==3){
							var name = sidesprite[i].texture.key; 
							var t = parseInt(name.charAt(name.length-1));
							if(sidesprite[i].body.velocity.x > 0 || sidesprite[i].body.velocity.y > 0){
								var bult = this.physics.add.sprite(sidesprite[i].x-90, sidesprite[i].y, 'bullet'+t);
								bult.setVelocityX(0-speedd);
								bullets.push(bult);
							}
							else{
								var bult = this.physics.add.sprite(sidesprite[i].x+90, sidesprite[i].y, 'bullet'+t);
								bult.setVelocityX(speedd);
								bullets.push(bult);
							}
						}
					}
				}
			}
			
			
			for(var i =0; i<followsprite.length;i++){
				
				if(followsprite[i]!=null){
					var xdistance = followsprite[i].x- player.x;
					var ydistance = followsprite[i].y - player.y;
					
					var name = followsprite[i].texture.key; 
					var t = parseInt(name.charAt(name.length-1));
					
					if(xdistance<0 && ydistance<0){
						var bult = this.physics.add.sprite(followsprite[i].x+90, followsprite[i].y, 'bullet'+t);
						bult.property =followsprite[i].texture.key;
						this.physics.moveToObject(bult, player, Math.floor(Math.random() * this.speed) + (this.speed-100));
						bullets.push(bult);
					}
					else if(xdistance>0 && ydistance>0){
						var bult = this.physics.add.sprite(followsprite[i].x-90, followsprite[i].y, 'bullet'+t);
						bult.property =followsprite[i].texture.key;
						this.physics.moveToObject(bult, player, Math.floor(Math.random() * this.speed) + (this.speed-100));
						bullets.push(bult);
					}
					
					else if (xdistance>0 && ydistance<0){
						var bult = this.physics.add.sprite(followsprite[i].x, followsprite[i].y+90, 'bullet'+t);
						bult.property =followsprite[i].texture.key;
						this.physics.moveToObject(bult, player, Math.floor(Math.random() * this.speed) + (this.speed-100));
						bullets.push(bult);
					}
					else if(xdistance<0 && ydistance>0){
						var bult = this.physics.add.sprite(followsprite[i].x, followsprite[i].y-90, 'bullet'+t);	
						bult.property =followsprite[i].texture.key;
						this.physics.moveToObject(bult, player, Math.floor(Math.random() * this.speed) + (this.speed-100));
						bullets.push(bult);
					}
				}
			}
			startTime2= new Date();
			changecolor=0;
		}
		
		if(((currentTime.getTime() - startTime2.getTime())/1000) > this.rate/2  &&changecolor ==0){
			for(var i =0; i <sidesprite.length;i++){
				if(sidesprite[i]!=null){
					var colorNumber = Math.floor(Math.random() * 8) + 1;
					sidesprite[i].setTexture('enemy'+colorNumber);
				}
			}
			for(var i =0; i <followsprite.length;i++){
				if(followsprite[i]!=null){
					var colorNumber = Math.floor(Math.random() * 8) + 1;
					followsprite[i].setTexture('enemy'+colorNumber);
				}
			}
			changecolor=1;
		}
		
		for(var i =0; i < bullets.length;i++){
			if(bullets[i].x < 225 || bullets[i].x > 2775 || bullets[i].y< 225 || bullets[i].y > 2775 ){
				bullets[i].disableBody(true,true);
				bullets.splice(i,1);
			}
		}
		
		for(var i =0; i < sidesprite.length;i++){
			if(sidesprite[i]!=null && (sidesprite[i].x < 225 || sidesprite[i].x > 2775 || sidesprite[i].y< 225 || sidesprite[i].y > 2775)){
				var tet = one.text.substring(8, one.text.length);
				var integer = parseInt(tet); 
				one.setText("Enemies:"+(integer-1));
				sidesprite[i].disableBody(true,true);
				sidesprite.splice(i,1);
				break; 
			}
		}
		
		for(var i =0; i < bullets.length;i++){
			this.physics.add.overlap(player, bullets[i], this.bulletoverlap, null, this);
		}
		
		if((Math.floor(Math.random() * 600) + 1)==10 && sidesprite.length!=0){
			this.switchh();
		}
		
		if(two.text.substring(7, two.text.length) =="0"){
			var textt = this.add.text(window.innerWidth/4, window.innerHeight/3, 'Game Over', { fill: '#0f0' }).setFontSize(150);
		    textt.setInteractive().on('pointerdown', () => this.clicked());
		    textt.setScrollFactor(0);
			
			if(end==0){
				this.sound.play("gameover");
				end =1;
			}
			this.physics.pause();
		}
		
		if(one.text.substring(8, one.text.length) =="0") {
			var textt = this.add.text(window.innerWidth/3, window.innerHeight/3, 'Victory', { fill: '#0f0' }).setFontSize(150);
		    textt.setInteractive().on('pointerdown', () => this.clicked());
			textt.setScrollFactor(0);
			if (this.level + 1 > gameLevel){
				gameLevel = this.level + 1;
			}
			
			if(end==0){
				this.sound.play("victory");
				end =1;
                                won = 1;
                                this.values[this.level-1] = 1;
			}
			this.physics.pause();
		}

	
	}
	
	clicked()
	{
		this.scene.stop();
		followsprite = new Array();
		sidesprite =new Array();
		bullets = new Array(); 
		textt = new Array();
		changecolor=0;
                if(won){
                    won = 0;
                    if(this.level == 1)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375,2625,1500], followbots:0, rate:4, speed:300, life:5,catchh:0,level:2,values:this.values});
                    else if(this.level == 2)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2625,1500], followbots:0, rate:3, speed:400, life:7,catchh:0,level:3,values:this.values});
                    else if(this.level == 3)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2000,2625,2625,1500], followbots:1, rate:3, speed:400, life:7,catchh:2,level:4,values:this.values});	
                    else if(this.level == 4)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2000,2625,2000,375], followbots:2, rate:5, speed:300, life:10,catchh:2,level:5,values:this.values});	
                    else if(this.level == 5)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625,2000,375], followbots:3, rate:5, speed:300, life:12,catchh:3,level:6,values:this.values});	
                    else if(this.level == 6)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:2, rate:4, speed:300, life:15,catchh:3,level:7,values:this.values});
                    else if(this.level == 7)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:3, rate:4, speed:400, life:15,catchh:3,level:8,values:this.values});
                    else if(this.level == 8)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:3, rate:3, speed:400, life:15,catchh:4,level:9,values:this.values});
                    else if(this.level == 9)
                        this.scene.start("startgame",{sidebot:[375,375,2625,375,375,2625,2625,2625,375,1600, 1000,375, 2625, 1500, 1400, 2625], followbots:4, rate:4, speed:300, life:15,catchh:5,level:10,values:this.values});
                    
                }
                else{
                    this.scene.start("menu", {values:this.values});
                }
	}
	
	switchh(){
		reverse = !reverse; 
		for(var i =0; i<sidesprite.length;i++){
			if(sidesprite[i]!=null){
				sidesprite[i].setVelocityX(0-sidesprite[i].body.velocity.x);
				sidesprite[i].setVelocityY(0-sidesprite[i].body.velocity.y);
			}
		}
	}
	sideoverlap(player,bot){
		var namep = player.texture.key;
		var names = bot.texture.key;
		
		if(namep.charAt(namep.length-1)!= names.charAt(names.length-1)){
			if(!cheatEnabled){
				this.life--;
				two.setText("Health:"+this.life);
			}
			this.sound.play("hurt");
			if(player.body.y-70 > bot.body.y+70){
				player.body.y = player.body.y+300;
			}
			else if(player.body.y+70 < bot.body.y-70){
				player.body.y = player.body.y-300;
			}
			else if(player.body.x-70 > bot.body.x+70){
				player.body.x = player.body.x+300;
			}
			else if(player.body.x+70 < bot.body.x-70){
				player.body.x = player.body.x-300;
			}
		}
		else {
			this.sound.play("success");
			sidesprite[bot.property]=null;
			bot.disableBody(true, true);
			var tet = one.text.substring(8, one.text.length);
			var integer = parseInt(tet); 
			one.setText("Enemies:"+(integer-1));
		}
	}
	
	bulletoverlap(player,bullet){
		var namep = player.texture.key;
		var names = bullet.texture.key;
		bullet.disableBody(true,true); 
		if(namep.charAt(namep.length-1)!= names.charAt(names.length-1)){
			if(!cheatEnabled){
				this.life--;
				two.setText("Health:"+this.life);
			}
			this.sound.play("hurt");
		}
		else{
			if(bullet.property!=null){
				for(var i =0; i <followsprite.length;i++){
					if(textt[i] !=null &&followsprite[i]!=null){
						if(followsprite[i].texture.key == bullet.property){
							var number = parseInt(textt[i].text)-1; 
							textt[i].setText(number);
							if(number == 0){
								followsprite[i].disableBody(true,true);
								followsprite[i] = null;
								textt[i].visible = false;
								textt[i] =null;
								var tet = one.text.substring(8, one.text.length);
								var integer = parseInt(tet); 
								one.setText("Enemies:"+(integer-1));
							}
							break;
						}
					}
				}
			}
			this.sound.play("success");
		}
	}
	
	followoverlap(player, bot){
		player.setVelocity(0);
		bot.setVelocity(0);
	}
}
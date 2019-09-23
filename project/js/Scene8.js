var escKey;
class Scene8 extends Phaser.Scene {
	constructor() {
		super("pause1");
	}
        
        create(){
            escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }
        
        update(){
            if(Phaser.Input.Keyboard.JustDown(escKey)){
                this.scene.resume("startgame");
                this.scene.stop();
            }
        }
}


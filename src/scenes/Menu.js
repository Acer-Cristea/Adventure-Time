class Menu extends Phaser.Scene {
    constructor(){
        super("sceneMenu")
    }

    create() {

        this.select_sound = this.sound.add("select", {volume: 0.5})


        this.KEYS = this.scene.get("sceneKeys").KEYS
    
        this.add.image(0,0,"title").setOrigin(0)



    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.select_sound.play()
            this.scene.start("sceneInstructions")
        }

        if(Phaser.Input.Keyboard.JustDown(KEYS.DOWN)) {
            this.select_sound.play()
            this.scene.start("sceneCredits")
        }

    }
}


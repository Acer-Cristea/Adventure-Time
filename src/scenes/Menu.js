class Menu extends Phaser.Scene {
    constructor(){
        super("sceneMenu")
    }

    create() {


        let menuConfig = {
            fontFamily: "Comic Sans MS",
            fontSize: "35px",
            color: "#FFFFFF",
            align: "right",
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }


        this.KEYS = this.scene.get('sceneKeys').KEYS
    
        this.add.image(0,0,"title").setOrigin(0)

        this.add.text(game.config.width/2+600, game.config.height/2 + 235, "Press ↑ to Start",
        menuConfig).setOrigin(0.5)


    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.scene.start('scenePlay')
        }

    }
}
//scene.object.setScrollFactor(0)

//any object that's in a scene, will not scroll with the screen, like a UI
//can use numbers as well to create parrallex

class Menu extends Phaser.Scene {
    constructor(){
        super("sceneMenu")
    }

    create() {


        this.KEYS = this.scene.get('sceneKeys').KEYS
    
        this.add.image(0,0,"title").setOrigin(0)


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

class Death extends Phaser.Scene {
    constructor(){
        super("sceneDeath")
    }

    create() {


        this.KEYS = this.scene.get('sceneKeys').KEYS
    
        this.add.image(0,0,"death").setOrigin(0)


    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.scene.start('sceneMenu')
        }

    }
}

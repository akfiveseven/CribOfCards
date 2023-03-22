import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene
{
    constructor() 
    {
        super ({key: 'mainmenu'});
    }
    preload()
    {

    }

    create()
    {
        let { width, height } = this.sys.game.canvas;
        let centerWidth = width / 2;
        let centerHeight = height / 2;
        let scaleRatio = window.devicePixelRatio / window.devicePixelRatio;
        let logoImage = this.add.image(centerWidth, centerHeight - 300, 'logo').setScale(scaleRatio, scaleRatio);
        //let playText = this.add.text(centerWidth, centerHeight + 400, "Play", { fill: '#234543' }).setScale(scaleRatio, scaleRatio);
        var text = this.add.text(centerWidth, centerHeight + 300, 'Play', { fontSize: '150px', fill: '#ded9cc' });
        //var text = this.add.text(100, 100, 'Hello, world!', { fontSize: '32px', fill: '#fff' });
        window.addEventListener('resize', () => {
            location.reload();
        }); 
    }

    update()
    {
        // window.addEventListener('resize', () => {
        //     console.log("resize");
        //     logoImage = logoImage;
        // });
    }

}
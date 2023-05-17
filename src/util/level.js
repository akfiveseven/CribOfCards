function vertexLevel(name, spriteKey, levelID) {
    this.name = name;
    this.spriteKey = spriteKey;
    this.levelID = levelID;
    this.imageObj;
}

export default class level {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    getList() {
        return this.AdjList;
    }

    addVertex(v) {
        this.AdjList.set(v, []);
    }

    addEdge(v, w) {
        this.AdjList.get(v).push(w);
    }

    createImage(x, y, img) {
        this.add.image(x, y, img);
    }

    createRandomVertex() {
        var xd = this.getLevelSequence();
        this.addVertex(this.generateLevelVertex(xd[0]));
        this.addVertex(this.generateLevelVertex(xd[1]));
        this.addVertex(this.generateLevelVertex(xd[2]));
        xd = this.getLevelSequence();
        this.addVertex(this.generateLevelVertex(xd[0]));
        this.addVertex(this.generateLevelVertex(xd[1]));
        this.addVertex(this.generateLevelVertex(xd[2]));
        // this.addEdge(v, v2);
        // this.addVertex("b");
    }

    generateLevelVertex(input) {
        if (input == 1) {
            return new vertexLevel("fight", 'sword', 1);
        }
        else if (input == 2) {
            return new vertexLevel("chest", 'chest', 2);
        }
        else if (input == 3) {
            return new vertexLevel("heal", 'heart', 3);
        }
    }

    displayGraph(scene) {
        // get all the vertices
        var get_keys = this.AdjList.keys();


        let xOffset = 100;
        // iterate over the vertices
        for (var i of get_keys) {

            scene.add.image(window.innerWidth/2-xOffset, window.innerHeight*1/3, i.spriteKey);
            xOffset = xOffset + 300;
            // get the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j.name + " ";

            // print the vertex and its adjacency list
            console.log(i.name + " -> " + conc);
        }
    }

    createArrow(x, y) {
        var arrowWidth = 20;
        var arrowHeight = 40;

        // Create a new arrow shape
        var arrow = new Phaser.Geom.Polygon([
            new Phaser.Geom.Point(x - arrowWidth / 2, y - arrowHeight / 2),
            new Phaser.Geom.Point(x - arrowWidth / 2, y + arrowHeight / 2),
            new Phaser.Geom.Point(x + arrowWidth / 2, y),
            new Phaser.Geom.Point(x - arrowWidth / 2, y - arrowHeight / 2)
        ]);

        // Set the line style and fill color for the arrow
        var arrowStyle = { lineStyle: { width: 2, color: 0xded9cc }, fillStyle: { color: 0xded9cc } };

        // Draw the arrow on the graphics object
        var graphics = this.add.graphics();
        graphics.fillStyle(arrowStyle.fillStyle.color);
        graphics.lineStyle(arrowStyle.lineStyle.width, arrowStyle.lineStyle.color);
        graphics.strokePoints(arrow.points, true);
        graphics.fillPoints(arrow.points, true);





        // // Define the arrow dimensions
        // var arrowWidth = 20;
        // var arrowHeight = 40;

        // // Create a new arrow shape
        // var arrow = new Phaser.Geom.Polygon([
        //     new Phaser.Geom.Point(x - arrowWidth / 2, y + arrowHeight / 2),
        //     new Phaser.Geom.Point(x + arrowWidth / 2, y + arrowHeight / 2),
        //     new Phaser.Geom.Point(x + arrowWidth / 2, y - arrowHeight / 2),
        //     new Phaser.Geom.Point(x + arrowWidth, y - arrowHeight / 2),
        //     new Phaser.Geom.Point(x, y - arrowHeight),
        //     new Phaser.Geom.Point(x - arrowWidth, y - arrowHeight / 2),
        //     new Phaser.Geom.Point(x - arrowWidth / 2, y - arrowHeight / 2)
        // ]);

        // // Set the line style and fill color for the arrow
        // var arrowStyle = { lineStyle: { width: 2, color: 0xded9cc }, fillStyle: { color: 0xded9cc } };

        // // Draw the arrow on the graphics object
        // var graphics = this.add.graphics();
        // graphics.fillStyle(arrowStyle.fillStyle.color);
        // graphics.lineStyle(arrowStyle.lineStyle.width, arrowStyle.lineStyle.color);
        // graphics.strokePoints(arrow.points, true);
        // graphics.fillPoints(arrow.points, true);
    }


    printGraph() {
        // get all the vertices
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys) {
            // get the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

    getLevelSequence() {
        let arr = [1, 2, 3];

        arr.sort(() => Math.random() - 0.5);

        return arr;
    }

}

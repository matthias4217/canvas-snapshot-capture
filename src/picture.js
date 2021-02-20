const {createCanvas} = require('canvas');
const fs = require('fs');
const https = require('https');

const DEFAULT_COLOR = process.env.DEFAULT_COLOR;
const INSTANCES_FILE = process.env.INSTANCES_FILE;


function getPicture(canvasUrl, savePath) {

	https.get(canvasUrl, (res) => {

		let jsonText = '';
		res.on('data', (d) => {
			jsonText += d;
		});

		res.on('end', () => {
			let jsonData = JSON.parse(jsonText);
			let canvas = createCanvas(jsonData.width, jsonData.height);
			let ctx = canvas.getContext('2d');

			let color = null;
			// here we fill the canvas
			if (jsonData.array) {
				for (let y = 0; y < jsonData.value.length; y++) {
					for (let x = 0; x < jsonData.value[y].length; x++) {
						color = jsonData.value[y][x];
						if (color !== null) {
							ctx.fillStyle = color;
						} else {
							ctx.fillStyle = DEFAULT_COLOR;
						}
						ctx.fillRect(x, y, 1, 1);
					}
				}
			} else {
				ctx.fillStyle = DEFAULT_COLOR;
				ctx.fillRect(0, 0, jsonData.width, jsonData.height);
				for (let obj of jsonData.value) {
					color = obj.color;
					if (color !== null) {
						ctx.fillStyle = color;
					} else {
						ctx.fillStyle = DEFAULT_COLOR;
					}
					ctx.fillRect(obj.x, obj.y, 1, 1);
				}
			}

			let buffer = canvas.toBuffer('image/png');
			fs.mkdirSync(`./snapshots/${savePath}/`, { recursive: true });
			let datetimeISO = new Date().toISOString();
			let date = datetimeISO.split('T')[0];
			let time = datetimeISO.split('T')[1].split('.')[0].split(':').join('-');
			fs.writeFileSync(`./snapshots/${savePath}/${date}-${time}.png`, buffer);
		})
	}).on('error', (err) => {
		console.log(err);
	});
}

function saveFrameInstance(canvasUrl, savePath) {
		getPicture(canvasUrl, savePath);
}

function saveAllFrames() {
    let text = fs.readFileSync(INSTANCES_FILE);
    const instances = JSON.parse(text);

    instances.forEach(instance => {
        saveFrameInstance(instance.url, instance.folder);
    });
	//saveFrameInstance("https://canvas-boundless-bolt.foginforest.net/json", "/tmp/boundless-bolt/");
}

module.exports = saveAllFrames;

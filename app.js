const sharp = require('sharp');
const compress = require('compress-images');

let path = process.argv[2];
let width = Number(process.argv[3]);

function resize(path, width) {
	sharp(path)
		.resize({ width: width })
		.toFile('./temp/teste.jpg', (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('deu tudo bom');
				compressImage('./temp/teste.jpg', './compressed/');
			}
		});
}

function compressImage(pathInput, outputPath) {
	compress(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false, { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } }, { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } }, { svg: { engine: 'svgo', command: '--multipass' } }, { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } }, function (error, completed, statistic) {
		console.log('-------------');
		console.log(error);
		console.log(completed);
		console.log(statistic);
		console.log('-------------');
	});
}

resize(path, width);

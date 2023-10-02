const fs = require('fs');
let cursor = 0;
const mode = (process.argv[2]);
const inputFile = (process.argv[3]);
const outputFile = (process.argv[4]);
 

		if(mode == 'encoding') {
		let input = fs.readFileSync(inputFile).toString();
		let counter = 1;

		while (cursor < input.length) {
			while(input.charAt(cursor) == input.charAt(cursor + counter))
			counter++;
			cursor += counter;
			if((counter >= 4) || (input.charAt(cursor - 1) === '#')) {
				fs.writeFileSync(outputFile, ('#' + String.fromCharCode(255) + input.charAt(cursor - 1)).repeat(Math.floor(counter / 255)), { flag: 'a'});
				fs.writeFileSync(outputFile, ('#' + String.fromCharCode(counter % 255) + input.charAt(cursor - 1)), { flag: 'a'})
			} else {
				fs.writeFileSync(outputFile, input.charAt(cursor - 1), { flag: 'a'});
			}
		counter = 1
					}
		}

		if(mode == 'decoding') {
		let encode = fs.readFileSync(inputFile).toString();

		while (cursor < encode.length) {
			if(encode.charAt(cursor) === '#') {
				fs.writeFileSync(outputFile, encode.charAt(cursor + 2).repeat(encode.charCodeAt(cursor + 1)), { flag: 'a'});
				cursor += 2;
			} else	{
				fs.writeFileSync(outputFile, encode.charAt(cursor), { flag: 'a'}); 
				}
		cursor ++;
			}
		}
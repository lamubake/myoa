const fs = require('fs')
const iconv = require('iconv-lite')
const path = require('path')

const oPath = path.join(__dirname + '/bundle-u8.js')
const tPath = path.join(__dirname + '/bundle.js')

fs.createReadStream(oPath)
	.pipe(iconv.decodeStream('utf8'))
	.pipe(iconv.encodeStream('gbk'))
	.pipe(fs.createWriteStream(tPath))

console.log('done convert.\n')
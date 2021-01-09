const dotenv = require('dotenv')
dotenv.config()

exports.serial = {
  port: process.env['SERIAL_PORT'] || '/dev/ttyUSB0',
  baudRate: parseInt(process.env['BAUD_RATE']) || 115200,
}

exports.rest = {
  endPoint: process.env['REST_END_POINT'] || 'https://example.com',
  method: process.env['REST_METHOD'] || 'POST',
}

exports.BATCH_SIZE = process.env['BATCH_SIZE'] || 1

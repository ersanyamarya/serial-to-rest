const { serial, rest, BATCH_SIZE } = require('./config.js')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const fetch = require('node-fetch')

const port = new SerialPort(serial.port, { baudRate: serial.baudRate })
const parser = port.pipe(new Readline({ delimiter: '\n' }))

port.on('open', () => {
  console.log('serial port open')
  port.drain()
})
parser.on('data', data => {
  console.log(data)
  sendData(data)
})

port.on('error', function (error) {
  console.log('error: %s', error)
})

port.on('close', function () {
  console.log('port closed')
})

function sendData(data) {
  if (rest.method === 'POST')
    fetch(rest.endPoint, {
      method: rest.method,
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error(err))
  else
    fetch(`${rest.endPoint}?data=${data}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error(err))
}

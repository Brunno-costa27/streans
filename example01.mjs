// process.stdin.pipe(process.stdout).on('data', msg => console.log('Data terminal', msg.toString()))


import http from 'http'
import { readFileSync, createReadStream } from 'fs'
// Cria um servidor 
http.createServer((req, res) =>{
    const file = readFileSync('template.html')
    // console.log(file)
    // res.write(file)
    // res.end()

    createReadStream('template.html').pipe(res)

}).listen(3000, () => console.log('Running at 3000'))
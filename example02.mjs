import { pipeline, Readable, Writable } from 'stream'
import { promisify } from 'util'
import { readFileSync, createWriteStream } from 'fs'



const pipelineAsync = promisify(pipeline)
{

    const readableStream = Readable({
        read: function () {
            this.push('1')
            this.push('2')
            this.push('3')
            this.push(null)
        }
    })

    const writableStream = Writable({
        write: (chunk, enconding, cb) => {
            console.log('msg', chunk.toString())
            cb()
        }
    })
    console.log('O processo acabou!')

    await pipelineAsync(
        readableStream,
        // process.stdout
        writableStream
    )
}
{
    const readableStream = Readable({
        read: function () {
            const file = readFileSync('template.html')

            this.push(file)
            this.push(null)
        }
    })
    await pipelineAsync(
        readableStream,
        // process.stdout
        createWriteStream('output.txt')
    )
}


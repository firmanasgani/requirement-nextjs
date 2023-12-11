const sqlite    = require('sqlite')
const sqlite3   = require('sqlite3')
import { open } from 'sqlite'

export default async function (req, res) {

    try {

        var dbFile = './test.db'
        const db = await open({
            filename: dbFile,
            driver: sqlite3.Database
        })
        
        var item = {}

        var query = ''
        const result = await db.run(query)


        var ret = {
            item: item
        }

        res.json(ret)
    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
}
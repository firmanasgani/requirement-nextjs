const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
import { open } from 'sqlite'

export default async function(req, res) {

    try {
        var data = req.body

        var dbFile = './test.db'
        const db = await open({
            filename: dbFile, 
            driver: sqlite3.Database
        })

        var item = {

        }
        const query = ''
        const result = await db.run(sql)

        var ret = {
            item : item
        }

        res.json(ret)
    }catch(err) {
        console.error(err)
        res.status(500).send()
    }
}
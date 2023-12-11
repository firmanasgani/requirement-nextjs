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

        var data = req.body
        var id = data.id

        var query = `DELETE FROM produk where id=${id}`
        const result = await db.run(query)

        var ret = {
            status: {message: 'delete complete'}
        }

        res.json(ret)
    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
}
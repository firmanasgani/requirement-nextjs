const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
import { open } from 'sqlite' 

export default async function(req, res) {
    try {
         var id     = req.query.id
         var dbFile = './test.db'
         const db = await open({
            filename: dbFile, driver: sqlite3.Database
         }) 

        var sql = "SELECT * FROM produk WHERE id="+id
        const items = await db.all(sql)

        var item = items[0]

        var message = item == undefined ? 'data kosong' : 'ada data'

        var ret = {
            item: item == undefined ? [] : item
        }

        res.json(ret)
    }catch(err) {
        console.error(err)
        res.status(500).send()
    }

}
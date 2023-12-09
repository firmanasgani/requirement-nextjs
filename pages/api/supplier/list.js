const sqlite    = require('sqlite')
const sqlite3   = require('sqlite3')
import { open } from 'sqlite'

export default async function(req, res) {
    try {
        var dbfile = './test.db'
        const db = await open({
            filename: dbfile,
            driver: sqlite3.Database
        })
        const items = await db.all("SELECT * from suplier ORDER BY nama_suplier ASC")
        
        var ret = {data:  items,}

        res.json(ret)
    }catch(err) {
        console.log(err)
        res.status(500).send()
    }

}
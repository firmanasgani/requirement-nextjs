const sqlite    = require('sqlite')
const sqlite3   = require('sqlite3')
import { open } from 'sqlite'

export default async function(req, res) {
    try {
        var data    = req.body
        var dbFile  = './test.db'
        const db = await open({
            filename: dbFile, driver: sqlite3.Database
        }) 
        
        //check id
        const items = await db.all("SELECT * from suplier ORDER BY nama_suplier ASC")
        var id = items.length + 1

        const result = await db.run(`INSERT INTO suplier(id_suplier,nama_suplier,alamat,email) VALUES(${id},'${data.name}','${data.alamat}','${data.email}')`)

        var ret = {
            item: {message: 'success'}
        }

        return res.json(ret)

    }catch(err) {
        console.log(err)
        res.status(500).send()
    }

}

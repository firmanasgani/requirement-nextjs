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
        const items = await db.all("SELECT * from produk")
        var id = items.length + 1

        console.log(data)
        var name = id+'.'+data.ext_file
        var query = `
            INSERT INTO produk(
                id,nama,
                deskripsi,harga, 
                stok,foto, 
                suplier_id) VALUES
                (${id},'${data.name}',
                '${data.deskripsi}','${data.harga}',
                '${data.stok}', '${name}', '${data.suplier_id}')`
        const result = await db.run(query)
        console.log(query)
        var ret = {
            item: {message: 'success'}
        }

        res.json(ret)

    }catch(err) {
        console.log(err)
        res.status(500).send()
    }

}

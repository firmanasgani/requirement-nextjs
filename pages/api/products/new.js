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

        var length = items.length
        var id = length+1;

        const result = await db.run(`INSERT INTO produk(id, nama, deskripsi, harga, stok, foto, suplier_id) VALUES(${id}, '${data.name}', '${data.deskripsi}', '${data.harga}', '${data.stok}', '${data.foto}', '${data.supplier_id}')`)

        var ret = {
            item: data
        }

        res.json(ret)
    }catch(err) {
        res.status(500).send()
    }

}

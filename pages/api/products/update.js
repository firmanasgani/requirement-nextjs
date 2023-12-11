const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
import { open } from 'sqlite'

export default async function(req, res) {

    try {
        var data = req.body
        var id = data.id

        var dbFile = './test.db'
        const db = await open({
            filename: dbFile, 
            driver: sqlite3.Database
        })

        var item = {
            nama: data.name,
            deskripsi: data.deskripsi,
            harga: data.harga,
            stok: data.stok,
            foto: data.foto,
            suplier_id: data.suplier_id,
            id: id
        }
        const query = 'UPDATE produk SET nama=?, deskripsi=?, harga=?, stok=?, foto=?, suplier_id=? where id=?'
        const result = await db.run(sql, data.name, data.deskripsi, data.harga, data.stok, data.foto, data.suplier_id, id)

        var ret = {
            item : item
        }

        res.json(ret)
    }catch(err) {
        console.error(err)
        res.status(500).send()
    }
}
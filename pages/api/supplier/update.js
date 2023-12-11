const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
import { open } from 'sqlite'

export default async function (req, res) {

    try {
        var data    =  req.body
        var id      = data.id 
        var item = {
            id: data.id,
            name: data.name,
            alamat: data.alamat,
            email: data.email
        } 
        
        var dbFile = './test.db'
        const db = await open ({
            filename:dbFile,
            driver: sqlite3.Database
        })

        const result = await db.run('UPDATE suplier SET nama_suplier=?, alamat=?, email=? where id_suplier=?',
            data.name,
            data.alamat,
            data.email,
            id
        )

        var ret =  {
            item: item
        }

        res.json(ret)
        
    }catch(err) {
        console.log(err)
        res.status(500).send()
    }
}
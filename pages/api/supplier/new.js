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


        const result = await db.run('INSERT INTO suplier(id_suplier,nama_suplier,alamat,email) VALUES(2, ?, ?, ?)', {
            nama_supplier: req.body.name,
            alamat: req.body.alamat,
            email: req.body.email
        })

        var ret = {
            item: {message: 'success'}
        }

        return res.json(ret)

    }catch(err) {
        console.log(err)
        console.log(req.body)
        res.status(500).send()
    }

}

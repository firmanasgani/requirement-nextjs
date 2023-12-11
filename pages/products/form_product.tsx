import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const FormProducts = () => {
    const searchParams = useSearchParams() 
    const search = searchParams.get('id')
    var id = search == undefined ? 0 : search

    const [supplierList, setSupplierList] = useState([])

    const [formData, setFormData] = useState({
        id: 0,
        nama: '',
        deskripsi: '',
        harga: 0,
        stok: 0,
        supplier: '',
        pathfoto: '',

    })
    useEffect(() => {
        const getData = async () => {
          const query = await fetch('/api/supplier/list')
          const res = await query.json()
          
          setSupplierList(res.data)
        }
        getData()
      }, [])


    return <>
          <div className="container">
            <div>
                <h1>Form Products</h1>
            </div>
            <div>
                <div className="row">
                    <label>Nama</label>
                    <input 
                        type="text" 
                        className="" 
                        placeholder="Nama">
                    </input>
                </div>

                <div className="row">
                    <label>Deskripsi</label>
                    <textarea 
                        className="" 
                        placeholder="Deskripsi">
                    </textarea>
                </div>

                <div className="row">
                    <label>Harga</label>
                    <input 
                        type="number" 
                        className="" 
                        min={0}
                        placeholder="Harga">
                    </input>
                </div>

                <div className="row">
                    <label>Stok</label>
                    <input 
                        type="number" 
                        min={0}
                        className="" 
                        placeholder="Stok">
                    </input>
                </div>

                <div className="row">
                    <label>Supplier</label>
                    <select name="supplier">
                    {
                        supplierList && supplierList.length > 0 ? supplierList.map((data: any, index: any) => {
                            return  (
                                <><option value={data.id_suplier}>{data.nama_suplier}</option></>
                            ) 
                        }) : <option value={""} className="text-red">Tidak ada suppli</option>
                    }
                    </select>
                </div>

                <div className="row">
                    <label>Foto</label>
                    <input 
                        type="file" 
                        accept="image/png, image/jpg, image/jpeg"
                        placeholder="Stok">
                    </input>
                    <p className="small-text">Maksimal file 2mb</p>
                </div>

                <div className="row">
                    <button 
                        type="submit" 
                        className="button button-success" 
                     
                        value="Simpan Data">
                        Simpan Data
                    </button>
                    <a href="/" className="button button-danger">
                        Kembali
                    </a>
                </div>
            </div>
        </div>
    </>;

}

export default FormProducts
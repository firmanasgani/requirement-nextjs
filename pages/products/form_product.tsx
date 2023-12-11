
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from 'axios'
//import { writeFile } from "fs/promises"

const FormProducts = () => {
    const searchParams = useSearchParams() 
    const search = searchParams.get('id')
    var id = search == undefined ? 0 : search

 
    const [supplierList, setSupplierList] = useState([])
    const [last, SetLast] = useState('')
    const [value, setValue] = useState('')
    const [file, setFile] = useState<File>()

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        deskripsi: '',
        harga: '',
        stok: '',
        suplier_id: '',
        ext_file: ''
    })

    const getLastId = async () => {
        const query = await fetch('/api/products/list')
        const res = await query.json()
        SetLast((res.data.length)+1)
    }


    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const getExtension = str => str.slice(str.lastIndexOf());

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!file) return

        try{
            var fileInMB = (file.size)/1024 //convert to MB
            if(fileInMB > 2048) {
                return alert('File tidak boleh lebih dari 2 mb (file berukuran ' +(fileInMB).toFixed(2)+')')
            }else {
              
                formData.suplier_id = value ?? 1
                var name = file.name== null ? '' : file.name.split('.').pop(); 
                formData.ext_file = name ?? ""
                
              


                if(!file) {throw new Error('No File uploaded')}
                
                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)
                const path = `/upload/products/${last}`
                //writeFile(path, buffer)
             
                const res = await axios.post('/api/products/new', formData)
                console.log("POST Created", res)
                location.replace('/')
            }
        }catch(e: any) {
            console.log('Error')
            console.error(e)
        }
        
    }
    const getData = async () => {
        const query = await fetch('/api/supplier/list')
        const res = await query.json()
        
        setSupplierList(res.data)
    }

    function handleSelect(e) {
        setValue(e.target.value)
    }
   
    useEffect(() => {
        getLastId()
        getData()
      }, [])


    return <>
          <form onSubmit={onSubmit} className="container">
            <div>
                <h1>Form Products</h1>
            </div>
            <div>
                <input
                    type="hidden"
                    value={formData.id}>

                    </input>
                <div className="row">
                    <label>Nama</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nama">
                    </input>
                </div>

                <div className="row">
                    <label>Deskripsi</label>
                    <textarea 
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi">
                    </textarea>
                </div>

                <div className="row">
                    <label>Harga</label>
                    <input 
                        type="number" 
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        min={0}
                        placeholder="Harga">
                    </input>
                </div>

                <div className="row">
                    <label>Stok</label>
                    <input 
                        name="stok"
                        type="number" 
                        min={0}
                        value={formData.stok}
                        onChange={handleChange}
                        placeholder="Stok">
                    </input>
                </div>

                <div className="row">
                    <label>Supplier</label>
                    <select 
                        onChange={handleSelect}>
                    {
                        supplierList && supplierList.length > 0 ? supplierList.map((data: any, index: any) => {
                            return  (
                                <option 
                                    value={data.id_suplier} 
                                    >
                                    {data.nama_suplier}
                                </option>
                            ) 
                        }) : <option value={1} className="">Tidak ada supplier</option>
                    }
                    </select>
                </div>

                <div className="row">
                    <label>Foto</label>
                    <input 
                        type="file" 
                        name="file"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => setFile(e.target.files?.[0])}
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
        </form>
    </>;

}

export default FormProducts
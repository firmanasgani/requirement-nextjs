import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { Router } from "next/router"

const FormSupplier = () =>  {
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    var id = search == undefined ? 0 : search

 
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        alamat: "",
        email: "",
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {

            
            const url = id == 0 ? '/new' : '/update'
            const res = await axios.post("/api/supplier"+url, formData)
            console.log("POST Created", res.data)
            location.replace('/supplier/list_supplier')
        }catch(err) {
            console.log("error creating post", err) 
        }
    }


    useEffect(() => {
        const getDetail = async () => {
            const query = await fetch('/api/supplier/show?id='+search)
            const res = await query.json()
            setFormData(res.item)
            
        }
        id != 0 ? getDetail() : []
    }, [])

    return (
        <form onSubmit={handleSubmit}>
             <input
                type="hidden"
                name="search"
                value={formData.id}
                onChange={handleChange}>
            </input>
            <label>Nama: </label>
            <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}>
            </input>

            <label>Alamat</label>
            <input 
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}>
            </input>

            <label>Email</label>
            <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}>
            </input>
            <br />
            <button className="button button-primary" type="submit">{
                id == 0 ? 'Tambah' : 'Ubah'
            } Supplier</button>
            <br/>
            <Link className="button button-danger" href="/supplier/list_supplier">Kembali ke List Supplier</Link>

        </form>
    )
    
}
export default FormSupplier;
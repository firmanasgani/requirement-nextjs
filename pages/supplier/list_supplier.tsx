
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const  ListSupplier = () => {

  const [supplierList, setSupplierList] = useState([])

  const deleteSupplier = async (id) => {
    try {
      const res = await axios.post('/api/supplier/delete', {id: id})
      console.log("POST : " +res)
      location.reload()
    }catch(err) {
      console.log("Error: " +err)
    } 
  }


  useEffect(() => {    
    const getData = async () => {
      const query = await fetch('/api/supplier/list')
      const res = await query.json()
      
      setSupplierList(res.data)
    }
    getData()
  }, [])




  return <>
    <div 
      className="container">
       <h1>Lists of Supplier</h1>
       <Link href='/' className='button button-success'>
        Ke Products
       </Link>
       <table className="table-apps">
       <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>email</th>
              <th colSpan={2}>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {
            
            supplierList && supplierList.length > 0 ? supplierList.map((data: any, index: any) => {
              
              return (
                <>
                  <tr key={data.id_suplier}>
                    <td>{index+1}</td>
                    <td>{data.nama_suplier}</td>
                    <td>{data.alamat}</td>
                    <td>{data.email}</td>
                    <td>
                      <Link href={{ 
                        pathname:`/supplier/form_supplier`, 
                        query: {id: data.id_suplier}}} 
                        className='button button-info' >
                      Edit</Link>
                      <button
                        onClick={() => deleteSupplier(data.id_suplier)}
                        className='button button-danger'>
                      Hapus</button>
                    </td>
                  </tr>
                </>
              )
            }) : <tr><td colSpan={5}>Tidak ada data</td></tr>
          } 

          </tbody>
        </table>
        <Link href='/supplier/form_supplier' className='button button-success'>
        Tambah Supplier
       </Link>
    </div>
    
  </>;
}

export default ListSupplier
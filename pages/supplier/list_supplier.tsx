
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const  ListSupplier = () => {

  const [supplierList, setSupplierList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const query = await fetch('http://localhost:3000/api/supplier/list')
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
              <th>Nama</th>
              <th>Alamat</th>
              <th>email</th>
              <th colSpan={2}>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {
            
            supplierList && supplierList.length == 1 ? supplierList.map((data: any, index: any) => {
              
              return (
                <>
                  <tr key={data.id}>
                    <td>{data.nama_suplier}</td>
                    <td>{data.alamat}</td>
                    <td>{data.email}</td>
                    <td>
                      <Link href={{ 
                        pathname:'/supplier/form_supplier/[id]', 
                        query: {id: data.id}}} 
                        className='button button-info' >
                      Edit</Link>
                      <Link 
                        href={{ 
                          pathname:'/supplier/delete_products/[id]', 
                          query: {id: data.id}
                        }} 
                        className='button button-danger'>
                      Hapus</Link>
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

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const  ListProducts = () => {

  const [productList, setProductList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const query = await fetch('http://localhost:3000/api/products/list')
      const res = await query.json()
      setProductList(res.data)
    }
    getData()
  }, [])

  return <>
    <div 
      className="container">
       <h1>Lists of Products</h1>
       <Link href='/supplier/list_supplier' className='button button-success'>
        Ke Supplier
       </Link>
       <table className="table-apps">
       <thead>
            <tr>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>harga</th>
              <th>stok</th>
              <th>foto</th>
              <th colSpan={2}>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {
            
            productList && productList.length && productList.map((data: any, index: any) => {
              
              return (
                <>
                  <tr key={data.id}>
                    <td>{data.nama}</td>
                    <td>{data.deskripsi}</td>
                    <td>{data.harga}</td>
                    <td>{data.stok}</td>
                    <td>{data.foto}</td>
                    <td>
                      <Link href={{ pathname:'/products/form_product/[id]', query: {id: data.id}}} className='button button-info' >
                      Edit</Link>
                      <Link href={{ pathname:'/products/delete_products/[id]', query: {id: data.id}}} className='button button-danger'>
                      Hapus</Link>
                    </td>
                  </tr>
                </>
              )
            })
          } 

          </tbody>
        </table>
        <Link href='/supplier/form_product' className='button button-success'>
        Tambah Products
       </Link>
    </div>
    
  </>;
}

export default ListProducts
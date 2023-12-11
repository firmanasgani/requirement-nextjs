import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const  ListProducts = () => {

  const [productList, setProductList] = useState([])

  const deleteProduct = async (id) => {
    try {
      const res = await axios.post('/api/products/delete', {id: id})
      console.log('POST: ' +res) 
      location.reload()
    }catch(err) {
      console.error('Error : ' +err)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const query = await fetch('/api/products/list')
      const res = await query.json()
      console.log(res.data.length)
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
              <th>#</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>harga</th>
              <th>stok</th>
              <th>foto</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {
          
            productList.length > 0 ? productList.map((data: any, index: any) => {
              return (
                <>
                  <tr key={data.id}>
                    <td>{index+1}</td>
                    <td>{data.nama}</td>
                    <td>{data.deskripsi}</td>
                    <td>{data.harga}</td>
                    <td>{data.stok}</td>
                    <td><img src={'/uploads/products/'+data.foto} width={150} height={150}  /></td>
                    <td>
                      <Link href={{ pathname:'/products/form_product', query: {id: data.id}}} className='button button-info' >
                      Edit</Link>
                      <button onClick={() => deleteProduct(data.id)} className='button button-danger'>
                      Hapus</button>
                    </td>
                  </tr>
                </>
              )
            }) :  (<><tr><td colSpan={7}>Tidak ada data</td></tr></>)
          } 

          </tbody>
        </table>
        <Link href='/products/form_product' className='button button-success'>
        Tambah Products
       </Link>
    </div>
    
  </>;
}

export default ListProducts
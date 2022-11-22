import { Table } from 'antd'
import 'antd/dist/antd.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

function UsersRank(props:any) {
  const {auth} = useContext(AuthContext);
  const [data,setData]= useState()
  const columns = [
      {
        title : 'Nombre',
        dataIndex: 'names',
        key: 'names',
        render: (text:any) => <a>{text}</a>
      },
      { 
        title:"Puntaje",
        dataIndex: 'score',
        key: 'score',
        render: (text:any) => <a>{text}</a>
      },
      // {
      //   dataIndex: 'name',
      //   key: 'name',
      //   render: (text:any) => <a>{text}</a>  
      // },
    ];

  const getRankUser= async()=>{
    const data = await props.service.getRankUsers(auth.token)
    setData(data.sort((a:any,b:any)=> b.score - a.score))
  }
  useEffect(() => {
    getRankUser()
  }, [])
  
  return (
    <div className='container-fifa-rank'>
      <Table columns={columns} dataSource={data}  pagination={false}/>
    </div>
  )
}

export default UsersRank

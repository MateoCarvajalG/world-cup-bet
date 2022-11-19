import { InputNumber, Table } from 'antd'
import 'antd/dist/antd.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

function AllMatches(props:any) {
  const {auth,authDispatch} = useContext(AuthContext);

  const [matchesSorted,setMatchesSorted] = useState()
  const [localScore, setLocalStore] = useState()
  const [visitorScore, setVisitorScore] = useState()

    const columns = [
        {
          title: "Equipo Local",
          dataIndex: '',
          key: 'local',
          render: (text:any) => 
          <>
            <InputNumber 
                size="middle"
                min={0} 
                max={100000} 
                value={auth.matchesResults.find((match:any)=> match._id === text._id)?.local_score}
                onChange={(ev:any)=>{
                  authDispatch({
                    type:"UPDATE_MATCH",
                    payload:{
                      _id: text._id,
                      local_score: `${ev}`,
                      visitor_score:auth.matchesResults.find((match:any)=> match._id === text._id)?.visitor_score
                    }
                  })
                }} 
              />
            <img src={text.local_team.image} alt="" />
            <a>{text.local_team.name}</a>
          </>
        },
        {
          title: "Equipo Visita",
          dataIndex: '',
          key: 'visitor',
          render: (text:any) =>
          <>
            <InputNumber 
                size="middle"
                min={0} 
                max={100000} 
                value={auth.matchesResults.find((match:any)=> match._id === text._id)?.visitor_score}
                onChange={(ev:any)=>{
                  setLocalStore(ev)
                  authDispatch({
                    type:"UPDATE_MATCH",
                    payload:{
                      _id: text._id,
                      local_score: auth.matchesResults.find((match:any)=> match._id === text._id)?.local_score,
                      visitor_score:`${ev}`
                    }
                  })
                }} 
            />
            <img src={text.visiting_team.image} alt="" />
            <a>{text.visiting_team.name}</a>
            
          </> 
        },
        {
          title: "Fecha",
          dataIndex: 'date',
          key: 'date',
          render: (text:any) =><p>{new Date(text).toLocaleString("es-CO",{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'2-digit'})}</p>
        },
      ];


  useEffect(() => {
    setMatchesSorted(props.AllMatches.slice().sort((a:any,b:any)=> new Date(a.date).valueOf() - new Date(b.date).valueOf()))
  }, [])

  return (
    <div className='container-list-all-matches'>
      <Table columns={columns} dataSource={matchesSorted}  pagination={false}/>
    </div>
  )
}

export default AllMatches

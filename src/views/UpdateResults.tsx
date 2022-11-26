
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, InputNumber, Table } from 'antd';
import 'antd/dist/antd.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

function UpdateResultsMatches(props:any) {

  const {auth,authDispatch} = useContext(AuthContext);
  const [matchesSorted,setMatchesSorted] = useState()
  const [payload,setPayload] = useState<any>({})
  const [enableSend, setEnableSend] = useState<boolean>(false)
  const [actualId,setActualId] = useState()

  const updateScoreMatch = (token:string)=>{
    props.service.updateScoreMatch(token,payload)
  }

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
        defaultValue={props.service.matches.find((match:any)=> match._id === text._id)?.local_team.result}
        disabled={text.has_played}
        onChange={(ev:any)=>{
          if(actualId !== text._id){
            setPayload({idMatch:text._id,local_score:ev})
          }else{
            setPayload({...payload,local_score:ev,idMatch:text._id})
          }
          setActualId(text._id)
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
        defaultValue={props.service.matches.find((match:any)=> match._id === text._id)?.visiting_team.result}
        disabled={text.has_played}
        onChange={(ev:any)=>{
          if(actualId !== text._id){
            setPayload({idMatch:text._id,visitor_score:ev})
          }else{
            setPayload({...payload,visitor_score:ev,idMatch:text._id})
          }
          setActualId(text._id)
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
    {
      dataIndex: '',
      key: '',
      render: (text:any) =><Button onClick={()=>updateScoreMatch(auth.token)} type="primary" disabled={!(text._id === payload.idMatch && payload.local_score >= 0 && payload.visitor_score>=0)} icon={<CheckCircleTwoTone />} size="small" />
    },
];

  useEffect(() => {
    setMatchesSorted(props.service.matches.slice().sort((a:any,b:any)=> new Date(a.date).valueOf() - new Date(b.date).valueOf()))
  }, [])

  return (
    <div className='container-list-all-matches'>
      <Table columns={columns} dataSource={matchesSorted}  pagination={false}/>
    </div>
  )
}

export default UpdateResultsMatches

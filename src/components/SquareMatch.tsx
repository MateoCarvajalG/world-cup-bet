import { useContext, useEffect, useState } from "react";
import 'antd/dist/antd.css'
import { InputNumber, Modal, notification, Table } from "antd";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { showError } from "../alerts";
import { url } from "inspector";

function SquareMatch(props:any) {
  const {auth,authDispatch} = useContext(AuthContext);
  const [localScore, setLocalStore] = useState()
  const [visitorScore, setVisitorScore] = useState()
  const [resultMatch, setResultMatch] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersResults,setUsersResults] = useState()
  const columns = [
    {
      dataIndex: '',
      key: 'names',
      render: (text:any) => <h4>{text.user.names}</h4>
    },
    { 
      dataIndex: 'local_score',
      key: 'score',
      render: (text:any) => 
      <>
        <h4>{props.match.local_team.name}</h4>
        <h5>{text}</h5>
      </>
    },
    { 
      dataIndex: '',
      key: '',
      render: (text:any) => <h3>VS</h3>
    },
    { 
      dataIndex: 'visitor_score',
      key: 'score',
      render: (text:any) => 
      <>
        <h4>{props.match.visiting_team.name}</h4>
        <h5>{text}</h5>
      </>
    },
  ];

  const showModal = async () => {
    setIsModalOpen(true);
    const data = await props.service.getUsersResultsByMatchId(auth.token,props.match._id )
    setUsersResults(data)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect( () => {
    setResultMatch(auth.matchesResults.find((match:any)=> match._id === props.match._id ))
  },[])
  
  
  useEffect( () => {
    setLocalStore(resultMatch?.local_score)
    setVisitorScore(resultMatch?.visitor_score)
  },[resultMatch])
  return (
    <>
    <div className="square-match" onClick={showModal}>
        <h5>{new Date(props.match.date).toLocaleString('es-CO',{weekday: "long",year: "numeric",month: "long",day: "numeric",hour: "numeric"})}</h5>
        <div className="teams-finals">
          <div className="team-square" >
            { props.match.local_team.image ? 
            <>
              <img src={props.match.local_team.image} alt="" />
              <p>{props.match.local_team.name}</p>
            </>
              :
              "por definir" 
            }
          </div>
          <h1> {props.match.local_team.result}-{props.match.visiting_team.result}</h1>
          <div className="team-square">
            {props.match.visiting_team.image ? 
              <>
                <img src={props.match.visiting_team.image} alt="" />
                <p>{props.match.visiting_team.name}</p>
              </>
              :
              "por definir"
            }
          </div>
        </div>
    </div>
    {
        isModalOpen && 
        <Modal title="Detalle del partido" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <h1>Mi Resultado</h1>
          <div className='modal-my-result' >
            <img src={props.match.local_team.image} alt="" />
            <span>{props.match.local_team.name}</span>
            <InputNumber 
                    size="middle"
                    min={0} 
                    max={100000} 
                    value={localScore}
                    disabled={new Date > new Date(props.match.date)}
                    status = {localScore !== undefined ? '' : 'error'}
                    onChange={(ev:any)=>{
                      setLocalStore(ev)
                      const payload={
                        _id: props.match._id,
                        local_score: ev,
                        visitor_score:visitorScore
                      }
                      props.service.updateMatch(auth.token,auth.document,props.match._id,payload).then((res:any)=>{
                        authDispatch({
                          type:"UPDATE_MATCH",
                          payload
                          
                        })
                      }).catch((err:any)=>{
                        if(err.response.data.error.code===40102){
                          <Navigate to="/auth/login" />
                          authDispatch({
                            type:"LOGOUT"
                          })
                        }
                        notification.error({
                          message: 'Error',
                          description:
                            showError(err.response),
                        });
                      })
                    }} 
                    
                  />
          </div>
          <div  className='modal-my-result'>
            <img src={props.match.visiting_team.image} alt="" />
            <span>{props.match.visiting_team.name}</span>
            <InputNumber 
              size="middle"
              min={0} 
              max={100000} 
              value={visitorScore} 
              status = {visitorScore !== undefined ? '' : 'error'}
              disabled={new Date > new Date(props.match.date)}
              onChange={(ev:any)=>{
                setVisitorScore(ev)
                const payload={
                  _id: props.match._id,
                  local_score: localScore,
                  visitor_score:ev
                }
                props.service.updateMatch(auth.token,auth.document,props.match._id,payload).then((res:any)=>{
                  authDispatch({
                    type:"UPDATE_MATCH",
                    payload
                  })
                }).catch((err:any)=>{
                  if(err.response.data.error.code===40102){
                    <Navigate to="/auth/login" />                      
                    console.log('entro')
                    authDispatch({
                      type:"LOGOUT"
                    })
                  }
                  notification.error({
                    message: 'Error',
                    description:
                      showError(err.response),
                  });
                })
              }}  
            />
          </div>
          <h1>Resultados de los participantes</h1>
          {
            new Date > new Date(props.match.date) ? 
              <Table columns={columns} dataSource={usersResults}  pagination={false}/>
            : 
              <h3>Una vez iniciado el encuentro, podras ver los resultados de los demas participantes</h3>

          }

        </Modal>
      }
    </>
  );
}
export default SquareMatch;
import { useContext, useEffect, useState } from "react";
import 'antd/dist/antd.css'
import { InputNumber, notification } from "antd";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { showError } from "../alerts";

function SquareMatch(props:any) {
  const {auth,authDispatch} = useContext(AuthContext);
  const [localScore, setLocalStore] = useState()
  const [visitorScore, setVisitorScore] = useState()
  const [resultMatch, setResultMatch] = useState<any>({});


  useEffect( () => {
    setResultMatch(auth.matchesResults.find((match:any)=> match._id === props.match._id ))
  },[])
  
  
  useEffect( () => {
    setLocalStore(resultMatch?.local_score)
    setVisitorScore(resultMatch?.visitor_score)
  },[resultMatch])
  return (
    <>
    <div className="square-match">
        <h5>{new Date(props.match.date).toLocaleString('es-CO',{weekday: "long",year: "numeric",month: "long",day: "numeric",hour: "numeric"})}</h5>
        <div className="teams-finals">
          <div className="team-square" >
              { props.match.local_team.image ? 
              <>
                <span>{props.match.local_team.name}</span>
                <img src={props.match.local_team.image} alt="" />
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
              </>
                :
                "por definir"
                
              }
          </div>
          <h1>-</h1>
          <div className="team-square">
            {props.match.visiting_team.image ? 
            <>
            <span>{props.match.visiting_team.name}</span>
            <img src={props.match.visiting_team.image} alt="" />
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
            </>
            :
            "por definir"
            }
            
          </div>

        </div>
    </div>
    </>
  );
}
export default SquareMatch;
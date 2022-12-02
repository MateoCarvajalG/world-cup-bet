import { useContext, useEffect, useState } from "react";
import 'antd/dist/antd.css'
import SquareMatch from "./SquareMatch";

function FinalFase(props:any) {
  const [matchesRound16,setMatchesRound16]= useState([])
  const [matchesQuarters,setMatchesQuarters]= useState([])
  const [matchesSemiFinals,setMatchesSemiFinals]= useState([])
  const [matchFinal,setMatchFinal]= useState([])

  
  useEffect(()=>{
    setMatchesRound16(props.matches.filter((match:any)=>match.group === 'Round of 16'))
    setMatchesQuarters(props.matches.filter((match:any)=>match.group === 'Quarter finals'))
    setMatchesSemiFinals(props.matches.filter((match:any)=>match.group === 'Semi finals'))
    setMatchFinal(props.matches.filter((match:any)=>match.group === 'Final'))
  },[])
  return (
    <>
      <div className="Square">
        <div  className="fase">
          {
            matchesRound16.map((match:any)=>{
              return(
                <SquareMatch service={props.service} match={match}/>
              )
            })
          }
          
        </div>
        <div className="fase">
          {
            matchesQuarters.map((match:any)=>{
              return(
                <SquareMatch match={match}/>
              )
            })
          }
        </div>
        <div className="fase">
          {
             matchesSemiFinals.map((match:any)=>{
              return(
                <SquareMatch match={match}/>
              )
            })
          }
        </div>
        <div className="fase">
          {
             matchFinal.map((match:any)=>{
              return(
                <SquareMatch match={match}/>
              )
            })
          }
        </div>
      </div>
    </>
  );
}
export default FinalFase;
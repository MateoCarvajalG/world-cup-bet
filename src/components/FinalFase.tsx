import { useContext, useEffect, useState } from "react";
import 'antd/dist/antd.css'
import SquareMatch from "./SquareMatch";
import worldCup from '../assets/worldcup.png'

function FinalFase(props:any) {
  const [matchesRound16,setMatchesRound16]= useState([])
  const [matchesQuarters,setMatchesQuarters]= useState([])
  const [matchesSemiFinals,setMatchesSemiFinals]= useState([])
  const [matchFinal,setMatchFinal]= useState([])
  const [thirdPlaceMatch,setThirdPlaceMatch]=useState([])

  
  useEffect(()=>{
    setMatchesRound16(props.matches.filter((match:any)=>match.group === 'Round of 16'))
    setMatchesQuarters(props.matches.filter((match:any)=>match.group === 'Quarter finals'))
    setMatchesSemiFinals(props.matches.filter((match:any)=>match.group === 'Semi finals'))
    setThirdPlaceMatch(props.matches.filter((match:any)=>match.group === 'Third place'))
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
                <SquareMatch service={props.service} match={match}/>
              )
            })
          }
        </div>
        <div className="fase">
          {
            matchesSemiFinals.map((match:any)=>{
              return(
                <SquareMatch service={props.service} match={match}/>
                )
              })
            }
        </div>
        <div className="fase final">
          {
            thirdPlaceMatch.map((match:any)=>{
              return(
                <SquareMatch service={props.service} match={match}/>
                )
              })
            }
        </div>
        <div className="fase final">
          <img src={worldCup} className="img-worldcup" />
          {
            matchFinal.map((match:any)=>{
              return(
                <SquareMatch service={props.service} match={match}/>
                )
              })
            }
        </div>
      </div>
    </>
  );
}
export default FinalFase;
import 'antd/dist/antd.css'
import '../App.css'
import { useContext, useEffect, useState } from 'react'
import {Tabs,Layout} from 'antd';
import Podium from '../components/Podium'
import Match from '../components/Match'
import FifaRank from '../components/FifaRank';
import { teamsService } from '../services/teams.services';
import logoworldcup from '../assets/world-cup-2022-logo.svg'
import { AuthContext } from '../context/AuthContext';
import AllMatches from '../components/AllMatches';
import UsersRank from '../components/UsersRank';
import UpdateResultsMatches from './UpdateResults';
import FinalFase from '../components/FinalFase';

const {Header} = Layout
function Game() {

  const {auth} = useContext(AuthContext);

  const [service,setService] = useState(new teamsService())
  const [teams,setTeams] = useState()
  const [teamsSelect,setTeamsSelect] = useState()
  const [matches,setMatches] = useState([])
  const [group,setGroup] = useState('A')
  const [test,setTest]= useState(true)

  const getTeams =async ()=>{
    setTeams(await (await service.getTeams(auth.token)).teams)
    setTeamsSelect(await (await service.getTeams(auth.token)).teamsSelect)
  }
  const getMatches = ()=>{
    service.getMatches(auth.token).then(()=>{
      setMatches( service.getMatchesByGroup('A'))
    })
  }
  const onChangeTabGroup = (key:any) => {
    setMatches(service.getMatchesByGroup(key))
  };

  const onChangeRank = (key:any) => {
    console.log(key)
  };
  useEffect( () => {
    getTeams()
    getMatches()
  }, [])
  
  const listMatches = matches.map((match:any,index:any) =>  {
    return <Match forceRender={true} key={index} match={match} service={service}/>
  });

  const items = [
    { label: 'Grupo A', key: 'A', children: <div className='matches'>{listMatches}</div> }, // remember to pass the key prop
    { label: 'Grupo B', key: 'B', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo C', key: 'C', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo D', key: 'D', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo E', key: 'E', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo F', key: 'F', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo G', key: 'G', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo H', key: 'H', children: <div className='matches'>{listMatches}</div> },
    { label: 'Todos los partidos', key: 'all', children: <div className='matches'><AllMatches  service={service}/></div> },

  ];
  const tabsRank=[
    { label: 'Fifa', key: 'fifa', children: <FifaRank teams={teams} /> }, // remember to pass the key prop
    { label: 'Participantes', key: 'players', children: <UsersRank service={service}/>},
  ]
  const itemsB = [
    ...(auth.document === "1053845913" || auth.document === "1053850398" ?
      [{ label: 'Fase de grupos', key: 'groups', children: <Tabs destroyInactiveTabPane={true} className='tabs-group' onChange={onChangeTabGroup} items={items}/> }, // remember to pass the key prop
      { label: 'Fase Final', key: 'Finals', children: 
      <FinalFase
        matches={service.matches.filter((match:any) => match.group === "Round of 16" || match.group === "Quarter finals" || match.group === "Semi finals"  || match.group === "Third place" || match.group === "Final")}
        service={service}
       /> 
      },
      { label: 'Clasificacion', key: 'clasifieds', children: <Tabs className='tabs-group' onChange={onChangeRank} items={tabsRank}/>},
      { label: 'Actualizacion', key: 'updateResult', children: <div className='matches'> <UpdateResultsMatches service={service}/> </div> }]
      :
      [{ label: 'Fase de grupos', key: 'groups', children: <Tabs destroyInactiveTabPane={true} className='tabs-group' onChange={onChangeTabGroup} items={items}/> }, // remember to pass the key prop
      { label: 'Fase Final', key: 'Finals', children: 
      <FinalFase
        matches={service.matches.filter((match:any) => match.group === "Round of 16" || match.group === "Quarter finals" || match.group === "Semi finals"  || match.group === "Third place" || match.group === "Final")}
        service={service}
      /> 
      },
      { label: 'Clasificacion', key: 'clasifieds', children: <Tabs className='tabs-group' onChange={onChangeRank} items={tabsRank}/>},]
      )  
  ];

  const onChangeB = (key:any) => {
    console.log(key)
  };
  
 
  return (
    <div className="App">
      <Header className='content-header'>
        <h1>{auth.names}</h1>
        <h2>{auth.score} puntos</h2>
      </Header>
      <img src={logoworldcup} alt="" className='img-logo'/>
      <div className='container-podium-rank'>
        <Podium service={service} teamsSelect={teamsSelect}/>
      </div>
      <Tabs className='tabs-group' onChange={onChangeB} items={itemsB} />
    </div>
  )
}

export default Game

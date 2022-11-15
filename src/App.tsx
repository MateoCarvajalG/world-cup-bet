import 'antd/dist/antd.css'
import './App.css'
import { useEffect, useState } from 'react'
import {Tabs} from 'antd';
import Podium from './components/Podium'
import Match from './components/Match'
import FifaRank from './components/FifaRank';
import { teamsService } from './services/teams.services';
import logoworldcup from './assets/world-cup-2022-logo.svg'
import developGif from './assets/75146-development.gif'
function App() {
  const [service,setService] = useState(new teamsService())
  const [teams,setTeams] = useState()
  const [teamsSelect,setTeamsSelect] = useState()
  const [matches,setMatches] = useState([])

  const getTeams =async ()=>{
    setTeams(await (await service.getTeams()).teams)
    setTeamsSelect(await (await service.getTeams()).teamsSelect)
  }
  const getMatches = ()=>{
    service.getMatches().then(()=>{
      setMatches( service.getMatchesByGroup('A'))
    })
  }
  const onChangeTabGroup = (key:any) => {
    setMatches(service.getMatchesByGroup(key))
  };
  useEffect( () => {
    getTeams()
    getMatches()
  }, [])
  const listMatches = matches.map((match:any,index:any) => <Match key={index} match={match}/>);

  const items = [
    { label: 'Grupo A', key: 'A', children: <div className='matches'>{listMatches}</div> }, // remember to pass the key prop
    { label: 'Grupo B', key: 'B', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo C', key: 'C', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo D', key: 'D', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo E', key: 'E', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo F', key: 'F', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo G', key: 'G', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo H', key: 'H', children: <div className='matches'>{listMatches}</div> },
  ];
  const itemsB = [
    { label: 'Fase de grupos', key: 'groups', children: <Tabs className='tabs-group' onChange={onChangeTabGroup} items={items}/> }, // remember to pass the key prop
    { label: 'Fase Final', key: 'Finals', children: 
      <div className='in-develop'>
        <h1>En desarrollo</h1>
        <img src="https://media4.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="" />
      </div>  
    },
    { label: 'Clasificacion', key: 'clasifieds', children: 
      <div className='in-develop'>
        <h1>En desarrollo</h1>
        <img src="https://media4.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="" />
      </div>  
    },

  ];

  const onChangeB = (key:any) => {
    console.log(key)
  };
  return (
    <div className="App">
      <img src={logoworldcup} alt="" className='img-logo'/>
      <div className='container-podium-rank'>
        <Podium service={service} teamsSelect={teamsSelect}/>
        <FifaRank teams={teams} />
      </div>
      <Tabs className='tabs-group' onChange={onChangeB} items={itemsB} />
    </div>
  )
}

export default App

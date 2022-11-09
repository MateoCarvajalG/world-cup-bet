import 'antd/dist/antd.css'
import './App.css'
import { useState } from 'react'
import {Tabs,InputNumber } from 'antd';
import Podium from './components/Podium'
import Match from './components/Match'

function App() {
  const matchesGroupA= [{
      date:'Dom, 20/11, 11:00',
      nameA: 'Qatar',
      imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png',
      nameB: 'Ecuador',
      imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/AKqvkBpIyr-iLOK7Ig7-yQ_48x48.png"
    },
    {
      date:'Dom, 20/11, 11:00',
      nameA: 'Qatar',
      imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png',
      nameB: 'Ecuador',
      imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/AKqvkBpIyr-iLOK7Ig7-yQ_48x48.png"
    },
    {
      date:'Dom, 20/11, 11:00',
      nameA: 'Qatar',
      imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png',
      nameB: 'Ecuador',
      imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/AKqvkBpIyr-iLOK7Ig7-yQ_48x48.png"
    },
    {
      date:'Dom, 20/11, 11:00',
      nameA: 'Qatar',
      imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png',
      nameB: 'Ecuador',
      imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/AKqvkBpIyr-iLOK7Ig7-yQ_48x48.png"
    },
    {
      date:'Dom, 20/11, 11:00',
      nameA: 'Qatar',
      imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png',
      nameB: 'Ecuador',
      imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/AKqvkBpIyr-iLOK7Ig7-yQ_48x48.png"
    },
    {
      date:'Dom, 20/11, 11:00',
      nameA: 'Qatar',
      imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/h0FNA5YxLzWChHS5K0o4gw_48x48.png',
      nameB: 'Ecuador',
      imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/AKqvkBpIyr-iLOK7Ig7-yQ_48x48.png"
    },
  ]
  const matchesGroupB= [{
    date:'Lun 21/11, 08:00',
    nameA: 'Inglaterra',
    imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png',
    nameB: 'Iran',
    imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/1oq8Fy7ETpBpZNaCA22ArQ_48x48.png"
  },
  {
    date:'Lun 21/11, 08:00',
    nameA: 'Inglaterra',
    imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png',
    nameB: 'Iran',
    imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/1oq8Fy7ETpBpZNaCA22ArQ_48x48.png"
  },
  {
    date:'Lun 21/11, 08:00',
    nameA: 'Inglaterra',
    imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png',
    nameB: 'Iran',
    imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/1oq8Fy7ETpBpZNaCA22ArQ_48x48.png"
  },
  {
    date:'Lun 21/11, 08:00',
    nameA: 'Inglaterra',
    imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png',
    nameB: 'Iran',
    imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/1oq8Fy7ETpBpZNaCA22ArQ_48x48.png"
  },
  {
    date:'Lun 21/11, 08:00',
    nameA: 'Inglaterra',
    imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png',
    nameB: 'Iran',
    imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/1oq8Fy7ETpBpZNaCA22ArQ_48x48.png"
  },
  {
    date:'Lun 21/11, 08:00',
    nameA: 'Inglaterra',
    imgA: 'https://ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png',
    nameB: 'Iran',
    imgB:"https://ssl.gstatic.com/onebox/media/sports/logos/1oq8Fy7ETpBpZNaCA22ArQ_48x48.png"
  },
]
  const listItems = matchesGroupA.map((match:any) => <Match match={match}/>);
  const listItemsB = matchesGroupB.map((match:any) => <Match match={match}/>);

  const items = [
    { label: 'Grupo A', key: 'item-1', children: <div className='matches'>{listItems}</div> }, // remember to pass the key prop
    { label: 'Grupo B', key: 'item-2', children: <div className='matches'>{listItemsB}</div> },
  ];
  const onChange = (key:any) => {
    console.log(key);
  };
  return (
    <div className="App">
      <Podium/>
      <Tabs onChange={onChange} items={items} />
    </div>
  )
}

export default App

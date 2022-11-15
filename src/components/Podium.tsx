import 'antd/dist/antd.css'
import { useState } from 'react'
import {Select } from 'antd'; 
import { User } from '../mockups/User.mockup';

function Podium(props:any) {

  const [imageSecond,setImageSecond] = useState(User.selected_teams['runner_up'])
  const [imageFirts,setImageFirts] = useState(User.selected_teams['champion'])
  const [imageThird,setImageThird] = useState(User.selected_teams['third_place'])


  const handleChangeSecond = (value:any) => {
    setImageSecond(value)
  };
  const handleChangeFirst = (value:any) => {
    setImageFirts(value)
  };
  const handleChangeThird = (value:any) => {
    setImageThird(value)
    
  };
  

  return (
    <>
      <div className='container-podium'>
        <div className='podium'>
          <img src={props.service.getImageByTeamId(imageSecond)?.image } alt="" />
          <div className='selectPodium' >
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChangeSecond}
              options={props.teamsSelect}
              showSearch
              defaultValue={User.selected_teams['runner_up']}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              // disabled
            />
            <b>2</b>
          </div>
        </div>
        <div className='podium'>
        <img src={props.service.getImageByTeamId(imageFirts)?.image} alt="" />
          <div className='selectPodium'>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChangeFirst}
              options={props.teamsSelect}
              showSearch
              defaultValue={User.selected_teams['champion']}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
            <b>1</b>
          </div>
        </div>
        <div className='podium'>
        <img src={props.service.getImageByTeamId(imageThird)?.image} alt="" />
          <div className='selectPodium'>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChangeThird}
              options={props.teamsSelect}
              showSearch
              defaultValue={User.selected_teams['third_place']}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
            <b>3</b>
          </div>
        </div>
      </div>
    </>
  )
}

export default Podium

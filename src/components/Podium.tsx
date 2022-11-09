import 'antd/dist/antd.css'
import { useState } from 'react'
import {Select } from 'antd';

function Podium() {
  const handleChangeSecond = (value:any) => {
    console.log(`selected second place ${value}`);
  };
  const handleChangeFirst = (value:any) => {
    console.log(`selected firs place ${value}`);
  };
  const handleChangeThird = (value:any) => {
    console.log(`selected third place ${value}`);
  };
  const [teams,setTeams] = useState([
    {
      value: 'Brasil',
      label: 'Brasil',
    },
    {
      value: 'Argentina',
      label: 'Argentina',
    },
    {
      value: 'Ecuador',
      label: 'Ecuador',
    },
    {
      value: 'Alemania',
      label: 'Alemania',
    },
  ])
  return (
    <>
      <div className='container-podium'>
        <div className='podium'>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChangeSecond}
            options={teams}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
          <b>2</b>
        </div>
        <div className='podium'>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChangeFirst}
            options={teams}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
          <b>1</b>
        </div>
        <div className='podium'>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChangeThird}
            options={teams}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
          <b>3</b>
        </div>
      </div>
    </>
  )
}

export default Podium

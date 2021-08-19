import React from 'react'
import {Form, Input, Select} from "antd";

export interface User{
    id:string
    name:string
    email:string
    title:string
    organization:string
    token:string
}
interface SearchPanelProps{
    users:User[]
    param:{
        name:string
        personId:string
    }
    setParam:(param:SearchPanelProps['param'])=>void
}

export const SearchPanel=({param,users,setParam}:SearchPanelProps)=>{
  
    return <Form>
        <div>
            <Input
            type="text" 
            value={param.name} 
            onChange={event=>setParam({...param,name:event.target.value})}
            />
        </div>
        <Select  value={param.personId} onChange={value=>setParam({...param,personId:value})}>
            <Select.Option value={''}>负责人</Select.Option>
            {
                users.map(user=> <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
            }
        </Select>
    </Form>
}
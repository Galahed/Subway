import {useEffect, useState} from "react";

let ws
let period
let last
let lastTimeCall

const useSubwayEntrance=addr=>{
  if(ws&&ws.addr===addr){return}
  ws=new WebSocket(addr)
  ws.addr=addr
}

const useSubway=(entity,defaultValue)=>{
  const [model, setModel] = useState(0,defaultValue||{});

  const isDouble=message=>{
    if(last===message){return true}
    last=message
  }

  const debounce=(period=100)=>{
    const now=new Date()
    if((now-lastTimeCall)<period){return true}
    lastTimeCall=now
  }

  ws.onmessage=message=>{
    if(debounce()){return}
    if(isDouble(message)){return}
    const result=JSON.parse(message.data)
    if(result.entity===entity){
      result.data.sid=Math.random()
      setModel(result.data)
    }
  }


  useEffect(() => {
    if(debounce()){return}
    const message=JSON.stringify({entity,data:model})
    if(isDouble(message)){return}
    if(ws.readyState===1){ws.send(message)}

  },[model]);

  return [model,setModel]
}

export {useSubway,useSubwayEntrance}

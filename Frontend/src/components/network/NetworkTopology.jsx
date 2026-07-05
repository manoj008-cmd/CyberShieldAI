import { useEffect, useState } from "react";

function NetworkTopology({ prediction }) {
  const [status, setStatus] = useState("Normal");

  useEffect(() => {
    if (prediction && prediction.prediction) {
      if (prediction.prediction === "Normal" || prediction.prediction === "Loading...")
        setStatus("Normal");
      else
        setStatus("Attack");
    }
  }, [prediction]);

  const color = () => {

    if(status==="Attack") return "#DC2626";

    if(status==="Suspicious") return "#F59E0B";

    return "#22C55E";

  };

  const lineStyle={
      width:"6px",
      height:"40px",
      background:color(),
      margin:"0 auto",
      borderRadius:"10px"
  }

  const nodeStyle={
      background:"#1E293B",
      color:"white",
      padding:"12px",
      border:`3px solid ${color()}`,
      borderRadius:"10px",
      width:"150px",
      textAlign:"center"
  }

  return (

<div
style={{
background:"#111827",
padding:"30px",
borderRadius:"12px",
marginTop:"20px"
}}
>

<h2
style={{
color:"white",
textAlign:"center",
marginBottom:"20px"
}}
>
🖥 Network Topology
</h2>

<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>

<div style={nodeStyle}>
🌐 Internet
</div>

<div style={lineStyle}></div>

<div style={nodeStyle}>
🔥 Firewall
</div>

<div style={lineStyle}></div>

<div style={nodeStyle}>
🔀 Switch
</div>

<div style={lineStyle}></div>

<div style={{
display:"flex",
gap:"40px",
marginBottom:"20px"
}}>

<div style={nodeStyle}>
🖥 PC-1
</div>

<div style={nodeStyle}>
🖥 AI Server
</div>

<div style={nodeStyle}>
🖥 PC-2
</div>

</div>

<h3
style={{
color:color()
}}
>
Current Status : {status}
</h3>

</div>

</div>

  );

}

export default NetworkTopology;
import { useEffect, useState } from "react";
import api from "../../services/api";

function RiskScore() {

    const [risk,setRisk]=useState({});

    const loadRisk=async()=>{

        try{

            const res=await api.get("/risk-score");

            setRisk(res.data);

        }

        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        loadRisk();

        const timer=setInterval(loadRisk,5000);

        return ()=>clearInterval(timer);

    },[]);

    const color=()=>{

        if(risk.status==="Critical")
            return "#DC2626";

        if(risk.status==="Medium")
            return "#F59E0B";

        return "#22C55E";

    };

    return(

        <div
        style={{
            background:"#1E293B",
            color:"white",
            padding:"20px",
            borderRadius:"12px",
            marginTop:"20px"
        }}
        >

            <h2>🛡 Network Risk Score</h2>

            <h1
            style={{
                color:color(),
                fontSize:"60px"
            }}
            >
                {risk.score}
            </h1>

            <h3>{risk.status}</h3>

            <div
            style={{
                width:"100%",
                background:"#334155",
                borderRadius:"20px",
                height:"18px",
                marginTop:"20px"
            }}
            >

                <div
                style={{
                    width:`${risk.score}%`,
                    height:"18px",
                    borderRadius:"20px",
                    background:color()
                }}
                />

            </div>

        </div>

    );

}

export default RiskScore;
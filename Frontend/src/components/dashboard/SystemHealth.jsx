import { useEffect, useState } from "react";
import api from "../../services/api";

function SystemHealth() {

    const [health,setHealth]=useState({});

    const loadHealth=async()=>{

        try{

            const res=await api.get("/system-health");

            setHealth(res.data);

        }
        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        loadHealth();

        const timer=setInterval(loadHealth,5000);

        return ()=>clearInterval(timer);

    },[]);

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

            <h2>🖥 Live System Health</h2>

            <p><strong>CPU Usage:</strong> {health.cpu}%</p>

            <p><strong>RAM Usage:</strong> {health.ram}%</p>

            <p><strong>Disk Usage:</strong> {health.disk}%</p>

            <p><strong>Backend:</strong> 🟢 {health.backend}</p>

            <p><strong>Database:</strong> 🟢 {health.database}</p>

            <p><strong>ML Model:</strong> 🟢 {health.model}</p>

        </div>

    );

}

export default SystemHealth;
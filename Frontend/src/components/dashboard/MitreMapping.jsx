import { useEffect, useState } from "react";
import api from "../../services/api";

function MitreMapping() {

    const [data,setData]=useState({});

    const load=async()=>{

        try{

            const res=await api.get("/mitre");

            setData(res.data);

        }

        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        load();

        const timer=setInterval(load,5000);

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

            <h2>🎯 MITRE ATT&CK Mapping</h2>

            <p><b>Attack:</b> {data.attack}</p>

            <p><b>MITRE ID:</b> {data.id}</p>

            <p><b>Technique:</b> {data.technique}</p>

        </div>

    );

}

export default MitreMapping;
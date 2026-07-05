import { useEffect, useState } from "react";
import api from "../../services/api";

function AIRecommendations() {

    const [data,setData]=useState({});

    const load=async()=>{

        try{

            const res=await api.get("/recommendations");

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

            <h2>🤖 AI Recommendations</h2>

            <p>

                <strong>Detected Attack:</strong>

                {data.attack}

            </p>

            <ul>

                {data.actions?.map((item,index)=>(

                    <li key={index}>

                        ✅ {item}

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default AIRecommendations;
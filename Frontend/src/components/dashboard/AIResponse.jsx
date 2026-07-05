import { useEffect, useState } from "react";
import api from "../../services/api";

function AIResponse() {

  const [response, setResponse] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/response");
      setResponse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    load();

    const timer = setInterval(load,3000);

    return ()=>clearInterval(timer);

  },[]);

  if(!response) return null;

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

      <h2>🤖 AI Automated Response</h2>

      <p>
        <b>Attack:</b> {response.attack}
      </p>

      <p>
        <b>Severity:</b> {response.severity}
      </p>

      <h3>Actions</h3>

      <ul>
        {response.actions.map((a,index)=>(
          <li key={index}>{a}</li>
        ))}
      </ul>

    </div>

  );

}

export default AIResponse;
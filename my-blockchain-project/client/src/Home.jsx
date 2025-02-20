import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
function Home() {

  const [showButtons, setShowButtons] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handlesubmit =async (e)=>{
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)

      try {
        const response = await fetch("http://localhost:5000/caseview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blockhain: inputValue }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Response from API:", data);
          alert("Value sent successfully!");
          setInputValue(""); // Clear the input field after successful submission
          navigate("/caseview", {
            state: { blockhain: inputValue },
          });
          
        } else {
          console.error("Error sending value");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to Verdict-Vault</h1>
      </div>
      <div className="flex space-x-40 pt-20 cursor-pointer">
        {/* First SVG with hover functionality */}
       

        {/* Other SVGs */}
        <Link to="policelogin">
        <img width="200" height="200" src="https://www.svgrepo.com/show/35009/policeman.svg" alt="policeman-male--v1"/>
        </Link>
        <Link to="/lawyer">
        <img width="200" height="200" src="https://cdn-icons-png.flaticon.com/512/2957/2957085.png" alt="policeman-male--v1"/>

        </Link>
        <Link to="/judgelogin">
        <img width="200" height="200" src="https://cdn-icons-png.flaticon.com/512/5736/5736575.png" alt="policeman-male--v1"/>
      
        </Link>
      </div>
    </div>
  );
}

export default Home;

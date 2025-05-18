import { useEffect, useRef, useState } from 'react';
import ChatbotIcon from "./components/chatbotIcon";
import { ChatForm } from "./components/ChatForm";
import ChatMessage from "./components/chatMessage";






 const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef();

const generateBotResponse = async (history)=>{
  //helper function to update chat history
  const updateHistory = (text) => {
    setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}]); //reaplcing the last bot's "Thinking" text with response
  };

//  formate chat history for api request
  history=history.map(({role,text})=> ({role,parts:[{text}]}));

    // console.log(history);
    const requestOptions ={ 
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({contents : history}), 
    };
    try {
      //make the api call to get the bot's response 
          const response = await fetch (import.meta.env.VITE_API_URL, requestOptions); //NAME OF THE APIKEY
          const data = await response.json();
          if(!response.ok) throw new Error(data.error.message ||  "something went wrong!");

          // console.log(data);
          // lets replace the thinking msg to respose from gemini 
          //clean abd update chat history with bot's repose
          const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
          updateHistory(apiResponseText);
        }
    catch (error){
      console.log(error);
                  }
};

// remember to importthe useEffect hook
useEffect(()=>
{ //auto scroll whenever chat History updates
  chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
}, [chatHistory]);
  return (
    <div className="container">
      <div className="chatbot-popup">
          {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
          <ChatbotIcon/>
            <h2 className="logo-text">Chatbot</h2>
          </div>
          {/* linking google fonts-> inserting the icon  */}

           {/* <button className="material-symbols-rounded"> keyboard_arrow_down</button>  */}
        </div>

          {/* chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">  
              Hey there 👋 <br/> How can I help you today?
            </p>
          </div>

          {/* render the chat history dynamically */}
          {chatHistory.map((chat, index)=> (
            <ChatMessage key={index} chat={chat}/>
            
          ))}
          

        </div>
        {/* chatbot footer */}
        <div className="chat-footer">
          
          {/* import the ChatForm.jsx component */}
          {/* passing the setChatHistory as a prop */}
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
        
      </div>
    </div>
  );

};
export default App;

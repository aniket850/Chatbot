import { useRef } from 'react';

// receiving the function that was passsed ->setChatHistory
export const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit =(e)=>{
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;
        inputRef.current.value="";


        // console.log(userMessage);

        //update chat history using user message
        setChatHistory((history) =>[...history,{ role: "user",text: userMessage}]);
    // delay 600 ms before showing "Thinking..." and generating response
        setTimeout(()=>{
     //Add a Thinking Placeholder for the bot's response
      setChatHistory((history) =>[...history,{ role: "model",text: "Thinking..." }]);

     //call the function to generate the bot's response
     generateBotResponse([...chatHistory,{ role: "user",text: userMessage}]);

    },600);
  };


  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
    <input ref={inputRef} type="text" placeholder="message..." className="message-input" required/>
    <button className="material-symbols-rounded">arrow_upward</button> 
  </form>
  );
};

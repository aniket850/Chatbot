import ChatbotIcon from "./chatbotIcon";


export const ChatMessage = ({chat}) => {
  return (
    <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
            {/* only add chatbot icon only if the chat's role is "model" */}
            {chat.role === "model" && <ChatbotIcon/>}
            <p className="message-text">{chat.text}</p>
            {/* <p className="message-text">  
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, esse.
            </p> */}
          </div>
  )
}
export default ChatMessage;

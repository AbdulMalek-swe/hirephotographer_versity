import axios from "apiService/axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import route from "routes/Route";
import { addUserActions } from "rtk/feature/addUserSlice";
import store from "rtk/store/store";
import 'react-chatbot-kit/build/main.css'
import Chatbot, { createChatBotMessage } from "react-chatbot-kit";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.message);
      });
  }, []);

  return (
    <div>
      <img src={imageUrl} alt='a dog' />
    </div>
  );
};
const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm bot to show only dog picture `)],
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDog = (d) => {
    console.log(d);
    const botMessage = createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: 'dogPicture',
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const another = (d) => {
    console.log(d);
    const botMessage = createChatBotMessage(
      "i can show only dog picture, please typing dog word and see different dog photo",
      {
        widget: 'dogPicture',
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello and handleDog function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDog,
            another
          },
        });
      })}
    </div>
  );
};


const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
   
    if (message.includes('hello')) {
      actions.handleHello();
    }
    if (message.includes('dog')) {
      actions.handleDog(message);
    }
    else{
      actions.another(message)
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};


function App() {
  const [, , removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    async function userProfile() {
      try {
        const profile = await axios.get("/user/detail")
        console.log(profile.data);
        // .then(res=>{
        store.dispatch(addUserActions.addUser(profile?.data?.user));
        // })
      }
      catch {
        removeCookie("access_token", { path: "/" });
        // navigate("/")
      }

    }

    userProfile()
  }, [removeCookie])
  const [toggle, setToggle] = useState(false);
  
  return (
    <div className="  bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed">
      <div className="fixed bottom-10 right-5 z-10">
        <button onClick={() => setToggle(!toggle)} className="bg-red-700 rounded-full p-6">
          <ChatBubbleOutlineIcon />
        </button>
        <div className="bg-red-700">
          {
            toggle && <Chatbot

              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          }
        </div>
      </div>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;

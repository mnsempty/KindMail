import { useContext, useEffect, useState } from 'react';
import { Avatar, Listbox, ListboxItem, Skeleton } from '@nextui-org/react';
import { jwtDecode } from 'jwt-decode';

import GlobalStateContext from './GlobalStateContext';
import useGetChatDetails from '../../hooks/FetchChat';
import { switchChat } from "../../socket";
import ResearchCustom from './ResearchCustom';

export default function CustomAside() {
  const { ChatIds, setSelectedChatId } = useContext(GlobalStateContext);
  const { loading, chatDetails, getChatDetails } = useGetChatDetails(); // Utiliza el hook para obtener los datos de los chats
  const [filteredChats, setFilteredChats] = useState(null);
  const [UserInfo, setUserInfo] = useState(null); // state para almacenar el email del usuario actual

  //sacar email del localstorage
  const getUserEmailFromLocalStorage = () => {
    const userInfo = localStorage.getItem('chat-user');
    if (!userInfo) return null;

    const decodedUserInfo = jwtDecode(userInfo);
    return decodedUserInfo.userData.email;
  };

  useEffect(() => {
    const userEmail = getUserEmailFromLocalStorage();
    setUserInfo(userEmail); // Actualiza el estado con el email del usuario

    if (userEmail) {
      getChatDetails(`${userEmail}`);
    }
    //warning React Hook useEffect has a missing dependency: 'getChatDetails'. Either include it or remove the dependency array.
    // a pesar de que salga warning no nos interesa la dependencia del fetch
  }, [UserInfo]); // Este useEffect se ejecuta cuando UserInfo cambia

  useEffect(() => {
    if (UserInfo && chatDetails) {
      const filtered = chatDetails.map(chat => {
        // Para cada chat, determina si el usuario actual es user1 o user2
        const isUser1 = chat.user1_ID === UserInfo;
        // Selecciona los datos del otro usuario
        const otherUser = isUser1 ? chat.user2Details : chat.user1Details;
        // Devuelve un objeto con los datos del otro usuario y el índice del chat
        return { ...otherUser, chat_ID: chat.chat_ID, index: chat.index };
      });
      setFilteredChats(filtered);
    } else {
      setFilteredChats(null);
    }
  }, [chatDetails, UserInfo]); // Este useEffect se ejecuta cuando chatDetails o UserInfo cambian

  const handleSelectedChat = (id) => {
      console.log(`Seleccionado chat con ID: ${id}`);
      console.log("chatIds Data: "+ JSON.stringify(ChatIds));
      if (ChatIds.previous !== null && ChatIds.previous !== undefined) {
        // Si no es el primer chat, llama a switchChat(prevChat,nextChat)
        switchChat(ChatIds.current, id);
     }
      setSelectedChatId(id);
    }
  return (
    <aside className="bg-dark border-2 rounded-lg border-azul-600 text-foreground min-w-64 max-w-64 min-h-[calc(90vh-2.7rem)] p-4">
      <ResearchCustom/>
      {loading ? (
        <div className="flex gap-3 p-1 items-center min-w-full">
          <div>
            <Skeleton className="flex rounded-full w-10 h-10" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-5/6 rounded-lg" />
          </div>
        </div>
      ) : (
        <Listbox
          emptyContent
          classNames={{
            base: "max-w-xs",
            list: "max-h-[calc(90vh-5rem)] overflow-y-auto scroll-smooth",
          }}
          aria-label="Users to chat list"
          variant='undefined'
        >
          {filteredChats === null ? (
            <ListboxItem
              textValue={"no chats"}
            >
              <div className="p-4 text-center">0 chats encontrados</div>
            </ListboxItem>
          ) : (
            filteredChats.map((chat, index) => (
              <ListboxItem
                key={index}
                onClick={() => handleSelectedChat(chat.chat_ID)}
                textValue={`${chat.name}`}
                // hover:border hover:border-azulclaro-100
                className={chat.chat_ID === ChatIds.current ? 'bg-azulclaro text-negro' : 'hover:border-2 hover:border-azulclaro hover:text-azulclaro-500'}
              >
                <div className="flex gap-2 items-center ">
                  {chat.photo ? (
                    <Avatar alt={chat.name} className="flex-shrink-0" size="sm" src={chat.photo} />
                  ) : (
                    // .charAt(0).toUpperCase() + chat.name.slice(1)
                    <Avatar name={chat.name} />
                  )}
                  <div className="flex flex-col text-left">
                    <span className="font-normal">{chat.name}</span>
                    <span className={chat.chat_ID === ChatIds.current ?'text-tiny text-azulclaro-950' :'text-tiny text-default-400'}>{chat.email}</span>
                  </div>
                </div>
              </ListboxItem>
            ))
          )}
        </Listbox>
      )}
    </aside>
  );
}

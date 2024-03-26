import { useContext, useEffect, useState } from 'react';
import { Avatar, Listbox, ListboxItem } from '@nextui-org/react';
import {jwtDecode} from 'jwt-decode';

import GlobalStateContext from './GlobalStateContext';
import useGetChatDetails from '../../hooks/FetchChat';

export default function CustomAside() {
 const { setSelectedChatId } = useContext(GlobalStateContext);
 const { loading, chatDetails , getChatDetails } = useGetChatDetails(); // Utiliza el hook para obtener los datos de los chats
 const [filteredChats, setFilteredChats] = useState([]);
 const [UserInfo, setUserInfo] = useState(null); // Estado para almacenar el email del usuario actual

 //sacar email del localstorage
 const getUserEmailFromLocalStorage = () => {
  const userInfo = localStorage.getItem('chat-user');
  if (!userInfo) return null;
  
  const decodedUserInfo = jwtDecode(userInfo);
  return decodedUserInfo.userData.email;
  };
 


 useEffect(() => {
 const userEmail = getUserEmailFromLocalStorage();
 console.log("userEmail"+userEmail);
 setUserInfo(userEmail); // Actualiza el estado con el email del usuario

 if (userEmail) {
    getChatDetails(`${userEmail}`);
 }
 //warning React Hook useEffect has a missing dependency: 'getChatDetails'. Either include it or remove the dependency array.
 // a pesar de que salga warning no nos interesa la dependencia del fetch
 }, [UserInfo]); // Este useEffect se ejecuta cuando UserInfo cambia

 useEffect(() => {
 if (UserInfo && chatDetails.length > 0) {
    const filtered = chatDetails.map(chat => {
      // Para cada chat, determina si el usuario actual es user1 o user2
      const isUser1 = chat.user1_ID === UserInfo;
      // Selecciona los datos del otro usuario
      const otherUser = isUser1 ? chat.user2Details : chat.user1Details;
      // Devuelve un objeto con los datos del otro usuario y el índice del chat
      return { ...otherUser, chat_id: chat.chat_id, index: chat.index };
    });
    setFilteredChats(filtered);
 }

 }, [chatDetails, UserInfo]); // Este useEffect se ejecuta cuando chatDetails o UserInfo cambian

 if (loading) {
  return <div>Cargando...</div>; // Muestra un mensaje de carga mientras los datos se están obteniendo
}

 return (
    <aside className="bg-dark border-2 rounded-lg border-primary text-foreground w-64 p-4">
      <Listbox
        classNames={{
          base: "max-w-xs",
          list: "max-h-[calc(90vh-5rem)] overflow-y-auto scroll-smooth",
        }}
        aria-label="Users to chat list"
        color={'primary'}
        variant={'bordered'}
      >
        {filteredChats.map((chat, index) => {
          return (
            <ListboxItem key={index} onClick={() => {
              console.log(`Seleccionado chat con ID: ${chat.chat_id}`);
              setSelectedChatId(chat.chat_id); // Actualiza el estado en el contexto
            }} textValue={chat.name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={chat.name} className="flex-shrink-0" size="sm" src={chat.avatar} />
                <div className="flex flex-col text-left">
                 <span className="text-small">{chat.name}</span>
                 <span className="text-tiny text-default-400">{chat.email}</span>
                </div>
              </div>
            </ListboxItem>
          );
        })}
      </Listbox>
    </aside>
 );
}

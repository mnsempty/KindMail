import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GlobalStateContext from "./GlobalStateContext";
import { useContext } from "react";


export default function ResearchCustom(userEmail) {

  const { setSelectedChatId } = useContext(GlobalStateContext);

  const navigate = useNavigate();


  let list = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(`http://localhost:5000/api/users?search=${filterText}`, { signal });
      let data = await res.json();
      // console.log("data" + data);
      // filtramos los users para quitar el user "propio"
      const users = data.filter(user => user.email !== userEmail.userEmail);
      // console.log(users);
      return {
        items: users,
      };
    },
  });
  let openChat = (user2_ID, userEmail, item) => {
    // console.log(user2_ID + " uemail prop:" + userEmail + "item?" + JSON.stringify(item));
    axios.post('http://localhost:5000/api/chats/openChatOrEmail', {
      user1_ID: userEmail, // user "propio"
      user2_ID: user2_ID // user "destino"
    })
      .then(response => {
        // console.log("response", response);
        if (response.data) {
          // console.log(response.data);
          if (response.data.chatID) {
            // Si existe un chatID, seleccionamos el chat con el GlobalContext
            // console.log("response.data.chatID" + response.data.chatID);
            setSelectedChatId(response.data.chatID);
          } else if (response.data.firstEmail) {
            // Si se devuelve firstEmail: true, navegamos a /firstmessage guardamos en local sotrage los datos del user seleccionado
            let userString = JSON.stringify(item);
            localStorage.setItem("selectedUser", userString);
            navigate('/first-message');
          }
        }
      })
      .catch(error => {
        console.error("Error al abrir chat o email:", error);
      });
  };
  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label="Selecciona un usuario"
      placeholder="Type to search..."
      variant="bordered"
      onInputChange={list.setFilterText}
    >

      {(item) => (
        <AutocompleteItem
          key={item.email}
          textValue={item.name}
          onClick={() => openChat(item.email, userEmail.userEmail, item)}

        >
          <div className="flex gap-2 items-center " >

            {item.profilephoto ? (
              <Avatar alt={item.name} className="flex-shrink-0 bg-red-500" size="sm" src={item.profilePhoto} />
            ) : (
              <Avatar name={item.name} className="flex-shrink-0 bg-gray-400 text-negro dark:text-blanco" size="sm" />)}
            <div className="flex flex-col">
              <p className="text-small dark:text-negro">{item.name}</p>
              <p className="truncate text-tiny text-default-400 dark:text-negro">{item.email}</p>
            </div>

          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

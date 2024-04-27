import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import axios from 'axios';
export default function ResearchCustom(userEmail) {
  let list = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(`http://localhost:5000/api/users?search=${filterText}`, { signal });
      let data = await res.json();
      console.log("data" + data);
      // filtramos los users para quitar el user "propio"
      const users = data.filter(user => user.email !== userEmail.userEmail);
      console.log(users);
      return {
        items: users,
      };
    },
  });
  function openChat(user2_ID,userEmail) {
    console.log(user2_ID+"uemail"+userEmail);
    axios.post('http://localhost:5000/api/chats/openChatOrEmail', {
      user1_ID: userEmail, // user "propio"
      user2_ID: user2_ID // user "destino"
   })
   .then(response => {
      console.log(response.data);
   })
   .catch(error => {
      console.error('Error al abrir el chat o enviar el correo electrónico:', error);
   });
  }
  console.log("UserEmail"+JSON.stringify(userEmail))
  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label="Select a user"
      placeholder="Type to search..."
      variant="bordered"
      onInputChange={list.setFilterText}
    >

      {(item) => (
        <AutocompleteItem
          key={item.email}
          textValue={item.name}
          onClick={() => openChat(item.email,userEmail.userEmail)}
        >
          <div className="flex gap-2 items-center">
            {item.profilephoto ? (
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.profilePhoto} />
            ) : (
              <Avatar name={item.name} className="flex-shrink-0" size="sm" />)}
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="truncate text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

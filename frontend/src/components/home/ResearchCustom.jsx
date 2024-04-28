import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useNavigate } from 'react-router-dom';


export default function ResearchCustom(userEmail) {

  const navigate = useNavigate();


  let list = useAsyncList({
    async load({ signal, filterText }) {
      // Asegúrate de que la URL coincida con la que usas en Postman
      let res = await fetch(`http://localhost:5000/api/users?search=${filterText}`, { signal });
      let data = await res.json();
      console.log("data" + data);
      // dado un json lo pasamos a un array con objetos para utilizarlo en el return comodamente
      const users = data.filter(user => user.email !== userEmail);
      console.log(users);
      return {
        items: users,
      };
    },
  });

  function firstMessage(user) {
    console.log("Usuario seleccionado: ", user);

    let userString = JSON.stringify(user);

    

    if(existingChat){

    }else{

      localStorage.setItem("selectedUser", userString);
    console.log(localStorage.getItem('selectedUser'));

      navigate('/first-message');
    }

  }

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
        <AutocompleteItem key={item.email} textValue={item.name}>

          <div className="flex gap-2 items-center" onClick={() => firstMessage(item)}>
           
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

import { useContext } from 'react';
import { Avatar, Listbox, ListboxItem } from '@nextui-org/react';
import { users } from '../../fakeData/userData';
import GlobalStateContext from './GlobalStateContext'; // Asegúrate de ajustar la ruta de importación

export default function CustomAside() {
  const { setSelectedUserId } = useContext(GlobalStateContext);

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
        {users.map(user => (
          <ListboxItem key={user.id} onClick={() => {
            console.log(`Seleccionado usuario con ID: ${user.id}`);
            setSelectedUserId(user.id); // Actualiza el estado en el contexto
          }} textValue={user.name}>
            <div className="flex gap-2 items-center">
              <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
              <div className="flex flex-col text-left">
                <span className="text-small">{user.name}</span>
                <span className="text-tiny text-default-400">{user.email}</span>
              </div>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </aside>
  );
}


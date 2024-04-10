import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import axios from 'axios';
import { useState } from 'react';

export default function ResearchCustom() {
  const [filterText, setFilterText] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = async (filterText) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://swapi.py4e.com/api/people/?search=${filterText}`);
      setItems(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value) => {
    setFilterText(value);
    load(value);
  };

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={filterText}
      isLoading={isLoading}
      items={items}
      label="Select a character"
      placeholder="Type to search..."
      variant="bordered"
      onInputChange={handleInputChange}
    >
      {/* 
            {(user) => (
        <AutocompleteItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </AutocompleteItem>
      )}
      */}
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

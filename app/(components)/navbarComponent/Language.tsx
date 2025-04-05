"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
function Language() {
  const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
  ];
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <ListboxButton className="flex-1 p-2 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-800">{selectedPerson.name}</ListboxButton>
          <ListboxOptions anchor="bottom">
            {people.map((person) => (
              <ListboxOption
                key={person.id}
                value={person}
                className="font-medium data-[focus]:bg-blue-100"
              >
                {person.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
  );
}

export default Language;

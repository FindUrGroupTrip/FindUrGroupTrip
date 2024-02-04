import React, { useState, useEffect } from 'react';

const AdresseAutoComplete = ({ register, setValue, errors }) => {
  const [adresses, setAdresses] = useState([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (adresses.length === 1) {
      setValue('lieu', adresses[0].properties.label);
      setIsOpen(false);
    }
  }, [adresses, setValue]);

  const rechercherAdresse = async (e) => {
    register('lieu', { required: 'Ce champ est requis' });
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(e.target.value)}&autocomplete=1`);
        const data = await reponse.json();
        setAdresses(data.features);
        setIsOpen(true);
      } catch (e) {
        alert('error')
      }
    } else {
      setAdresses([]);
      setIsOpen(false);
    }
  };

  const selectionnerAdresse = (adresse) => {
    setValue('lieu', adresse.properties.label);
    setIsOpen(false);
    setQuery(adresse.properties.label)
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={rechercherAdresse}
        value={query}
        className="form-input mt-1 block w-full"
        placeholder="Commencez à taper une adresse..."
      />

      {isOpen && adresses.length > 0 && (
        <ul
          className="absolute z-10 w-full list-none mt-2 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded">
          {adresses.map((adresse, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => selectionnerAdresse(adresse)}
            >
              {adresse.properties.label}
            </li>
          ))}
        </ul>
      )}
      {errors.lieu && (
        <p className="text-red-500 text-xs italic">{errors.lieu.message}</p>
      )}
    </div>
  );
};

export default AdresseAutoComplete;

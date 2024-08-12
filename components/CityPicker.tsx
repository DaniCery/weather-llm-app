"use client";

import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";
import { GlobeIcon } from '@heroicons/react/solid';

type Option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  },
  label: string;
};

type CityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  },
  label: string;
};

const countryOptions: Option[] = Country.getAllCountries().map(country => ({
  value: {
    latitude: country.latitude!,
    longitude: country.longitude!,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: Option | null) => {
    setSelectedCountry(option);
    setSelectedCity(null); // Reset city selection when country changes
  };

  const handleSelectedCity = (option: CityOption | null) => {
    if (option) {
      setSelectedCity(option);
      router.push(
        `/location/${option.value.name}/${option.value.latitude}/${option.value.longitude}`
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          id="country"
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={countryOptions}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">City</label>
          </div>
          <Select
            id="city"
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={
              City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(
                (city) => ({
                  value: {
                    latitude: city.latitude!,
                    longitude: city.longitude!,
                    countryCode: city.countryCode,
                    name: city.name,
                    stateCode: city.stateCode,
                  },
                  label: city.name,
                })
              ) || []
            }
          />
        </div>
      )}
    </div>
  );
}

export default CityPicker;

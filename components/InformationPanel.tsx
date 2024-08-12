import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";
import weatherCodeToString from "@/lib/weatherCodeToString";
import moment from "moment-timezone";

type Props = {
    city: string;
    results: Root;
    lat: string;
    long: string;
};

function InformationPanel({city, lat, long, results}: Props) {
    // Ensure timezone is included in results
    const timezone = results.timezone || 'UTC';  // Default to 'UTC' if timezone is not available

    return (
        <div className="bg-gradient-to-br from-[#394F68] to-[#18387E] text-white p-10">
            <div className="pb-5">
                <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
                <p className="text-xs text-gray-400">
                    Long/Lat: {long}, {lat}
                </p>
            </div>

            <CityPicker />

            <hr className="my-10" />

            <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
                <div>
                    <p className="text-xl">
                        {moment().tz(timezone).format('dddd D MMMM YYYY')}
                    </p>

                    <p className="font-extralight">
                        Timezone: {timezone} 
                    </p>
                </div>

                <p className="text-xl font-bold uppercase">
                    {moment().tz(timezone).format('h:mm a')}
                </p>
            </div>

            <hr className="mt-10 mb-5"/>
            <div>
                <div className="flex item-center justify-between">
                    <Image
                        src={`https://www.weatherbit.io/static/img/icons/${
                            weatherCodeToString[results.current.weather_code].icon
                        }.png`}
                        alt={weatherCodeToString[results.current.weather_code].label}
                        width={75}
                        height={75}
                    />

                    <div className="flex items-center justify-between space-x-10">
                        <p className="text-6xl font-semibold">
                            {results.current.temperature_2m.toFixed(1)}°C
                        </p>
                        <p className="text-right font-extralight text-lg">
                            {weatherCodeToString[results.current.weather_code].label}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-2 py-5">
                <div className="flex items-center space-x-2 px-4 py-3 border
                border-[#6F90CD] rounded-md bg-[#405885]">
                    <SunIcon className="h-10 w-10 text-gray-400"/>

                    <div className="flex-1 flex justify-between items-center">
                        <p className="font-extralight">Sunrise</p>
                        <p className="text-xl font-bold uppercase">
                            {moment.tz(results.daily.sunrise[0], timezone).format('h:mm a')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 px-4 py-3 border
                border-[#6F90CD] rounded-md bg-[#405885]">
                    <MoonIcon className="h-10 w-10 text-gray-400"/>

                    <div className="flex-1 flex justify-between items-center">
                        <p className="font-extralight">Sunset</p>
                        <p className="text-xl font-bold uppercase">
                            {moment.tz(results.daily.sunset[0], timezone).format('h:mm a')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformationPanel;

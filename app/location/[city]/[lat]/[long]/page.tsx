import CalloutCard from '@/components/CalloutCard';
import HumidityChart from '@/components/HumidityChart';
import InformationPanel from '@/components/InformationPanel';
import RainChart from '@/components/RainChart';
import StatCard from '@/components/StatCard';
import TempChart from '@/components/TempChart';
import cleanData from '@/lib/cleanData';
import getBasePath from '@/lib/getBasePath';

export const revalidate = 60;

type Props = {
    params: {
        city: string;
        lat: string;
        long: string;
    }
}

import { getWeatherData } from '@/rest-client';


async function WeatherPage({ params: { city, lat, long } }: Props) {
    try {
        const results = await getWeatherData(long, lat, 'auto');

        console.log("RESULTS: ", results)

        const dataToSend = cleanData(results, city);

        const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, { 
            method: "POST",
            headers : { 
                "Content-Type": "application/json",
             },
            body: JSON.stringify({
                weatherData: dataToSend
            })
         })

        const GPTdata = await res.json();
        const { content } = GPTdata;

        return (
            <div className='flex flex-col min-h-screen md:flex-row'>
                <InformationPanel 
                    city={city} 
                    lat={lat} 
                    long={long} 
                    results={results} />    

                <div className='flex-1 p-5 lg:p-10'>
                    <div className='p-5'>
                        <div className='pb-5'>
                            <h2 className='text-xl font-bold'>Today&apos;s overview</h2>
                            <p className='text-sm text-gray-400'>
                                Last updated at: { " " }
                                {new Date(results.current.time).toLocaleString()} { " " }
                                {results.timezone}
                            </p>
                        </div>

                    <div className='m-2 mb-10'>
                        <CalloutCard message={content} />   
                    </div>    

                    <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 m-2'>
                        <StatCard 
                            title="Maximum Temperature"
                            metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
                            color="yellow"
                        />

                        <StatCard 
                            title="Minimum Temperature"
                            metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
                            color="green"
                        />

                    <div>
                        <StatCard 
                                title="UV Index"
                                metric={`${results.daily.uv_index_max[0].toFixed(1)}°`}
                                color="rose"
                            />
                        {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                            <CalloutCard 
                                    message={"The UV is high today, be sure to wear SP!"}  
                                    warning
                                />
                            )}                      
                    </div>
                    <div className='flex space-x-3'>
                        <StatCard 
                                title="Wind Speed"
                                metric={`${results.current.wind_speed_10m.toFixed(1)}m/s`}
                                color="cyan"
                            />

                        <StatCard 
                                title="Wind Direction"
                                metric={`${results.current.wind_direction_10m.toFixed(1)}°`}
                                color="violet"
                            />
                       </div>
                      </div>
                    </div>

                    <hr className='mb-5'/>

                    <div className='space-y-3'>
                        <TempChart results={results} />
                        <RainChart results={results} />
                        <HumidityChart results={results} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error details:", error);
        return <div>Error fetching weather data</div>;
    }
}


export default WeatherPage;
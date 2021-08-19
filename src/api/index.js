import axios from 'axios' 


export const getPlacesData = async (type, sw, ne) => {
    try {
          const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              tr_latitude: ne.lat,
            },
            headers: {
              'x-rapidapi-key': 'dc901dbc7emsh8239ec6164aa79fp1be912jsn8f7ef4054f5a',
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            },
          });
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getWeatherdata = async (lat, lng) => {
  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      params: {
        lon: lng,
        lat: lat
      },
      headers: {
        'x-rapidapi-key': 'dc901dbc7emsh8239ec6164aa79fp1be912jsn8f7ef4054f5a',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    })

    return data

  } catch (error) {
    console.log(error)
  }
}
import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw, ne) => {
    try {
        const { data: {data} } = await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'x-rapidapi-key': 'dc901dbc7emsh8239ec6164aa79fp1be912jsn8f7ef4054f5a',
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          })
        return data
    } catch (error) {
        console.log(error)
    }
}
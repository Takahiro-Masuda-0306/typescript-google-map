import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyAuQXaw6A9tez96id7DLveCt62N13_doWU';

type GoogleGeocodingResponse = {
  results: 
    {geometry: 
      {location: 
        {lat: number, lng: number}
      }
    }[];
  status: "OK" | "ZERO_RESULTS";
}

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
  .then(response => {
    if(response.data.status !== "OK") {
      throw new Error('座標を取得できませんでした。');
    }
    const coordinates = response.data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById('map')!, {
      center: coordinates,
      zoom: 16,
    });
    new google.maps.Marker({ position: coordinates, map: map })

  }).catch(e => {
    alert(e.message)
    console.log(e)
  })
} 

form.addEventListener('submit', searchAddressHandler)

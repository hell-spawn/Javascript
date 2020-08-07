import axios from 'axios';

const addressField = document.getElementById('address')! as HTMLInputElement;
const form = document.querySelector('form')!;

const GOOGLE_API = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';


type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchHandler(event: Event) {
    event.preventDefault();
    const address = addressField.value;

    axios
    .get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API}`
    )
    .then( response => { 
        console.log(response);
        if (response.data.status !== "OK") {
            throw new Error("Could not fetch location!");
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16
        }); 

        new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(err => {
        alert(err.message);
        console.log(err);
    });

}


form.addEventListener('submit', searchHandler);

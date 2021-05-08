import React, { Component } from 'react';

export type WeatherState = {
    temp: number,
    // weather: {
    //     main: string
    // };
}

class Location extends React.Component<{}, WeatherState> {
    constructor(props: any ) {
        super(props)
        this.state= {
            temp: 0,
            // weather: {
            //     main: ""
            // },

        }
    }

    handleChange(event: any) {
        window.location.reload();
    };

    componentDidMount() {
        const key: string= "d01ff30cf4f59b6612021fe9a2d405b9"
        
        navigator.geolocation.getCurrentPosition((position) => {
            let lat: number= position.coords.latitude;
            let lon: number= position.coords.longitude;
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={part}&appid=${key}`)
            .then(res => res.json())
            .then((data: {current: {temp: number}}) => {
                console.log(data)
                this.setState({
                    temp: data.current.temp,
                    // weather: data.current.weather.main
                })
            })
            .catch(console.log)
            // console.log(this.state.weather);
        }
        );
      }
    

render(){
    return(
        <div>
            <h1>Current Temperature for your location: {`${this.state.temp} F°`}</h1>
        </div>
    )
}
}

export default Location;

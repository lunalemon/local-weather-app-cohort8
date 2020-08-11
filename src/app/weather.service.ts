import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurrentWeatherData} from './icurrent-weather-data';
import { environment } from 'src/environments/environment';
import { ICurrentWeather } from './icurrent-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather (city: string, country: string){ 
    return this.httpClient.get<ICurrentWeatherData>(`http://api.openweathermap.org/data/2.5/weather?q=${city}${country}&appid=${environment.appId}`)
  }

  transformToICurrentWeather(data:ICurrentWeatherData):ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      temperature: data.main.temp,
      image: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      date: new Date(data.dt * 1000)
    }
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Planet} from '../model/planet';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlanetsService {
    api = '/api/planets/';

    constructor(private http: HttpClient) {
    }

    getPlanets(params): Observable<Planet[]> {
        return this.http.get<Planet[]>(this.api).pipe(
            map(planets => Object.keys(params).length >= 1 ? planets.filter(planet =>
                planet.planetName.toLowerCase().includes(params.search.toLowerCase())) : planets)
        );

    }

    getPlanet(id: string): Observable<Planet> {
        return this.http.get<Planet>(this.api + id);
    }

    editPlanet(id: number, payload): Observable<any> {
        return this.http.put(this.api + id, payload);
    }

    createPlanet(payload): Observable<Planet> {
        return this.http.post<Planet>(this.api, payload);
    }

    deletePlanet(id: number): Observable<any> {
        return this.http.delete(this.api + id);
    }


}

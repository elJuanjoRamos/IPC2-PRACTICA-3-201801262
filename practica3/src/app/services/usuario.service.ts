import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class UsuarioService {
    URI = 'http://localhost:3000/api/';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('id')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/usuario`).pipe(map(user => {
                return user;
            }));
    }
    getUsuario(id: any) {
        return this.http.get<any>(`${this.URI}/usuario/${id}`).pipe(map(user => {
                return user;
            }));
    }
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/usuario/${id}`, { headers }).pipe(map(user => {
            return user;
        }));
    }
    post(usuario:any) {
        let data = JSON.stringify(usuario);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/usuario/`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
    put(usuario:any, id:any) {
        let data = JSON.stringify(usuario);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/usuario/${id}`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable( /*{ providedIn: 'root' }*/)
export class AuthenticationService {

    URI = 'http://localhost:3000/api/ws/db';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }


    login(usuario: any) {
        let uriUsuario: string = 'http://localhost:3000/api/auth/';
        let head = new HttpHeaders();
        head.append('Content-Type', 'application/json');

        var data = {
            username: usuario.username,
            password: usuario.password
        };
        console.log(data);
        this.http.post(uriUsuario, data, { headers: head })
            .subscribe(user => {
                console.log(user[0]);
                let res = {
                    'results': JSON.stringify(user[0]),
                    'json': () => { return user[0]; }
                };

                let rol = JSON.parse(JSON.stringify(res.json())).rol;
                //if (token) {
                localStorage.setItem('id', JSON.parse(JSON.stringify(res.json())).idUsuario);

                if (rol === "Administrador") {
                    console.log("entro");
                    this.router.navigate(['/admin-home']);
                } else if (rol === 2) {
                    this.router.navigate(['/home/dashboard/aux/auxiliar']);
                } else if (rol === 3) {
                    this.router.navigate(['/home/dashboard/est/estudiante']);
                }
                /*} else {
                    console.log("No existen token");
                    return false;
                }*/
            }, error => {
                console.log(error.text());
            });

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResposeData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }


    signup(email: string, password: string) {
        return this.http.post<AuthResposeData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiAvefFkCgdxZzD1_wJ9AbqBSqkffdXOU',
            { email: email, password: password, returnSecureToken: true }
        ).pipe(catchError(errorRes => {
            let errorMsg = 'An unknown error occured!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMsg);
            }

            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMsg = 'This email exists already';
            }
            return throwError(errorMsg);
        }));
    }

    login(email: string, password: string) {

    }
}
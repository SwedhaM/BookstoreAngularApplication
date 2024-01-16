import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
constructor(private http: HttpClient) { }
    log(message: string) {
      console.log(message); // Log to the console (optional)
      this.http.post<any>('http://localhost:3000/logs', { message }).subscribe();
    }

    error(message: string) {
      console.error(message);
      this.http.post<any>('http://localhost:3000/logs', { message }).subscribe();
    }


}

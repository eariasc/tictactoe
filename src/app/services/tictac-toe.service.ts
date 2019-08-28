import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Question } from '../models/question';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TictacToeService {
  
  data: Array<any>;
  constructor(private http:HttpClient) { }

  getAllQuestions():Observable<any> {
    return this.http.get('./assets/data.json');
  }
}

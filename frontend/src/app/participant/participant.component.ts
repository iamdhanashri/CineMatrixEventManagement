// services/participant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../../../../backend/model/participant.model.js';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = '/api/participants';

  constructor(private http: HttpClient) {}

  getAllParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl);
  }

  getParticipantById(participantId: string): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}/${participantId}`);
  }

  createParticipant(participantData: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.apiUrl, participantData);
  }

  updateParticipant(participantId: string, participantData: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiUrl}/${participantId}`, participantData);
  }

  deleteParticipant(participantId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${participantId}`);
  }
}

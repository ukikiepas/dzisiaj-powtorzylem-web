import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ChatResponse} from "../models/models.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8080/api/v1/auth/chat';

  constructor(private http: HttpClient) { }

  private isChatOpen = false;
  public onChatToggle = new EventEmitter<boolean>();

  public toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    this.onChatToggle.emit(this.isChatOpen);
  }

  sendMessage(prompt: string): Observable<ChatResponse> {
    return this.http.post<any>(`${this.baseUrl}`, {prompt} );
  }
}

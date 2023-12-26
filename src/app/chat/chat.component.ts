import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "./service/chat.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Choice} from "./models/models.interface";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  messages: any[] = [];
  newMessage: string = '';
  isLoading = false;
  isChatOpen = false;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;


  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  loadMessages(): void {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  }

  getAvatarUrl(sender: string): string {
    return sender === 'user' ? 'assets/login/loginStudentLogo.jpg' : 'assets/robot2.png';
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, sender: 'user' });
      this.updateLocalStorage();

      this.isLoading = true;
      this.chatService.sendMessage(this.newMessage).subscribe(response => {
        if (response.choices && response.choices.length > 0) {
          response.choices.forEach((choice: Choice) => {
            this.messages.push({ text: choice.message.content, sender: 'server' });
            this.isLoading = false;
            this.scrollToBottom();
          });
        }
        this.updateLocalStorage();
      }, error => {
        console.log(error);
        this.isLoading = false;
      });



      this.newMessage = '';
    }
  }

  updateLocalStorage(): void {
    localStorage.setItem('chatHistory', JSON.stringify(this.messages));
  }

  clearHistory(): void {
    localStorage.removeItem('chatHistory');
    this.messages = [];
  }


}

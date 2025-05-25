import { Component } from '@angular/core';
import { io } from 'socket.io-client';

interface Translation {
  text: string;
  languageCode: string;
  languageName: string;
  translatedText: string;
}

@Component({
  selector: 'app-language-bot',
  templateUrl: './language-bot.component.html',
  styleUrls: ['./language-bot.component.css']
})
export class LanguageBotComponent {
  text = "";
  language = {
    code: '',
    name: ''
  };
  translatedText = "";
  translation: Translation[] = [];

  socket: any;
  constructor() {
    this.socket = io("http://localhost:8080");
  }

  ngOnInit() {
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on("onTranslate", (data: Translation) => {
      if (data.text && data.languageName){
        this.translation.push(data);
      }
    });
  }
  sendText(){
    let obj = {
      text: this.text,
      languageCode: this.language.code,
      languageName: this.language.name,
      translatedText: this.translatedText
    }

    this.socket.emit("translate", obj);
  }
}

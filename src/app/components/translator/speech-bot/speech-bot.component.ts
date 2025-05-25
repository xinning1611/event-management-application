import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-speech-bot',
  templateUrl: './speech-bot.component.html',
  styleUrls: ['./speech-bot.component.css']
})
export class SpeechBotComponent {
  text = ""; 
  convertSuccessful: boolean = false;
  audioUrl: string = '';
  audioCounter: number = 0;

  socket: any;

  constructor() {
    this.socket = io("http://localhost:8080");
  }

  ngOnInit() {
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on("onTextToSpeech", (data: any) => {
      this.convertSuccessful = true;
    })
  }

  sendText() {
    this.convertSuccessful = false; 
    let obj = {
      text: this.text
    }
    this.socket.emit("textToSpeech", obj);
    this.audioUrl = 'output' + this.audioCounter + '.mp3';
    console.log(this.audioUrl);
    this.audioCounter ++;
  }

}

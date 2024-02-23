import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chantmachine' 
  count = 0;
  previousCount = 0;
  nextCount = 0;
  isChanting = false;
  @ViewChild('audioPlayer') audioPlayer: any;
  chantInterval !: NodeJS.Timeout;

  incrementCount() {
    this.count++;
    this.updatePreviousAndNextCounts();
  }

  decrementCount() {
    if (this.count > 0) {
      this.count--;
      this.updatePreviousAndNextCounts();
    }
  }

  startChanting() {
    this.isChanting = true;
    this.audioPlayer.nativeElement.play();
  
    this.chantInterval = setInterval(() => {
      this.incrementCount();
    }, 2000);
  }
  stopChanting() {
    this.isChanting = false;
    clearInterval(this.chantInterval);
    this.audioPlayer.nativeElement.pause();
    this.audioPlayer.nativeElement.currentTime = 0;
  }

  playAudio() {
    this.audioPlayer.nativeElement.play();
  }

  updatePreviousAndNextCounts() {
    this.previousCount = this.count - 1;
    this.nextCount = this.count + 1;
  }

}

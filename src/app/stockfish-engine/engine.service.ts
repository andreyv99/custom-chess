import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class EngineService {
  engineWorker: Worker;
  moves: string[] = [];
  moveByEngine = new Subject<string>();

  startEngine() {
    this.engineWorker = new Worker("stockfish", {
      type: "module",
    });

    this.engineWorker.onmessage = (message) => {
      this.operateReceivedMessage(message.data);
    };
    this.startGame();
  }

  private sendMessage(message: string): void {
    this.engineWorker.postMessage(message);
  }

  operateReceivedMessage(message: string): void {
    if (message.includes("bestmove")) {
      const move = message.substring(9, 13);
      this.moves.push(move);
      this.moveByEngine.next(move);
    }
  }

  startGame() {
    setTimeout(() => {
      this.sendMessage("uci");
    }, 1000);

    setTimeout(() => {
      this.sendMessage("ucinewgame");
    }, 1000);
  }

  moveByUser(move: string): any {
    this.moves.push(move);
    this.sendMessage("position startpos moves " + this.moves.join(" "));
    this.sendMessage("go");
    console.log("position startpos moves " + this.moves.join(" "));
  }
}

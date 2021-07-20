import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { BoardService } from './board.service';

@Injectable({
  providedIn: "root",
})
export class EngineService {
  engineWorker: Worker;
  moves: string[] = [];
  moveByEngineSubject = new Subject<string>();
  moveByEngine$ = this.moveByEngineSubject.asObservable();

  constructor(private boardService: BoardService) {}

  startEngine() {
    this.engineWorker = new Worker("stockfish", {
      type: "module",
    });

    this.engineWorker.onmessage = (message) => {
      this.operateReceivedMessage(message.data);
    };
    this.startGame();
  }

  refreshGame() {
    this.startGame();
    this.moves = [];
  }

  private sendMessage(message: string): void {
    this.engineWorker.postMessage(message);
  }

  operateReceivedMessage(message: string): void {
    if (message.includes("bestmove")) {
      const move = message.substring(9, 13);
      this.moves.push(move);
      this.boardService.makeMoveByEngine(move);
      // this.moveByEngineSubject.next(move);
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
    this.sendMessage("go depth 12");
  }
}

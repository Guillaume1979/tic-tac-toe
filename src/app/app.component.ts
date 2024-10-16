import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Joue au morpion</h1>
    <h2>Au tour du joueur {{ activePlayer }}</h2>
    <div class="line">
      <button class="cell" (click)="play(0,0)">{{ displaySymbolByPlayer(grid[0][0]) }}</button>
      <button class="cell" (click)="play(0,1)">{{ displaySymbolByPlayer(grid[0][1]) }}</button>
      <button class="cell" (click)="play(0,2)">{{ displaySymbolByPlayer(grid[0][2]) }}</button>
    </div>
    <div class="line">
      <button class="cell" (click)="play(1,0)">{{ displaySymbolByPlayer(grid[1][0]) }}</button>
      <button class="cell" (click)="play(1,1)">{{ displaySymbolByPlayer(grid[1][1]) }}</button>
      <button class="cell" (click)="play(1,2)">{{ displaySymbolByPlayer(grid[1][2]) }}</button>
    </div>
    <div class="line">
      <button class="cell" (click)="play(2,0)">{{ displaySymbolByPlayer(grid[2][0]) }}</button>
      <button class="cell" (click)="play(2,1)">{{ displaySymbolByPlayer(grid[2][1]) }}</button>
      <button class="cell" (click)="play(2,2)">{{ displaySymbolByPlayer(grid[2][2]) }}</button>
    </div>
    @if (hasError) {
      <p class="forbidden">Coup interdit !</p>
    }
    @if (winner) {
      <p class="winner">Le joueur {{ winner }} a gagné !!!</p>
      <button class="new" (click)="startNewGame()"><span>Nouvelle partie</span></button>
    }

  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .line {
      display: flex;
    }

    button:not(.new) {
      width: 50px;
      height: 50px;
    }

    button.new {
      padding: 20px;
      background: bisque;
      border: none;
      border-radius: 5px;
      box-shadow: 2px 2px 5px 1px dimgrey;
    }

    .forbidden {
      color: red;
      font-size: 2rem;
      font-weight: bold;
    }

    .winner {
      color: green;
      font-size: 5rem;
      font-weight: bold;
    }
  `],
})
export class AppComponent {
  title = 'tic-tac-toe';
  activePlayer = 1;
  grid: number [][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  hasError = false
  winner = 0;

  play(x: number, y: number) {
    if (this.winner) return;
    const player = this.activePlayer;
    if (this.grid[x][y] !== 0) {
      this.displayError();
      return;
    }
    this.grid[x][y] = player;
    const winner = this.checkWin();
    if (winner) {
      this.hasWon(winner);
      return;
    }
    this.activePlayer = this.activePlayer === 1 ? 2 : 1;
  }

  startNewGame() {
    this.winner = 0;
    this.activePlayer = 1;
    this.grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  }

  displaySymbolByPlayer(player: number) {
    return player === 0 ? '' : player === 1 ? 'X' : 'O';
  }

  private displayError() {
    this.hasError = true;
    setTimeout(() => {
      this.hasError = false;
    }, 1000);
  }

  private checkWin() {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.grid[a[0]][a[1]] !== 0 &&
        this.grid[a[0]][a[1]] === this.grid[b[0]][b[1]] &&
        this.grid[a[0]][a[1]] === this.grid[c[0]][c[1]]) {
        return this.grid[a[0]][a[1]];
      }
    }

    return 0;
  }

  private hasWon(player: number) {
    this.winner = player;
  }
}

//todo ajouter un restart au cours d'une partie et une fin quand personne ne gagne

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: string[] = [];

  constructor() { }

  getWatchlist(): string[] {
    return this.watchlist;
  }

  addToWatchlist(imdbID: string): void {
    if (!this.watchlist.includes(imdbID)) {
      this.watchlist.push(imdbID);
    }
  }

  removeFromWatchlist(imdbID: string): void {
    const index = this.watchlist.indexOf(imdbID);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
    }
  }
  isInWatchlist(imdbID: string): boolean {
    return this.watchlist.includes(imdbID);
  }
}

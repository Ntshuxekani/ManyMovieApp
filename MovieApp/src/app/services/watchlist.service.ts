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
    this.watchlist = this.watchlist.filter(id => id !== imdbID);
  }

  isInWatchlist(imdbID: string): boolean {
    return this.watchlist.includes(imdbID);
  }
}

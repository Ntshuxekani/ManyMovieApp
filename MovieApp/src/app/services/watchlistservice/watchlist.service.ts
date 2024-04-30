import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlists: { [email: string]: string[] } = {};

  constructor() { }

  // getWatchlist(email: string): string[] {
  //   if (!this.watchlists[email]) {
  //     this.watchlists[email] = [];
  //   }
  //   return this.watchlists[email];
  // }
  getWatchlist(email: string): string[] {
    if (!this.watchlists[email]) {
      this.watchlists[email] = [];
    }
    return this.watchlists[email];
  }
  

  addToWatchlist(email: string, imdbID: string): void {
    if (!this.watchlists[email]) {
      this.watchlists[email] = [];
    }
    if (!this.watchlists[email].includes(imdbID)) {
      this.watchlists[email].push(imdbID);
    }
  }

  removeFromWatchlist(email: string, imdbID: string): void {
    if (!this.watchlists[email]) {
      return;
    }
    this.watchlists[email] = this.watchlists[email].filter(id => id !== imdbID);
  }

  isInWatchlist(email: string, imdbID: string): boolean {
    return this.watchlists[email] && this.watchlists[email].includes(imdbID);
  }
}

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private watchlist: any[] = [];

  constructor() { }

  async fetchMoviesFromIMDb(searchQuery: string): Promise<any[]> {
    const response = await axios.get(`https://imdb-api.com/en/API/SearchMovie/7a4c1a70f94352c41f7fa71c363a37e8/${searchQuery}`);
    return response.data.results;
  }

  getWatchlist(): any[] {
    return this.watchlist;
  }

  addToWatchlist(movie: any): void {
    this.watchlist.push(movie);
  }

  removeFromWatchlist(movie: any): void {
    const index = this.watchlist.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
    }
  }

  sortWatchlistByTitle(): void {
    this.watchlist.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortWatchlistByRating(): void {
    this.watchlist.sort((a, b) => b.imDbRating - a.imDbRating);
  }
}

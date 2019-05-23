import { Component, OnInit } from '@angular/core';
import { YouTubeSearchResult } from './youtube-search-result';

@Component({
  selector: 'app-youtube-search',
  template: `
    <app-youtube-search-box 
      (loading)="loading = $event" 
      (results)="updateResults($event)">
    </app-youtube-search-box>

    <p *ngIf="loading">Keep calm, loading...</p>

    <div class="results">
      <app-youtube-search-result 
        *ngFor="let r of results" 
        [result]="r">
      </app-youtube-search-result>
    </div>`
})
export class YouTubeSearchComponent implements OnInit {
  results: YouTubeSearchResult[];
  loading: boolean;

  constructor() { }
  ngOnInit() { }

  updateResults(results: YouTubeSearchResult[]): void {
    this.results = results;
  }
}
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { YouTubeSearchResult } from './youtube-search-result';

@Component({
  selector: 'app-youtube-search-result',
  styleUrls: ['./youtube-search-result.component.css'],
  template: `
    <img src="{{ result.thumbnailUrl }}"/>
    <div class="caption">
      <h3>{{ result.title }}</h3>
      <p>{{ result.description }}</p>
      <a target="_blank" class="button button-outline" href="{{ result.videoUrl }}">Watch</a>
    </div>
  `
})
export class YouTubeSearchResultComponent implements OnInit {
  @Input() result: YouTubeSearchResult;
  @HostBinding('attr.class') cssClass = 'thumbnail';

  constructor() { }
  ngOnInit() { }
}
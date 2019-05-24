import { 
    Component, 
    OnInit,
    Output,
    EventEmitter,
    ElementRef
  } 
  from '@angular/core';
  
  import { YouTubeSearchResult } from './youtube-search-result';
  import { YouTubeSearchService } from './youtube-search.service';
  
  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/fromEvent';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/filter';
  import 'rxjs/add/operator/debounceTime';
  import 'rxjs/add/operator/do';
  import 'rxjs/add/operator/switch';
  
  @Component({
    'selector': 'app-youtube-search-box',
    'template': `
      <input type="text" placeholder="Try typing 'cats'" autofocus>
    `
  })
  
  export class YouTubeSearchBoxComponent implements OnInit {
    @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() results: EventEmitter<YouTubeSearchResult[]> = new EventEmitter<YouTubeSearchResult[]>();
  
    constructor(
      private youtube: YouTubeSearchService,
      private el: ElementRef
    ) {}
  
    ngOnInit():void {
      // convert the `keyup` event into an observable stream
      Observable.fromEvent(this.el.nativeElement, 'keyup')
        // extract the value of input
        .map((e: any) => e.target.value)
        // filter out if empty
        .filter((text: string) => text.length > 1)
        // discard events that take less than 250ms
        .debounceTime(250)
        // enable loading
        .do(() => this.loading.emit(true))
        // search
        .map((query: string) => this.youtube.search(query))
        // discarding old events if new input comes in
        .switch()
        // acts on returned search results
        .subscribe(
          // on success
          (results: YouTubeSearchResult[]) => {
            this.loading.emit(false);
            this.results.emit(results);
          },
          // on error
          (err: any) => {
            console.log(err);
            this.loading.emit(false);
          },
          // on completion
          () => {
            this.loading.emit(false);
          }
        );
    }
  }
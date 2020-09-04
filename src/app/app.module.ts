import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MinPipe} from './min.pipe';
import {RangePipe} from './range.pipe';
import {PathPipe} from './path.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MinPipe,
    PathPipe,
    RangePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FeedComponent } from "./feed/feed.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { NewPostComponent } from "./new-post/new-post.component";

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    NavbarComponent,
    NewPostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

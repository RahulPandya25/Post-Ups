import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  public tagClickOnPostComponent: EventEmitter<String>;
  clicktag(tag): void {
    this.tagClickOnPostComponent.emit(tag);
  }

  public updateFeedComponent: EventEmitter<null>;
  updateFeed(): void {
    this.updateFeedComponent.emit();
  }

  constructor() {
    this.tagClickOnPostComponent = new EventEmitter();
    this.updateFeedComponent = new EventEmitter();
  }
}

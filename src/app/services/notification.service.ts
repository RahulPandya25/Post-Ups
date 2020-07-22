import { Injectable, EventEmitter } from "@angular/core";
import defaults from "../../assets/defaults.json";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  public clicktagEmitter: EventEmitter<String>;
  clicktag(tag): void {
    this.clicktagEmitter.emit(tag);
  }

  public updateFeedEmitter: EventEmitter<null>;
  updateFeed(): void {
    this.updateFeedEmitter.emit();
  }

  currentShowSecondaryNavBar = defaults.defaultShowSecondaryNavBar;
  currentShowBackBtn = defaults.defaultShowBackBtn;
  currentShowSearchBtn = defaults.defaultShowSearchBtn;

  toogleShowSecondaryNavBar: EventEmitter<null>;
  toogleShowBackBtn: EventEmitter<null>;
  toogleShowSearchBtn: EventEmitter<null>;
  updateNavComponents(data) {
    if (data.showSecondaryNavBar !== this.currentShowSecondaryNavBar) {
      this.currentShowSecondaryNavBar = data.showSecondaryNavBar;
      this.toogleShowSecondaryNavBar.emit();
    }
    if (data.showBackBtn !== this.currentShowBackBtn) {
      this.currentShowBackBtn = data.showBackBtn;
      this.toogleShowBackBtn.emit();
    }
    if (data.showSearchBtn !== this.currentShowSearchBtn) {
      this.currentShowSearchBtn = data.showSearchBtn;
      this.toogleShowSearchBtn.emit();
    }
  }

  constructor() {
    this.clicktagEmitter = new EventEmitter();
    this.updateFeedEmitter = new EventEmitter();
    this.toogleShowSecondaryNavBar = new EventEmitter();
    this.toogleShowBackBtn = new EventEmitter();
    this.toogleShowSearchBtn = new EventEmitter();
  }
}

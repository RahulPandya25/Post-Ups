import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConstantsService {
  public static BASE_URL = window.location.origin + "/api";
  DEFAULT_TAG = "all";

  private messageSource = new BehaviorSubject(this.DEFAULT_TAG);
  currentTag = this.messageSource.asObservable();

  constructor() {}

  changeTag(tag: string) {
    this.messageSource.next(tag);
  }
}

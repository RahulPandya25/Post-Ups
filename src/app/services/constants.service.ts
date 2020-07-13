import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConstantsService {
  public static BASE_URL = window.location.origin + "/api";
  // public static BASE_URL = "http://localhost:4300/api";

  DEFAULT_TAG = "all";
  private tagSource = new BehaviorSubject(this.DEFAULT_TAG);
  currentTag = this.tagSource.asObservable();
  changeTag(tag: string) {
    this.tagSource.next(tag);
  }

  DEFAULT_SORT = "recentlyPosted";
  private sortSource = new BehaviorSubject(this.DEFAULT_SORT);
  currentSort = this.sortSource.asObservable();
  changeSort(sort: string) {
    this.sortSource.next(sort);
  }

  DEFAULT_CATEGORY = "all";
  private categorySource = new BehaviorSubject(this.DEFAULT_CATEGORY);
  currentCategory = this.categorySource.asObservable();
  changeCategory(category: string) {
    this.categorySource.next(category);
  }

  constructor() {}
}

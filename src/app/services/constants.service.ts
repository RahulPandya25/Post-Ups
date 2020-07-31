import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import defaults from "../../assets/defaults.json";

@Injectable({
  providedIn: "root",
})
export class ConstantsService {
  // for production only
  public static BASE_URL = window.location.origin + "/api";
  public static FILE_URL = window.location.origin + "/file";

  // for development only don't commit below line to any branch
  // public static BASE_URL = "http://localhost:4300/api";
  // public static FILE_URL = "http://localhost:4300/file";

  private tagSource = new BehaviorSubject(defaults.defaultTag);
  currentTag = this.tagSource.asObservable();
  changeTag(tag: string) {
    this.tagSource.next(tag);
  }

  private sortSource = new BehaviorSubject(defaults.defaultSort);
  currentSort = this.sortSource.asObservable();
  changeSort(sort) {
    this.sortSource.next(sort);
  }

  private categorySource = new BehaviorSubject(defaults.defaultCategory);
  currentCategory = this.categorySource.asObservable();
  changeCategory(category: string) {
    this.categorySource.next(category);
  }

  constructor() {}
}

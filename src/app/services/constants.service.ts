import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConstantsService {
  public static BASE_URL = window.location.origin + "/api";

  constructor() {}
}

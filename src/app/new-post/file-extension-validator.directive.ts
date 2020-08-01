import { ValidatorFn, FormControl } from "@angular/forms";
import defaults from "../../assets/defaults.json";

export function fileExtensionValidator(selectedCategory: string): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    let flag = true;
    const file = control.value;
    let validExt;
    if (file) {
      const extension = file.split(".").pop().toLowerCase();
      let categories = defaults.categories;
      categories.forEach((element) => {
        if (element.value === selectedCategory) {
          validExt = element.extensions;
        }
      });
      validExt.split(",").forEach((ext) => {
        if (ext.trim().toLowerCase() === extension) {
          flag = false;
        }
      });
    }
    return flag ? { inValidExt: true } : null;
  };
}

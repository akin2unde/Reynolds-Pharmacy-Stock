import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import Store, { AppKey } from "../utils/store";
@Injectable({providedIn: 'root'})
export class AuthGuard  {
  store = new Store();
  constructor(private router: Router) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if(!this.store.get(AppKey.USER))
    {
      if(state.url.split('?')[0].endsWith('/login') || state.url.endsWith('/request-access'))
      {
        return true;
      } else {
        const param = {returnUrl: state.url}
        this.router.navigate(["/login"], { queryParams: param})
        return false;
      }
    }
    else{
      return true;
    }

  }
}

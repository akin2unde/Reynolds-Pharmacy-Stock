import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy,} from '@angular/router';
import { Util } from './util';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

 
  private routeStore = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = !route.routeConfig.path?Util.getAllMenus().find(a=>a.name== route.routeConfig.title).url:route.routeConfig.path;
    var res= path && Util.getReusableRoutes().includes(path as string);
    return res;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const path = !route.routeConfig.path?Util.getAllMenus().find(a=>a.name== route.routeConfig.title).url:route.routeConfig.path;

    this.routeStore.set(path , handle);
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path =route.routeConfig.path ;
    var res= (
      path && Util.getReusableRoutes().includes(path as string) && !!this.routeStore.get(path as string)
    );
    return res;
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const path =route.routeConfig.path;;
    return this.routeStore.get(path as string);
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
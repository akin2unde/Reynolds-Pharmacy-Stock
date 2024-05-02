import { Component, OnInit } from '@angular/core';
import { SideMenu } from '../../utils/side-menu';
import { Router } from '@angular/router';
import { AppUtilService } from '../../services/app-util.service';
import { Util } from '../../utils/util';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
 menus= Util.getAllMenus();
  constructor(private route: Router, private appUtilService:AppUtilService) 
  {
    appUtilService.sideMenu$.subscribe(s=>{
      if(this.menus.find(a=>(a.isActive && a.name==s) && a.children.find(f=>f==s))==null)
      this.changeMenuSelection(this.menus.find(f=>f.name==s || f.children.find(a=>a==s)),false)
    });
  }
  ngOnInit()
  {
  }
  getImage()
  {
    return Util.getSvg('drug.svg',false);
  }
  changeMenuSelection(menu:SideMenu,executeRoute:boolean=true)
  {
    menu=!menu?this.menus[0]:menu;
    this.menus.forEach(f=>{
      f.isActive= f.name==menu.name
    });
    if(executeRoute)
      this.route.navigateByUrl(`/${menu.url}`);
  }
}

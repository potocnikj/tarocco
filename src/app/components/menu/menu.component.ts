import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from '../../../core/models/menu-item';
import { DropDownService } from '../../../core/services/render/dropdown.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menu: Array<MenuItem>;
  /**
   * Property for handling dropdown closing.
   */
  public preventToggling = true;

  constructor(
    public dropDownService: DropDownService,
    public authenticationService: AuthenticationService
  ) {
    this.initMenu();
  }

  @HostListener('document:click', ['$event'])
  handleClickEvent() {
    if (this.preventToggling) {
      this.preventToggling = false;
      return;
    }
    this.dropDownService.user = false;
  }

  ngOnInit() {
  }

  public setActive(link: any): void {
    this.menu.forEach((item) => {
      item.list.forEach((l) => {
        l.isActive = l.label === link.label;
      });
    });
  }

  public toggleUserDropdown() {
    this.dropDownService.toggle('user');
    this.preventToggling = this.dropDownService.user;
  }

  private initMenu(): void {
    this.menu = [
      MenuItem.init({
        label: 'Osnovno',
        list: [{label: 'Login', isActive: false, link: ['login']}, {label: 'Registracija ekipe', isActive: false, link: ['register']}]
      }),
      MenuItem.init({
        label: 'Administracija',
        list: [{label: 'Člani ekipe', isActive: false, link: ['']}, {label: 'Dostopna koda', isActive: false, link: ['']}]
      }),
      MenuItem.init({
        label: 'Igre',
        list: [{label: 'Scoreboard', isActive: false, link: ['']}, {label: 'Statistika', isActive: false, link: ['']}]
      })
    ];
  }
}

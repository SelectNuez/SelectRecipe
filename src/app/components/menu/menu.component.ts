import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userService.user$;
  }

  logout() {
    this.userService.logout().catch((error) => console.log(error));
  }
}

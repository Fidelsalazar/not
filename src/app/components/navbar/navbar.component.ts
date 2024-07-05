import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthService } from '../../services/auth/auth.service';
import { MenuSharingService } from '../../services/menu-sharing/menu-sharing.service';
import { routes } from '../../app.routes';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    OverlayPanelModule,
    BreadcrumbModule,
  ],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  role!: string

  constructor(
    private authService: AuthService,
    private menuSharingService: MenuSharingService
  ) {}

  ngOnInit() {

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.role = userData.role;
      console.log('Datos en caché:', userData);
    } else {
      console.log('No hay datos en caché para userData');
    }

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
      },

      /* {
        label: 'Planificación de guardia obrera',
        icon: 'pi pi-shield',
      },*/
    ];

    if ( this.role !== 'user' ) {
      this.items.push({
        label: 'Condecoraciones',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Consejo de Estado',
            //icon: 'pi pi-bolt',
            shortcut: '(CE)',
            items: [
              {
                label: 'Medalla José Tey',
                shortcut: '(25 años)',
                routerLink: '/medals',
              },
              {
                label: 'Orden Carlos J Finlay',
                shortcut: '(30 años)',
              },
              {
                label: 'Orden Frank País García',
                shortcut: '(30 años)',
              },
              {
                label: 'Carlos J Finlay',
              },
              {
                label: 'Orden Hazaña Laboral',
              },
              {
                label: 'Medalla Lázarp Peña de 3er Grado',
              },
              {
                label: 'Medalla Jesús Menéndez',
              },
            ],
          },
          {
            label: 'Ministerio de Educación Superior',
            shortcut: '(MES)',
            items: [
              {
                label: 'Medalla de la Edicación Cubana',
                shortcut: '(20 años)',
              },
              {
                label: ' Distincion Juan Tomás Roy',
                shortcut: '',
              },
            ],
          },
          {
            label:
              'Sindicato Nacional de trabajadores de la Educación, la Ciencia y el Deporte',
            shortcut: '',
            items: [
              {
                label: 'Medalla Rafael María de Mendive',
                shortcut: '(20 años y 25 años)',
              },
            ],
          },
          {
            separator: true,
          },
        ],
      })
    }

    this.items.push(
      {
        label: 'Trabajadores',
        icon: 'pi pi-users',
        routerLink: '/employer',
      },
      {
        separator: true,
      },
      {
        label: 'Salir',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.close(),
      }
    );

  }

  onMenuItemClick(itemLabel: string) {
    console.log(itemLabel);
    this.menuSharingService.changeMenuItem(itemLabel);
  }

  close() {
    this.authService.logout();
  }
}

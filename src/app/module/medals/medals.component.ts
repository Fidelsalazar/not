import { Component } from '@angular/core';
import { MedalsService } from '../../services/medal/medals.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MenuSharingService } from '../../services/menu-sharing/menu-sharing.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { AsignMedalComponent } from '../../components/asign-medal/asign-medal.component';

@Component({
  selector: 'app-jose-tey',
  standalone: true,
  providers: [MedalsService],
  templateUrl: './medals.component.html',
  styleUrl: './medals.component.css',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    HttpClientModule,
    NavbarComponent,
    BreadcrumbModule,
    TagModule,
  ],
})
export class MedalsComponent {
  customers: any[] = [];

  menuItemLabel: string = '';

  first = 0;

  rows = 10;

  constructor(
    private medalsService: MedalsService,
    private menuSharingService: MenuSharingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('Medals Component', this.menuItemLabel);

    this.menuSharingService.currentMenuItem.subscribe((label) => {
      this.menuItemLabel = label;
      console.log(this.menuItemLabel);
    });

    this.getMedal();
  }

  newMedal(data: any, template: string, action: string): void {
    console.log(' Editar medalla', data, template, action);

    let content: any;

    if (template === 'Medalla') {
      switch (action) {
        case 'edit':
          content = 'editMedal';
          break;
        case 'new':
          content = 'newMedal';
          break;
      }
    }

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '900px',
      height: '500px',
      data: {
        use: template,
        search: content,
        data: data,
      },
    });

    dialogRef.componentInstance.modificationSuccess.subscribe(() => {
      this.getMedal();
    });
  }

  changeStatus(data: any){
    console.log('Cambiar status', data);

    const dialogRef = this.dialog.open(AsignMedalComponent, {
      width: '800px',
      height: '60%',
      data
    });

    dialogRef.componentInstance.modificationSuccess.subscribe(() => {
      this.getMedal();
    });
  }

  getMedal(): void {
   console.log('Llamando a getCustomersLarge con:', this.menuItemLabel);
   this.medalsService
     .getCustomersLarge(this.menuItemLabel)
     .then((customers) => {
       this.customers = customers;
       console.log(
        'Respuesta de getCustomersLarge:',
        this.customers,
        this.customers[0].medals[0].status
      );
     })
     .catch((error) => {
       console.error('Error en getCustomersLarge:', error);
     });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.medalsService
      .getCustomersLarge(this.menuItemLabel)
      .then((customers) => (this.customers = customers));

    this.first = 0;
  }

  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.customers
      ? this.first === this.customers.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
  }

  getStatusSeverity(status: string) {
    console.log('getStatusSeverity', status)
    switch (status) {
      case 'PROPUESTA':
        return 'warning';
      case 'ENTREGADA':
        return 'success';
      case 'CANCELADA':
        return 'danger';
      default:
        return undefined;
    }
  }
}

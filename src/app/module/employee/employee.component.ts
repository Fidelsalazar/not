import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../core/interface/customer.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    TagModule,
    RatingModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [AuthService, MessageService, CustomerService],
})
export class EmployeeComponent {

  customers: any[] = [];
  products!: Customer[];
  expandedRows = {};

  constructor(
    public authService: AuthService,
    private customerService: CustomerService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEmployee();
    /*this.customerService
      .getCustomersLarge()
      .then((data) => (this.products = data));*/
  }

  openDialog(data: any, template: string, action: string): void {
    console.log(' Editar empleado', data, template);

    let content: any;

    if (template === 'Empleado') {
      switch (action) {
        case 'edit':
          content = 'editEmployee';
          break;
        case 'new':
          content = 'newEmployee';
          break;
      }
    }

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '800px',
      height: '60%',
      data: {
        use: template,
        search: content,
        data: data,
      },
    });

    dialogRef.componentInstance.modificationSuccess.subscribe(() => {
      this.getEmployee();
    });
  }

  getEmployee(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customers = response;
        console.log('Recibido en componente Employee', response);
      },
      error: (error) => {
        console.log('Error obteniendo datos', error);
      },
    });
  }

  expandAll(): void {
    this.expandedRows = this.products.reduce(
      (acc: { [key: string]: boolean }, p) => {
        acc[p.id] = true;
        return acc;
      },
      {} as { [key: string]: boolean }
    );
  }

  collapseAll() {
    this.expandedRows = {};
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  getStatusSeverity(status: string) {
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

  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Datos del empleado expandidos',
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Datos del empleado colapsados',
      detail: event.data.name,
      life: 3000,
    });
  }

  deleteAire(id: any): void {
    console.log(id.id);
    this.customerService.delete(id.id).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmployee();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }
}

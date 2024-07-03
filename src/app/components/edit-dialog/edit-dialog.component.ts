import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ViewChild,
  Output,
  EventEmitter,
  model
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CustomerService } from '../../services/customer/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TreeSelectModule } from 'primeng/treeselect';
import { MedalsService } from '../../services/medal/medals.service'
import { ScrollTopModule } from 'primeng/scrolltop';
import { CalendarModule } from 'primeng/calendar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ScrollPanelModule,
    TreeSelectModule,
    ScrollTopModule,
    CalendarModule,
    CheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [CustomerService, MedalsService],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
})
export class EditDialogComponent implements OnInit {
  nodes!: any[];
  value: string | undefined;

  maleChecked = false;
  femaleChecked = false;

  use: string;
  template: string;
  dataResive: any;
  selectedNodes: any;

  employeeForm: FormGroup = new FormGroup({});

  @Output() modificationSuccess = new EventEmitter<void>();

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @ViewChild('newEmployee', { static: true })
  newEmployeeContenidoTemplate!: TemplateRef<any>;

  @ViewChild('newMedal', { static: true })
  newMedalContenidoTemplate!: TemplateRef<any>;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.use = data.use;
    this.template = data.search;
    this.dataResive = data.data;
  }

  ngOnInit(): void {
    console.log('Componente Editar');
    console.log(this.use, this.template, this.dataResive);

    if (this.template === 'newEmployee') {
      this.container.createEmbeddedView(this.newEmployeeContenidoTemplate);
      this.initFormEmployee();
    } else if (this.template === 'newMedal') {
      this.container.createEmbeddedView(this.newMedalContenidoTemplate);
      this.initFormEmployee();
    }

    this.customerService.getModificacionExitosaSubject().subscribe(() => {
      // Aquí puedes realizar las actualizaciones necesarias en el componente
      console.log(
        'La modificación se ha completado correctamente, actualizando el componente...'
      );

      this.modificationSuccess.emit();
    });
  }

  onGenderChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const gender = checkbox.value;

    this.maleChecked = gender === 'M';
    this.femaleChecked = gender === 'F';
  }

  initFormEmployee() {
    this.employeeForm = this.fb.group({
      fechaEntrada: ['', [Validators.required]],
      fechaEntradEdu: ['', [Validators.required]],
      fechaEntradaCNEA: ['', [Validators.required]],
      idEmpleado: ['', [Validators.required, Validators.minLength(4)]],
      noCI: ['', [Validators.required, Validators.pattern('\\d{11}$')]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido1: ['', [Validators.required, Validators.maxLength(50)]],
      apellido2: ['', [Validators.maxLength(50)]],
      cuadro: [''],
      sexo: ['', [Validators.required]],
    });
  }

  onCuadroChange(event: Event) {
    const value = (event.target as HTMLInputElement).checked ? 'true' : 'false';
    this.employeeForm.controls['cuadro'].setValue(value);
  }

  onSexoChange(event: Event, gender: string) {
    const value = (event.target as HTMLInputElement).checked ? gender : '';
    this.employeeForm.controls['sexo'].setValue(value);
  }

  send() {
    console.log('Servicio modificar empleado', this.employeeForm.value);

    const cuadroValue = Array.isArray(this.employeeForm.value.cuadro)
      ? this.employeeForm.value.cuadro[0]
      : this.employeeForm.value.cuadro;
    const sexoValue = Array.isArray(this.employeeForm.value.sexo)
      ? this.employeeForm.value.sexo[0]
      : this.employeeForm.value.sexo;

    // Actualizar los valores en el formulario
    this.employeeForm.controls['cuadro'].setValue(cuadroValue);
    this.employeeForm.controls['sexo'].setValue(sexoValue);

    console.log('Servicio modificar empleado', this.employeeForm.value);
    console.log('Empleado enviado', this.dataResive);

    if (this.employeeForm.valid) {
      const datosFormulario = { ...this.employeeForm.value };
      console.log(datosFormulario);
      console.log('Datos que se enviarán:', datosFormulario);
      this.customerService.create(datosFormulario).subscribe({
        next: (response) => {
          console.log('Datos enviados correctamente:', response.status);

          this.customerService.setModificacionExitosa(true);
          this.modificationSuccess.emit();
          this.close();
        },
        error: (error) => {
          console.error('El formulario no es válido:', error);
        },
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

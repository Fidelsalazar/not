import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ViewChild,
  Output,
  EventEmitter,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CustomerService } from '../../services/customer/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TreeSelectModule } from 'primeng/treeselect';
import { MedalsService } from '../../services/medal/medals.service';
import { ScrollTopModule } from 'primeng/scrolltop';
import { CalendarModule } from 'primeng/calendar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-asign-medal',
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
    FileUploadModule,
    BadgeModule,
    ProgressBarModule,
    ToastModule,
    InputOtpModule
  ],
  providers: [CustomerService, MedalsService, MessageService, PrimeNGConfig],
  templateUrl: './asign-medal.component.html',
  styleUrl: './asign-medal.component.css',
})
export class AsignMedalComponent {
  dataResive: any;

  changeForm: FormGroup = new FormGroup({});

  files: File[] = [];

  totalSize: number = 0;

  totalSizePercent: number = 0;

  value: any;

  @Output()
  modificationSuccess = new EventEmitter<void>();

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @ViewChild('changeStatus', { static: true })
  changeStatusContenidoTemplate!: TemplateRef<any>;

  constructor(
    //private customerService: CustomerService,
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AsignMedalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataResive = data;
  }

  ngOnInit(): void {
    console.log('Componente Editar');
    console.log(this.dataResive);
    this.container.createEmbeddedView(this.changeStatusContenidoTemplate);
    this.initChangeForm();
  }

  initChangeForm() {
    this.changeForm = this.fb.group({});
  }

  choose(event: any, callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(
    event: any,
    file: { size: number },
    removeFileCallback: (arg0: any, arg1: any) => void,
    index: any
  ) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  }

  onSelectedFiles(event: FileSelectEvent) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: () => void) {
    callback();
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes || [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
    ];
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}

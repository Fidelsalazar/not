import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../config';
import { firstValueFrom } from 'rxjs';
import { Medals } from '../../core/interface/medals.interface';
import { Customer } from '../../core/interface/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class MedalsService {
  customers: any[] = [
    // ... lista de clientes ...
  ];

  constructor(
    private httpClient : HttpClient
  ) {}

  filterGlobal(value: string, matchMode: string): void {
    if (!value || !matchMode) {
      return;
    }
    this.customers = this.customers.filter((customer: { name: any }) => {
      // Supongamos que queremos filtrar por el nombre del cliente
      const customerValue = customer.name;

      switch (matchMode) {
        case 'contains':
          return customerValue.includes(value);
        case 'startsWith':
          return customerValue.startsWith(value);
        case 'endsWith':
          return customerValue.endsWith(value);
        default:
          // Si el modo de coincidencia no es reconocido, no se filtra
          return this.customers;
      }
    });
  }

  getCustomersLarge( medal : string ): Promise<Customer[]> {
    return firstValueFrom(
      this.httpClient.get<Customer[]>(`${environment.apiUrl}/medals/getbyname/${medal}`)
    )
      .then((response) => {
        console.log('Respuesta del servidor:', response);
        return response; // Continúa con la respuesta si es exitosa.
      })
      .catch((error) => {
        console.error('An error occurred:', error.message);
        return Promise.reject(error);
      });

  }



  /*getCustomersLarge(): Promise<any> {
    return new Promise((resolve) => {
      resolve([]);
    });
  }*/
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../config';
import { Customer } from '../../core/interface/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public modificacionExitosaSubject = new BehaviorSubject<boolean>(false);

  customers: any[] = [
    // ... lista de clientes ...
  ];

  constructor(private http: HttpClient) {}

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

  create(data: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/employee`, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<string> {
    return this.http.delete<string>(
      `${environment.apiUrl}/employee/delete/${id}`
    );
  }

  modified(data: any): Observable<any> {
    const form = {
      name: data.name,
      sex: data.sex,
      category: data.categpry,
      tt: data.tt,
      tedu: data.tedu,
      tcnea: data.tcnea,
      orders: data.orders,
    };

    return this.http
      .patch<any>(`${environment.apiUrl}/employee/${data.id}`, form)
      .pipe(catchError(this.handleError));
  }

  getAllCustomers(user: any): Observable<Customer[]> {

    const params = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)
      .set('name', user.name)

    return this.http.get<Customer[]>(`${environment.apiUrl}/employee/${user.role}/all`, {params}).pipe(
      tap((data) => {
        console.log('Datos recibidos:', data);
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError('Error al obtener los centros');
      })
    );
  }

  getCustomersLarge(): Promise<any> {
    return new Promise((resolve) => {
      resolve([
        {
          id: '007',
          name: 'BIRDOLOY CABALLERO KENIA',
          image: 'elegant-watch.jpg',
          sex: 'F',
          tt: 21,
          tedu: 21,
          tcnea: 21,
          orders: [
            {
              date: '2020-09-24',
              resolution: '',
              amount: '',
              quantity: 'Sindicato Nacional de Trabajadores de la Educacion',
              customer: 'Distinción Rafael Maria de Mendive ',
              status: 'PROPUESTA',
            },
          ],
        },
        {
          id: '011',
          name: 'MELEK CAMPOS SOFIA',
          image: 'elegant-watch.jpg',
          sex: 'F',
          tt: 27,
          tedu: 27,
          tcnea: 27,
          orders: [
            {
              date: '',
              resolution: '',
              amount: '2014',
              quantity: '',
              customer: 'Medalla Jesús Menendez',
              status: 'ENTREGADA',
            },
          ],
        },
        {
          id: '028',
          name: 'MARIO HECHAVARRIA SANCHEZ',
          image: 'elegant-watch.jpg',
          sex: 'M',
          tt: 38,
          tedu: 13,
          tcnea: 13,
          orders: [
            {
              date: '6-19-2024',
              resolution: '',
              amount: '',
              quantity: '',
              customer: 'Medalla Lazaro Peña de 3er Grado',
              status: 'SOLICITADA',
            },
          ],
        },
        {
          id: '003',
          name: 'MONICA ROSARIO BERENGUER UNGARO',
          image: 'elegant-watch.jpg',
          sex: 'F',
          tt: 28,
          tedu: 28,
          tcnea: 28,
          orders: [
            {
              date: '',
              resolution: '',
              amount: '',
              quantity: '',
              customer: '',
              status: '',
            },
          ],
        },
        // ... (y así sucesivamente para cada entrada)
      ]);
    });
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente, como una red inalcanzable
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del servidor
      console.error(
        `Código de error ${error.status}, ` + `body: ${error.error}`
      );
    }
    // Retorna un observable con un mensaje de error legible
    return throwError(
      'Ocurrió un error, por favor intenta nuevamente más tarde.'
    );
  }
  getModificacionExitosaSubject(): Observable<boolean> {
    return this.modificacionExitosaSubject.asObservable();
  }

  setModificacionExitosa(modificacionExitosa: boolean): void {
    this.modificacionExitosaSubject.next(modificacionExitosa);
  }
}

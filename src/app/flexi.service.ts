import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from '../env';

type OperationBody = {
  document_id?: string,
  payload?: any
}

@Injectable({ providedIn: 'root' })
export class FlexiService {
  private urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = ''
  }
  
  setCollection(collectionNameOrModelClass: any) {
    let collectionName: string
    try {
      collectionName = collectionNameOrModelClass.name
    } catch {
      collectionName = collectionNameOrModelClass
    }

    const url = new DatabaseUrl(
      settings.hostName, settings.dbName, collectionNameOrModelClass
    )

    try {
      this.urlBase = url.toString();
    } catch {
      this.urlBase = String(url);
    }

    return this
  }

  create(payload: any): Observable<any> {
    const body = { payload: payload };
    return this.makeRequest(this.urlBase, 'create', body);
  }

  find(id: string): Observable<any> {
    const body = { document_id: id };
    return this.makeRequest(this.urlBase, 'find', body);
  }

  clearCollection(): Observable<any> {
    return this.makeRequest(this.urlBase, 'clear-collection', {});
  }

  findMany(filters: any): Observable<any> {
    const body = { payload: filters };
    return this.makeRequest(this.urlBase, 'find-many', body);
  }

  delete(id: string): Observable<any> {
    const body = { document_id: id };
    return this.makeRequest(this.urlBase, 'delete', body);
  }

  update(id: string, payload: any): Observable<any> {
    const body = { document_id: id, payload: payload };
    return this.makeRequest(this.urlBase, 'update', body);
  }

  private makeRequest(
    url: string,
    operationName: string,
    body: OperationBody
  ): Observable<any> {
    const headers = new HttpHeaders({
      'operation-name': operationName,
      'content-type': 'application/json'
    });

    return this.http.post(url, body, { headers });
  }
}

export class DatabaseUrl {
  private hostName: string;
  private dbName: string;
  private collectionName: string;

  constructor(hostName: string, dbName: string, collectionName: string) {
    this.hostName = hostName;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  toString(): string {
    return `${this.hostName}/${this.dbName}/${this.collectionName}/`;
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, concatMap, Observable, of, tap } from "rxjs";


@Injectable({ providedIn: 'root' })
export class ModalService {

    modalConfirmIsVisible: boolean = false

    private modalVisibilitySubject = new BehaviorSubject<boolean>(false);
    modalConfirmIsVisible$ = this.modalVisibilitySubject.asObservable();

    show() {
        this.modalVisibilitySubject.next(true);
    }

    close() {
        this.modalVisibilitySubject.next(false);
    }

    showModalUntilConfirm<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.show()),
            concatMap(() => obs$),
            tap(() => this.close()),
        )
    }

}
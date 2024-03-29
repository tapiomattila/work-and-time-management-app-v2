import { Injectable } from '@angular/core';
import { addDoc, deleteDoc, doc, Firestore, getDoc, Query, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection, query, where, getDocs } from '@firebase/firestore';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore';
import { from, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { DatabaseCollection } from 'src/app/utils/enums/app.enum';
import { createHour, Hour } from './hour.model';
import { HourStore } from './hour.store';

@Injectable({ providedIn: 'root' })
export class HourService {

    constructor(
        private store: HourStore,
        private firestore: Firestore,
    ) { }

    setHours(hours: Partial<Hour>[]) {
        const hoursArray = new Array();
        hours.forEach(el => {
            hoursArray.push(createHour(el));
        });
        this.store.set(hoursArray);
    }

    updateHour(hour: Hour) {
        this.store.updateActive({ ...hour });
    }

    setActive(id: string) {
        this.store.setActive(id);
    }

    toggleActive(id: string) {
        this.store.toggleActive(id);
    }

    removeActive(id: string) {
        this.store.removeActive(id);
    }

    activeNull() {
        this.store.setActive(null);
    }

    /**
     * Clear store worksites
     */
    clearWorksites() {
        this.store.reset();
    }

    addHourToStore(hour: Hour) {
        this.store.add(hour);
    }

    
    removeFromStore(hourId: string) {
        this.store.remove(({ id }) => id === hourId);
    }

    fetchHoursByUID(uid: string) {
        if (!uid) {
            return of([]);
        }
        const collectionRef = collection(this.firestore, DatabaseCollection.HOURS);

        const collectionQuery = query(
            collectionRef,
            where('clientId', '==', 'jg22s'),
            where("userId", "==", uid)
        );
        return this.getHourCollection(collectionQuery);
    }

    fetchHoursByClient(clientID: string) {
        const collectionRef = collection(this.firestore, DatabaseCollection.HOURS);

        const collectionQuery = query(
            collectionRef,
            where('clientId', '==', clientID),
        );
        return this.getHourCollection(collectionQuery);
    }

    addNewHour(hour: Hour) {
        return from(addDoc(collection(this.firestore, DatabaseCollection.HOURS), hour)).pipe(
            map(res => {
                return this.mapDocRefToHour(res);
            }),
            switchMap(id => {
                const documentRef = doc(this.firestore, DatabaseCollection.HOURS, id);
                return from(getDoc(documentRef));
            }),
            map(hour => this.mapDocSnapToHour(hour))
        );
    }

    updateDocument(hour: Hour, id: string) {
        const documentRef = doc(this.firestore, DatabaseCollection.HOURS, id);
        return from(updateDoc(documentRef, {
            ...hour
        }));
    }

    deleteDocument(id: string) {
        const documentRef = doc(this.firestore, DatabaseCollection.HOURS, id);
        return from(deleteDoc(documentRef))
    }

    private getHourCollection(collectionQuery: Query<DocumentData>) {
        return from(getDocs(collectionQuery)).pipe(
            shareReplay(),
            distinctUntilChanged(),
            debounceTime(30),
            map(res => {
                return this.mapSnapToHours(res);
            }));;
    }

    private mapDocRefToHour(snap: DocumentReference<DocumentData>) {
        const id = snap.id;
        return id;
    }

    private mapDocSnapToHour(snap: DocumentSnapshot<DocumentData>) {
        const id = snap.id;
        const data = snap.data();
        const hour = {
            id,
            ...data
        } as Hour;
        return hour;
    }

    private mapSnapToHours(snaps: QuerySnapshot<DocumentData>) {
        const hours: Hour[] = [];
        snaps.forEach((doc: DocumentData) => {
            const id = doc['id'];
            const data = doc['data']();
            const hour = {
                id,
                ...data
            } as Hour;
            hours.push(hour);
        });

        return hours;
    }
}

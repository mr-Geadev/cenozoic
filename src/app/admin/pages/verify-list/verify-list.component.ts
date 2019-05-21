import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IMG_URL } from 'const';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { map, publishReplay, refCount, switchMap, tap } from 'rxjs/operators';

@Component({
	selector: 'verify-list.col',
	templateUrl: './verify-list.component.html',
	styleUrls: ['./verify-list.component.scss'],
})
export class VerifyListComponent implements OnInit {

	public dictionary: any = {};

	readonly imgUrl = IMG_URL;

	readonly verifyList = new BehaviorSubject<void>(null);
	readonly verifyList$ = this.verifyList.asObservable().pipe(
		switchMap(() => {
			return this.http.get('/api/v1/admin/verification-request/all');
		}),
		map((res) => res['verificationRequests']),
		publishReplay(1),
		refCount(),
	);

	readonly activeRequest$ = this.verifyList$.pipe(
		map(list => list.filter(request => request.status !== 5 && request.status !== 6)),
		publishReplay(1),
		refCount()
	);

	readonly historyRequest$ = this.verifyList$.pipe(
		map(list => list.filter(request => request.status === 5 || request.status === 6)),
		publishReplay(1),
		refCount()
	);

	constructor(
		public http: HttpClient,
	) {
	}

	ngOnInit() {}

	readonly accept = new Subject<string>();
	readonly accept$ = this.accept.asObservable().pipe(
		switchMap((id) => this.http.post('/api/v1/admin/verification-request/decision', { requestId: id, decision: true })),
		tap(() => this.verifyList.next(null)),
		publishReplay(1),
		refCount(),
	);

	readonly reject = new Subject<string>();
	readonly reject$ = this.reject.asObservable().pipe(
		switchMap((id) => this.http.post('/api/v1/admin/verification-request/decision', { requestId: id, decision: false })),
		tap(() => this.verifyList.next(null)),
		publishReplay(1),
		refCount(),
	);

	readonly any$ = merge(
		this.accept$,
		this.reject$,
	);
}

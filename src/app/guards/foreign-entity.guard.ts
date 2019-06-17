import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class ForeignEntityGuard implements CanActivate {

	constructor(private userService: UserService,
							private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.userService.user$.pipe(
			map(user => {
				const { deniedForType } = route.data;
				if (user.typeAccount === deniedForType) {
					return user._id === route.queryParams.creatorId
				} else {
					return true;
				}
			}),
		);
	}
}

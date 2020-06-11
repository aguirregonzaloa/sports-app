import { CanActivate,
		ActivatedRouteSnapshot,
		RouterStateSnapshot,
		Router,
		CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private userservice: UserService,
		private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		 let check: boolean;
		 this.userservice.Login$
		.subscribe((login: boolean)=>{
			if(login) {
				check = true		
			}else{
				this.router.navigate(['/']);
				check = false
			}
		});
		return check;
			
	}
}
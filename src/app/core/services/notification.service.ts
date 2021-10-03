import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { 
  }

  showDefault( message: string ): void {
		this.notifier.notify( 'default', message );
	}

  showSucces( message: string ): void {
		this.notifier.notify( 'success', message );
	}

  showInfo( message: string ): void {
		this.notifier.notify( 'info', message );
	}

  showWarning( message: string ): void {
		this.notifier.notify( 'warning', message );
	}

  showError( message: string ): void {
		this.notifier.notify( 'error', message );
	}

}

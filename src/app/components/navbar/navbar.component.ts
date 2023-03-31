import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public signInService:SigninService, private router:Router){}

  ngOnInit(): void {
  }

  public logout(){
    Swal.fire({
      text : 'Esta seguro que desea cerrar la sesión actual?',
      icon : 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.signInService.logout();
        
      }
    })
    
  }
}

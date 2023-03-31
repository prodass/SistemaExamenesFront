import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  hide: boolean = true;

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private snack: MatSnackBar, private signinService:SigninService, private router:Router) { }

  ngOnInit(): void {
  }

  mostrarPass(event: Event) {
    event.stopPropagation();
    this.hide = !this.hide;
  }

  formSubmit() {
    console.log(this.loginData.password);
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open("El correo electrónico es requerido!", "Aceptar", {
        duration: 3000
      })
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open("La contraseña es requerida!", "Aceptar", {
        duration: 3000
      })
      return;
    }


    this.signinService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.signinService.loginUser(data.token);
        this.signinService.getCurrentUser().subscribe((user:any) => {
          this.signinService.setUser(user);
          console.log(user);

          if(this.signinService.getUserRole() == "Admin"){
            this.router.navigate(['admin']);
          }else if(this.signinService.getUserRole() == "User"){
            this.router.navigate(['inicio']);
          }
          else{
            this.signinService.logout();
          }
        })
      },(error) => {
        Swal.fire({
          title : 'Ha ocurrido un error!',
          text : 'Contactese con el administrador del sistema.',
          icon : 'error',
          confirmButtonText: 'Aceptar'
        })
        console.log(error);
      }
    )
  }

  

 
}



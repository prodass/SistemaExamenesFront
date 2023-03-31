
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
}

constructor(private userService:UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(f: NgForm){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido!','Aceptar',{
        duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center'
      });
      return;
    }

    this.userService.nuevoUsuario(this.user).subscribe(
      (data) => {
        console.log(data); 
        Swal.fire('Usuario guardado con exito!','','success');
        f.resetForm();
      },(error) => {
        console.log(error);
        Swal.fire('Ha ocurrido un error en el sistema!','Contactese con el administrador del sistema.','error');
        //f.resetForm();
      }
    )
  }
}
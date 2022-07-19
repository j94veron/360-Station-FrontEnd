import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Createuser } from '@app/models/createuser.model';
import { CreateuserService } from '@app/service/createuser.service';
import { LoginService } from "@service/login.service";
import { CredentialData } from '@app/models/credential.data.model';

@Component({
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit{

  valCheck: string[] = ['remember'];

  submitted: boolean;

  password: string;
  
  config: AppConfig;
  
  subscription: Subscription;

  userDialog: boolean;

  userUpdateDialog: boolean;

  createUsers: Createuser[];

  createUser: Createuser;

  credentialData = new CredentialData();

  constructor(private createUserService: CreateuserService, private messageService: MessageService,
    public configService: ConfigService, public loginService: LoginService,
    private router: Router){ }

  ngOnInit(): void {
    this.loginService.logout();
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  openNew() {
    this.createUser = new Createuser();
    this.userDialog = true;
  }

  onHome(){
    this.router.navigate(['/']);
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
}

saveUser() {
    this.submitted = true;
    this.createUser.role = "ROLE_USER";
    this.createUser.status = "active"
    if (this.createUser.id) {
        this.createUserService.update(this.createUser).pipe(
            mergeMap(() => {
                return this.createUserService.findAll();
            })
        ).subscribe((createUserData) => {
            this.createUsers = createUserData;
            this.userDialog = false;
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Usuario Modificado.', life: 3000});
        }, (err) => {
            console.log(err)
        });
        
    } else {
        this.createUserService.save(this.createUser).subscribe((createUserData) => {
            this.createUsers = createUserData;
            this.userDialog = false;
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Usuario Creado.', life: 3000});
        }, (err) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario ya creado!! Por favor Ingrese uno nuevo.', life: 3000});
            console.log(err)
        });

    }
}

login(){
  this.loginService.login(this.credentialData).subscribe(() => {
    // login success
    this.messageService.add({severity: 'Success', summary: 'Successful', detail: 'Login Ok.', life: 3000});
    this.router.navigate(['/']);
  }, (err) => {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario o Contraseña Incorrectos.', life: 3000});
      console.log(err);
  });
}
  
}

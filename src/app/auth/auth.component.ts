import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, Routes, RouterLinkActive ,RouterModule } from '@angular/router';
import { faEye, faHeartPulse, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login/login.service';
import { NavbarService } from '../services/navbar/navbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  errorHandleLog:boolean = false;
  errorHandleSign:boolean = false;
  msg:any;
  log:boolean=true;
  sign:boolean=false;

  faEye=faEye;
  faHeartPulse=faHeartPulse;
  faEyeSlash=faEyeSlash;

  submitted: boolean=false;

  showLog: boolean = false;
  passwordLog() {
      this.showLog = !this.showLog;
  }

  logForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
    
  });

  show: boolean = false;
  showConf: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private cookieService: CookieService,
    public dialogRef:  MatDialogRef<AuthComponent>,
    private auth: LoginService,
    private nav:NavbarService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  form = new FormGroup({
    username: new FormControl(null,Validators.required),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,Validators.required),
    confirmPassword:new FormControl(null,Validators.required),
    gender: new FormControl('Male')
    
  });
  

  activeLog(){
    this.log=true;
    this.sign=false;
  }
  activeSign(){
    this.log=false;
    this.sign=true;
  }
  Login(){
    this.submitted=true
    var email=this.logForm.controls["email"].value;
    var password=this.logForm.controls["password"].value;

    if(this.logForm.get('password')?.valid && this.logForm.get('email')?.valid){
      this.http.post<any>('https://abilitysystem.azurewebsites.net/api/User/Login', {email,password}).subscribe(
      (response) => {
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token',response.token);
        localStorage.setItem('user', JSON.stringify(response.id));
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        this.errorHandleLog=true;
        this.msg="Wrong Email or Password"
      }
    );
    }
    
  }
  password() {
    this.show = !this.show;
}
confirmpassword() {
  this.showConf = !this.showConf;
}
Signup(){
  var userName=this.form.controls["username"].value;
  var email=this.form.controls["email"].value;
  var password=this.form.controls["password"].value;
  var confirmpassword=this.form.controls["confirmPassword"].value;
  var gen=this.form.controls["gender"].value;
  var gender = gen=="Male"?1:0;
  var user = {userName,email,password,gender}
  console.log(user)
  
  if(password==confirmpassword &&this.form.get('password')?.valid && this.form.get('email')?.valid &&this.form.get('username')?.valid){
    this.http.post<any>('https://abilitysystem.azurewebsites.net/api/User/Register',user ).subscribe(
    (response) => {
      //localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token',response.token);
      localStorage.setItem('isLoggedIn','true');  
      localStorage.setItem('user', JSON.stringify(response.id));
      // this.nav.cart=response.user.cart?.length;
      // this.nav.wishlist=response.user.wishlist?.length;
      this.dialogRef.close();
    },
    (error) => {
      console.log(error)
      this.errorHandleSign=true;
      this.msg=error.error[0].description;
    }
  );
  }
  else if(password!=confirmpassword){
    this.errorHandleSign=true;
    this.msg="Password does not match";
  }
}
}

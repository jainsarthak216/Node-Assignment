import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInfoModel } from '../models/userInfoModel';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {
	modified = false;
  body: UserInfoModel;
  uid: string;
	updateForm: FormGroup;
  serviceErrors:any = {};
  private subscriber: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router){ 
    this.subscriber = this.route.params.subscribe(params => {
			this.http.get('/api/v1/customer/' + params['uid']).subscribe((data:any) => {
        this.uid = params['uid'];
        this.body = new UserInfoModel(data.customer);
        console.log(this.body);
      });
    });  
  }

  invalidFirstName(){
    return (this.serviceErrors['first_name'] != null || this.updateForm.controls['first_name'].errors != null);
  }
  
  invalidLastName(){
    return (this.serviceErrors['last_name'] != null || this.updateForm.controls['last_name'].errors != null);
  }
  
  invalidEmail(){
    return (this.serviceErrors['email'] != null || this.updateForm.controls['email'].errors != null);
  }
  
  invalidZipcode(){
    return (this.serviceErrors['zipcode'] != null || this.updateForm.controls['zipcode'].errors != null);
  }
  
  invalidPassword(){
  	return (this.serviceErrors['password'] != null || this.updateForm.controls['password'].errors != null);
  }

  ngOnInit(){
    this.updateForm = this.formBuilder.group({
  		first_name: ['', [Validators.required, Validators.maxLength(50)]],
  		last_name: ['', [Validators.required, Validators.maxLength(50)]],
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
  		zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{6}(?:-[0-9]{4})?$')]],
  		password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  	});
    
    // this.updateForm.controls['first_name'].setValue(this.body.first_name);


    
  }

  onUpdate(){
  	this.modified = true;
  	
    let data = Object.assign(this.body, this.updateForm.value);
    this.http.put('/api/v1/customer/' + this.uid, data).subscribe();

    this.router.navigate(['/users']);
  }

};

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserInfoModel } from '../models/userInfoModel';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})

export class DeleteUserComponent implements OnInit {
  private subscriber: any;
  success: boolean = false;
  uid: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router){ }

  ngOnInit(){
    this.subscriber = this.route.params.subscribe(params => {
			this.http.delete('/api/v1/customer/' + params['uid']).subscribe((data:any) => {
        this.uid = params['uid'];
        this.success = data.success;
      });
    });  
  }

}

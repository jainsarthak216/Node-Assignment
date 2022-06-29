import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/userInfoModel'
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-all',
  templateUrl: './display-all.component.html',
  styleUrls: ['./display-all.component.css']
})

export class DisplayAllComponent implements OnInit {
  users: any;
  keys: any;

	constructor(private http: HttpClient, private route: ActivatedRoute) { }

	private subscriber: any;
	ngOnInit(){
		this.subscriber = this.route.params.subscribe(params => {
	      
      this.http.get('/api/v1/customer').subscribe((data:any) => {
        this.users = data;
        this.keys = Object.keys(data);

        for(let item in this.users){
          console.log(this.users[item]);
        }

		  });
	  });
	}
}

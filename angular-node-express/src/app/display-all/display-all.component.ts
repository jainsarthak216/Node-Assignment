import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/userInfoModel'
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { faFilm  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-display-all',
  templateUrl: './display-all.component.html',
  styleUrls: ['./display-all.component.css']
})

export class DisplayAllComponent implements OnInit {
  users: any;
  keys: any;
  icon = faFilm;

	constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

	private subscriber: any;
	ngOnInit(){
		this.subscriber = this.route.params.subscribe(params => {
	      
      this.http.get('/api/v1/customer/all').subscribe((data:any) => {
        this.users = data;
        this.keys = Object.keys(data);

        for(let item in this.users){
          console.log(this.users[item]);
        }

		  });
	  });
	}

  onEdit(uid: string){
    this.router.navigate(['/update/' + uid]);
  }

  onDelete(uid: string){
    this.router.navigate(['/delete/' + uid]);
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';

export class Restaurant {
  constructor(
    public _id: number,
    public name: String,
    public price: Number,
    public adress: String,
    public phone: Number,
    public image: String,
    public wifi: String,
    public petFriendly: String,
    public cardPayment: String,
    public terrace: String
  ) {}
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private service: SharedService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private http: HttpClient
  ) {}

  RestaurantId: string | undefined;
  RestaurantName: string | undefined;
  Price: number | undefined;
  restaurants: Restaurant[] | undefined;
  params = this.activatedRoute.snapshot.params;
  restaurant!: Restaurant;
  name: any;

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);
    this.getRes();
  }

  getRes() {
    this.service.getRestaurants().subscribe((result) => {
      this.restaurants = result.products;
      console.log(result.products);

      if (this.restaurants) {
        this.restaurant = this.restaurants.filter(
          (test) => test._id === this.params.id
        )[0];
        console.log(this.restaurant);
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { DOCUMENT } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';

export class Restaurant {
  constructor(
    public id: number,
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

interface IRestaurantFilter {
  cardPayment: boolean;
  petFriendly: boolean;
  wifi: boolean;
  terrace: boolean;
}

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  restaurants!: Restaurant[];
  _restaurants!: Restaurant[];
  public search: any = '';
  public query: any = '';
  productId: String | undefined;
  appliedFilters!: IRestaurantFilter;
  ModalTitle!: string;
  ActivateAddEditComp: boolean = false;
  emp: any;

  opened = true;
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  constructor(
    private service: SharedService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.appliedFilters = {
      cardPayment: false,
      petFriendly: false,
      wifi: false,
      terrace: false,
    };
    this.getRes();


    // commented code for previous existing side menu
    // console.log(window.innerWidth)
    // if (window.innerWidth < 768) {
    //   this.sidenav.fixedTopGap = 55;
    //   this.opened = false;
    // } else {
    //   this.sidenav.fixedTopGap = 55;
    //   this.opened = true;
    // }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   if (event.target.innerWidth < 768) {
  //     this.sidenav.fixedTopGap = 55;
  //     this.opened = false;
  //   } else {
  //     this.sidenav.fixedTopGap = 55
  //     this.opened = true;
  //   }
  // }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  addClick() {
    this.emp = {
      id: 0,
      name: '',
    };

    this.ModalTitle = 'Add Restaurant';
    this.ActivateAddEditComp = true;
  }

  editClick(item: any){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Restaurant";
    this.ActivateAddEditComp=true;
  }

  deleteClick(item: { _id: any; }){
    if(confirm('Are you sure??')){
      this.service.deleteRestaurant(item._id).subscribe(data=>{
        alert(data.toString());
        this.getRes();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditComp = false;
    this.getRes();
  }

  getRes() {
    this.service.getRestaurants().subscribe((result) => {
      this._restaurants = result.products;
      this.restaurants = this.applyFilters(this._restaurants);
    });
  }

  goToDetailsByRestaurant(restaurant: any) {
    console.log(restaurant);
    this.router.navigate(['/restaurants', restaurant._id]);
  }

  goToUrl(): void {
    this.document.location.href = 'http://localhost:5000/users/logout';
}

  applyFilters(data: any) {
    console.log(this.appliedFilters, data);
    if (this.appliedFilters) {
      if (
        typeof this.appliedFilters.cardPayment !== 'undefined' &&
        this.appliedFilters.cardPayment === true
      ) {
        console.log(data);
        data = data?.filter((restaurant: any) => {
          return (
            this.appliedFilters.cardPayment === true &&
            restaurant.cardPayment === 'yes'
          );
        });
      }

      if (
        typeof this.appliedFilters.petFriendly !== 'undefined' &&
        this.appliedFilters.petFriendly === true
      ) {
        console.log(data);
        data = data?.filter((restaurant: any) => {
          return (
            this.appliedFilters.petFriendly === true &&
            restaurant.petFriendly === 'yes'
          );
        });
      }

      if (
        typeof this.appliedFilters.wifi !== 'undefined' &&
        this.appliedFilters.wifi === true
      ) {
        console.log(data);
        data = data?.filter((restaurant: any) => {
          return this.appliedFilters.wifi === true && restaurant.wifi === 'yes';
        });
      }

      if (
        typeof this.appliedFilters.terrace !== 'undefined' &&
        this.appliedFilters.terrace === true
      ) {
        console.log(data);
        data = data?.filter((restaurant: any) => {
          return (
            this.appliedFilters.terrace === true && restaurant.terrace === 'yes'
          );
        });
      }
    }

    return data;
  }


}

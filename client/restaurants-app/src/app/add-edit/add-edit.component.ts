import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  payLoad!: any;
  constructor(private service: SharedService) {}

  @Input() emp: any;
  id: any;
  name!: string;
  WiFi!: string;
  CardPayment!: string;
  PetFriendly!: string;
  Music!: string;
  Events!: string;
  Delivery!: string;
  Terrace!: string;
  Booking!: string;

  ResList: any = [];
  myForm!: FormGroup;

  ngOnInit(): void {
    this.loadResList();
    this.myForm = new FormGroup({
      name: new FormControl(this.name),
      wifi: new FormControl(''),
      cardPayment: new FormControl(''),
      petFriendly: new FormControl(''),
      terrace: new FormControl('')
    });
  }

  loadResList() {
    this.service.getRestaurants().subscribe((data: any) => {
      this.ResList = data;
      // console.log(this.ResList)
      this.id = this.emp.id;
      this.name = this.emp.name;
      this.WiFi = this.emp.WiFi;
      this.CardPayment = this.emp.CardPayment;
      this.PetFriendly = this.emp.PetFriendly;
      this.Terrace = this.emp.Terrace;
    });
  }

  // updateRestaurant() {
  //   var val = {
  //     id: this.emp.id,
  //     name: this.emp.name,
  //     WiFi: this.emp.WiFi,
  //     CardPayment: this.emp.CardPayment,
  //     PetFriendly: this.emp.PetFriendly,
  //     Terrace: this.emp.Terrace
  //   };
  // }

  // addRestaurant() {
  //   var val = {
  //     id: this.id,
  //     name: this.name,
  //     WiFi: this.WiFi,
  //     CardPayment: this.CardPayment,
  //     PetFriendly: this.PetFriendly,
  //     Terrace: this.Terrace,
  //   };

  //   this.service.addRestaurant(val).subscribe((res) => {
  //     alert(res.toString());
  //   });

  //   console.log(val)
  // }
  onSubmit(myForm: FormGroup) {
    this.payLoad = JSON.stringify(this.myForm.value);
    console.log(this.payLoad)
    this.service.storeServers(this.payLoad)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}

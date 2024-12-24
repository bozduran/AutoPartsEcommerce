import {Component, OnInit} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {CustomFormService} from '../../services/custom-form.service';
import {Country} from '../../common/country';
import {State} from '../../common/state';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {CustomValidator} from '../../validators/custom-validator';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDivider} from '@angular/material/divider';
import {MatList, MatListItem} from '@angular/material/list';
import {CartService} from '../../services/cart.service';
import {Customer} from '../../common/customer';
import {Address} from '../../common/address';
import {OrderItem} from '../../common/order-item';
import {Purchase} from '../../common/purchase';
import {Order} from '../../common/order';
import {CheckoutService} from '../../services/checkout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [
    MatStepper,
    MatStep,
    MatStepLabel,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatOption,
    MatSelect,
    MatCheckbox,
    MatDivider,
    MatList,
    MatListItem,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private customFormService: CustomFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService, private router: Router) {
  }

  secondFormGroup!: AbstractControl;
  shippingAddress!: AbstractControl;
  customer!: AbstractControl;
  billingAddress!: AbstractControl;

  ngOnInit(): void {

    this.subscribeCartDetails();
    this.initializeForm();

  }

  generateOrder(): Purchase {

    //     get customer
    let newCustomer = new Customer(this.checkoutFormGroup.get('customer.firstName')?.value,
      this.checkoutFormGroup.get('customer.lastName')?.value, this.checkoutFormGroup.get('customer.email')?.value);


    //    get billing and shipping addresses
    let newShippingAddress = new Address(this.checkoutFormGroup.get('shippingAddress.city')?.value,
      this.checkoutFormGroup.get('shippingAddress.state')?.value,
      this.checkoutFormGroup.get('shippingAddress.country')?.value,
      this.checkoutFormGroup.get('shippingAddress.street')?.value,
      this.checkoutFormGroup.get('shippingAddress.zipCode')?.value)

    let newBillingAddress = new Address(this.checkoutFormGroup.get('billingAddress.city')?.value,
      this.checkoutFormGroup.get('billingAddress.state')?.value,
      this.checkoutFormGroup.get('billingAddress.country')?.value,
      this.checkoutFormGroup.get('billingAddress.street')?.value,
      this.checkoutFormGroup.get('billingAddress.zipCode')?.value)


    //   make carItem to orderItems array
    // @ts-ignore
    const orderItems: OrderItem[] = [];

    for (let tempCartItem of this.cartService.cartItems) {
      orderItems.push(new OrderItem(tempCartItem));
    }

    let newOrder: Order = new Order(this.totalPrice, this.totalQuantity);

    const newPurchase = new Purchase(orderItems,
      newOrder,
      newShippingAddress,
      newShippingAddress,
      newCustomer);

    console.log(newPurchase);
    return newPurchase;

  }

  initializeForm() {
    //checkout forms

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace]),
        lastName: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace]),
        city: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace]),
        city: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required])
      })
    });

  }

  subscribeCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );


    //add months and years to credit card form
    const currentMonth: number = new Date().getMonth() + 1;
    this.customFormService.getMothForCreditCard(currentMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

    this.customFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )

    this.customFormService.getYearsForCreditCard().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )

  }

  submit(): void {

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let purchase = this.generateOrder()

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.purchaseId}`);
          this.clearCart();
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

  }

  copyShippingAddressToBillingAddress(event: any) {
    const isChecked = event?.checked;

    // @ts-ignore
    if (isChecked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }

  }

  handleMonthsAndYears() {

    const currentYear: number = new Date().getFullYear();

    const selectedYear: number = Number(this.checkoutFormGroup.get('creditCard.expirationYear')?.value);

    console.log("selected", selectedYear);


    let startingMonth: number;

    if (currentYear == selectedYear) {
      startingMonth = new Date().getMonth() + 1;
    } else {
      startingMonth = 1;
    }

    this.customFormService.getMothForCreditCard(startingMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    // @ts-ignore
    const countryName = formGroup.value.country.name;
    // @ts-ignore
    const countryCode = formGroup.value.country.code;
    console.log(formGroupName);

    this.customFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName == 'shippingAddress') {
          console.log('countryCode', countryCode)
          this.shippingAddressStates = data;
          console.log(data);
        } else {
          this.billingAddressStates = data;
        }

        // @ts-ignore
        formGroup?.get('state').setValue(data[0]);
      }
    );

  }

  private clearCart() {

    //    clear the data related to cart at cart service
    this.cartService.clearCartData();

    //    reset data from form
    this.checkoutFormGroup.reset();

    //    redirect
    this.router.navigateByUrl("/parts");
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingTermsComponent } from './shipping-terms.component';

describe('ShippingTermsComponent', () => {
  let component: ShippingTermsComponent;
  let fixture: ComponentFixture<ShippingTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, inject, OnInit } from '@angular/core';
import { VatService } from './services/vat.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected vatSrv = inject(VatService);
  
  ngOnInit(): void {
    this.vatSrv.setCountry('IT');
  }
}
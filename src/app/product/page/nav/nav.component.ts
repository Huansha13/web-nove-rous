import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../acount/service/account.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ProductI} from '../../models/product.interface';
import {ModalComponent} from '../../dialog/modal/modal.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [AccountService]
})
export class NavComponent implements OnInit {

  public isLogged = false;
  public usr = null;

  constructor(private router: Router,
              private lgService: AccountService,
              private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.usr = await this.lgService.getCurrentUser();
    if (this.usr) {
      this.isLogged = true;
    }
  }
  openDialog(prod?: ProductI): void {
    const config = {
      data: {
        message: prod ? 'Editar producto' : 'Nuevo producto',
        content: prod
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe();
  }
  onNewProd(): void {
    this.openDialog();
  }

  async onLogout(): Promise<void> {
    try {
      await this.lgService.logout();
      await this.router.navigate(['/login']);
    } catch (err) {
      console.log(err);
    }
  }
}

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';


/* Imports External*/
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProductService} from '../../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {ProductI} from '../../models/product.interface';
import {ModalComponent} from '../../dialog/modal/modal.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nameProd', 'descriptionProd', 'priceProd', 'totalProd', 'soldProd', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor( private prodServ: ProductService,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    this.prodServ.getAllProduct().subscribe(prods => {
      (this.dataSource.data = prods);
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  onEditProd(prod: ProductI): void {
    this.openDialog(prod);
  }
  onDeleteProd(prod: ProductI): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.prodServ.onDeleteProduct(prod).then(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          );
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'There was an error deleting this post',
            'error'
          );
        });
      }
    });
  }
}

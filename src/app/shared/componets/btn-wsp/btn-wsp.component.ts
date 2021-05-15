import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-wsp',
  templateUrl: './btn-wsp.component.html',
  styleUrls: ['./btn-wsp.component.scss']
})
export class BtnWspComponent implements OnInit {
  duda = 'https://api.whatsapp.com/send?phone=51929157461&text=';
  photo = 'https://scontent.flim10-1.fna.fbcdn.net/v/t1.6435-9/53839924_2278466979102780_1954239480076435456_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=15wnCbL1AG8AX_PNYxw&_nc_ht=scontent.flim10-1.fna&oh=514b4a61a21389cbcaaa5bacf739de63&oe=60C43788';
  textoDeInput: string = null;
  wspd: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  mesaje(): void {
    this.clear();
  }
  clear(): void {
    this.textoDeInput = '';
  }
  wspdialgo() {
    this.wspd = !this.wspd;
  }

}

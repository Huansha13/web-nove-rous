import { Component } from '@angular/core';

interface Products {
  code: string;
  name: string;
  img: string;
  description: string;
  price: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nove-rous';
  date = new Date();
  wsp = 'https://api.whatsapp.com/send?phone=51929157461&text= 👋✋👋  ¡Hola! rous 👧, tienes disponible,';
  products: Products[] = [
    {
      code: 'MOL01',
      name: 'Molde para Quequitos ps',
      img: 'https://res.cloudinary.com/unjfsc/image/upload/v1619583265/WhatsApp_Image_2021-04-27_at_23.12.46_q32wyj.jpg',
      description: 'Model multi uso, con facil de lavar y secar, para los quequitos',
      price: '10.60'
    },
    {
      code: 'LcVRD-1',
      name: 'Licuadoras Portatil',
      img: 'https://res.cloudinary.com/unjfsc/image/upload/v1619583268/WhatsApp_Image_2021-04-27_at_23.12.46_1_yiyoam.jpg',
      description: 'Super comoda y facil para preparar tus bebidad favoritas',
      price: '15.50'
    },
    {
      code: 'FLA-1',
      name: 'Flores de ambiente',
      img: 'https://res.cloudinary.com/unjfsc/image/upload/v1607132366/sample.jpg',
      description: 'Para una mejor decoracion de ambiente de la casa',
      price: '40.00'
    },{
      code: 'MOL01',
      name: 'Molde para Quequitos ps',
      img: 'https://res.cloudinary.com/unjfsc/image/upload/v1619583265/WhatsApp_Image_2021-04-27_at_23.12.46_q32wyj.jpg',
      description: 'Model multi uso, con facil de lavar y secar, para los quequitos',
      price: '10.60'
    },
    {
      code: 'LcVRD-1',
      name: 'Licuadoras Portatil',
      img: 'https://res.cloudinary.com/unjfsc/image/upload/v1619583268/WhatsApp_Image_2021-04-27_at_23.12.46_1_yiyoam.jpg',
      description: 'Super comoda y facil para preparar tus bebidad favoritas',
      price: '15.50'
    },
    {
      code: 'FLA-1',
      name: 'Flores de ambiente',
      img: 'https://res.cloudinary.com/unjfsc/image/upload/v1607132366/sample.jpg',
      description: 'Para una mejor decoracion de ambiente de la casa',
      price: '40.00'
    }
  ];
}

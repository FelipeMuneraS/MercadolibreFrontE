import { Component } from '@angular/core';
import { HttpAPIService } from '../http-api.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  query: string;
  items: any = null;
  skeleton: boolean;
  constructor(private httpAPIService: HttpAPIService) { }

  search() {
    if (this.query !== '' && this.query !== undefined) {
      this.items = [];
      this.skeleton = true;
      const queryWithoutSpace = this.query.replace(/ /g, '+');
      this.httpAPIService.getItems(queryWithoutSpace).subscribe(
        (Response) => {
          const result = Response.results;
          result.forEach(element => {
            this.items.push({
              thumbnail: element.thumbnail,
              name: element.title,
              price: element.price,
              sellerId: element.seller.id,
              sellerName: null
            });
          });
          this.skeleton = false;
          this.getSellersById();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getSellersById() {
    this.items.forEach(element => {
      this.httpAPIService.getSeller(element.sellerId).subscribe(
        (Response) => {
          element.sellerName = Response.nickname;
        },
        (error) => { }
      );
    });
    console.log(this.items);
  }

}

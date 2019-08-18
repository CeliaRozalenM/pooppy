import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


import { Bin } from '../bin';
import { UsersService } from '../services/users.service';
import { BinsService } from '../services/bins.service';
import { StorageService } from '../services/storage.service';
import { User } from '../user';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  constructor(
    private usersService: UsersService,
    private location: Location,
    private userBinServ: BinsService,
    private storageService: StorageService
  ) { }

  public bins = [];

  ngOnInit() {
    this.getFavoriteBinData();
  }

  backClicked() {
    this.location.back();
  }

  // this.bins = [];
  async getFavoriteBinData() {

    const user = await this.storageService.getUsers();
    await this.usersService.getUserFavoriteBinsData(user._id)
      .subscribe(
        (bin_observable) => {
          this.bins = [];
          const binId = [];
          for (let i = 0; i < bin_observable.length; i++) {
            binId.push(bin_observable[i]);
          }
          this.getFavoriteBinsByUser(binId);
        });
  }
  
  getFavoriteBinsByUser(array: Array<string>) {
    this.userBinServ.getBinDataByUser(array).subscribe(
      (bin) => {
        this.bins = bin;
      }
    );
  }

  async deleteBin(binId) {
    const user = await this.storageService.getUsers();
    await this.usersService.deleteBin(user._id, binId).
      subscribe(() => {
        this.getFavoriteBinData();
      }
      );
  }

}

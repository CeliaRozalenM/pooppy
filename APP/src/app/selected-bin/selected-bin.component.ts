import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../user';
import { Bin } from '../bin';
import { UsersService } from '../services/users.service';
import { BinsService } from '../services/bins.service';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-selected-bin',
  templateUrl: './selected-bin.component.html',
  styleUrls: ['./selected-bin.component.scss'],
})

export class SelectedBinComponent implements OnInit {

  public favoriteBins: Bin[];
  public _selectedBinId: string;
  public binInfo: any;
  public users: User[];
  public user: any;
  public active;
  public userId = '5c9b28545f02671f443fb996';
  public userHasFavorite = false;

  @Output() bagsChangedEvent = new EventEmitter<string>();

  constructor(
    private usersService: UsersService,
    private binsService: BinsService,
    private storageService: StorageService
  ) {
    this.getLocalStorage();
  }

  get selectedBinId(): string {
    // Transform value to display
    return this._selectedBinId;
  }

  @Input()
  set selectedBinId(selectedBinId: string) {
    this._selectedBinId = selectedBinId;
    if (selectedBinId.length) {
      this.getOneBinInfo(selectedBinId);
      this.getUserFavoriteBinsData(this.userId);
    }
  }


  ngOnInit() {

  }

  getOneBinInfo(selectedBinId: Bin['_id']): any {
    this.binsService.getOneBinInfo(selectedBinId)
      .subscribe(
        (bin_observable) => {
          this.binInfo = bin_observable;

        }
      );
  }

  async getLocalStorage() {
    this.user = await this.storageService.getUsers();
    await this.getUserFavoriteBinsData(this.user._id);
  }

  getUserFavoriteBinsData(userId): any {
    this.usersService.getUserFavoriteBinsData(userId)
      .subscribe(
        async (bin_observable) => {
          this.favoriteBins = [];
          // bin_observable.length
          for (let i = 0; i < bin_observable.length; i++) {
            this.favoriteBins.push(bin_observable[i]);
          }
          await this.findBinInUserFavoriteAndColor();
        });

  }

  findBinInUserFavoriteAndColor(): boolean {
    const findBin = this.favoriteBins.find((bin) => bin.toString() === this.selectedBinId);
    if (!findBin || (findBin.toString() !== this.selectedBinId)) {
      this.userHasFavorite = false;
    } else {
      this.userHasFavorite = true;
    }
    return this.userHasFavorite;
  }

  addFavorite(userId: User['_id'], selectedBinId: Bin['_id']): void {
    this.findBinInUserFavoriteAndColor();
    if (!this.userHasFavorite) {
      this.usersService.addFavoriteBin(userId, selectedBinId)
        .subscribe();
      console.log('add');
    } else {
      this.usersService.deleteBin(userId, selectedBinId)
        .subscribe();
      console.log('delete');
    }
    this.getUserFavoriteBinsData(userId);
  }

  changeBinBag(selectedBin: Bin['_id']): void {
    this.binsService.updateBinBags(selectedBin, !this.binInfo.bag).subscribe(
      (bin: Bin) => {
        this.binInfo.bag = bin.bag;
      });
    this.bagsChangedEvent.next(selectedBin.toString());
  }

}
import {Component, DoCheck, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {PlaceService} from "../services/place.service";
import {Observable} from "rxjs";
import {IPlace} from "../model/Place";

import {ITicket} from "../model/ITicket";

@Component({
  selector: 'app-search-by-params',
  templateUrl: './search-by-params.component.html',
  styleUrls: ['./search-by-params.component.css']
})
export class SearchByParamsComponent implements OnInit, DoCheck {

  places$: Observable<IPlace[]>;
  island: string = "остров";
  architecture: string = "архитектура";
  club: string = "клубный отдых";
  food: string = "гастрономия";
  mountains: string = "горы";
  sea: string = "море";
  skiResort: string = "горнолыжный курорт";
  health: string = "лечебно-оздоровительный курорт";
  religious: string = "религиозный туризм";
  surfing: string = "сёрфинг";
  ocean: string = "океан";
  beachRest: string = "пляжный отдых";
  isIsland = false;
  isArchitecture = false;
  isClub = false;
  isFood = false;
  isMountains = false;
  isSea = false;
  isSkiResort = false;
  isHealth = false;
  isReligious = false;
  isSurfing = false;
  isOcean = false;
  isBeachRest = false;
  placesData: IPlace[];
  tempPlacesData: IPlace[] = [];

  constructor(private placeService: PlaceService) {
  }

  IsParamsMatches(tagsString: string, checkedParams: string[]) {
    console.log("IsParamsMatches");
    var tagParams = this.placeService.SplitString(tagsString,",");
    var res = false;
    // console.log("checkedParams");
    // console.log(checkedParams);
    // console.log("tagParams");
    // console.log(tagParams);
    var isFound = true;
    for (let checkedParam of checkedParams) {
      // console.log("new item");
      if (isFound) {
        // console.log("checkedParam");
        // console.log(checkedParam);
        isFound = false;
        for (let tagParam of tagParams) {
          // console.log("tagParam");
          // console.log(tagParam);
          if (tagParam === checkedParam) {
            // console.log("found");
            isFound = true;

          }
        }
        // console.log("cycle end: " + isFound);

      } else {
        // console.log("else response " + isFound);
        return isFound;
      }
    }
    // console.log("response" + isFound);
    return isFound;
  }

  // IsMatches(place:IPlace){
  //
  //   var result = false;
  //   if (!this.isBeachRest && !this.isOcean && !this.isSurfing && !this.isReligious && !this.isHealth && !this.isSkiResort
  //     && !this.isSea && !this.isMountains && !this.isFood && !this.isClub && !this.isArchitecture && !this.isIsland){
  //     result= true;
  //   }
  //   if(this.isBeachRest && this.IsParamsMatches(place.tags,this.beachRest)){
  //     result= true;
  //   }if(this.isOcean && this.IsParamsMatches(place.tags,this.ocean)){
  //     result= true;
  //   }if(this.isSurfing && this.IsParamsMatches(place.tags,this.surfing)){
  //     result= true;
  //   }if(this.isReligious && this.IsParamsMatches(place.tags,this.religious)){
  //     result= true;
  //   }if(this.isHealth && this.IsParamsMatches(place.tags,this.health)){
  //     result= true;
  //   }if(this.isSkiResort && this.IsParamsMatches(place.tags,this.skiResort)){
  //     result= true;
  //   }if(this.isSea && this.IsParamsMatches(place.tags,this.sea)){
  //     result= true;
  //   }if(this.isMountains && this.IsParamsMatches(place.tags,this.mountains)){
  //     result= true;
  //   }if(this.isFood && this.IsParamsMatches(place.tags,this.food)){
  //     result= true;
  //   }if(this.isClub && this.IsParamsMatches(place.tags,this.club)){
  //     result= true;
  //   }if(this.isArchitecture && this.IsParamsMatches(place.tags,this.architecture)){
  //     result= true;
  //   }if(this.isIsland && this.IsParamsMatches(place.tags,this.island)){
  //     result= true;
  //   }
  //
  //   return result;
  // }

  IsMatches(place: IPlace) {
    var checkedParams: string[] = [];
    // var result = false;
    if (!this.isBeachRest && !this.isOcean && !this.isSurfing && !this.isReligious && !this.isHealth && !this.isSkiResort
      && !this.isSea && !this.isMountains && !this.isFood && !this.isClub && !this.isArchitecture && !this.isIsland) {
      return true;
    }
    if (this.isBeachRest) {
      checkedParams.push(this.beachRest);
    }
    if (this.isOcean) {
      checkedParams.push(this.ocean);
    }
    if (this.isSurfing) {
      checkedParams.push(this.surfing);
    }
    if (this.isReligious) {
      checkedParams.push(this.religious);
    }
    if (this.isHealth) {
      checkedParams.push(this.health);
    }
    if (this.isSkiResort) {
      checkedParams.push(this.skiResort);
    }
    if (this.isSea) {
      checkedParams.push(this.sea);
    }
    if (this.isMountains) {
      checkedParams.push(this.mountains);
    }
    if (this.isFood) {
      checkedParams.push(this.food);
    }
    if (this.isClub) {
      checkedParams.push(this.club);
    }
    if (this.isArchitecture) {
      checkedParams.push(this.architecture);
    }
    if (this.isIsland) {
      checkedParams.push(this.island);
    }

    if (this.IsParamsMatches(place.tags, checkedParams)) {
      return true;
    }
    return false;
  }

  ngDoCheck() {
    // console.log("check");
    this.placesData = this.placeService.basePlacesValue;
    if (this.placesData != undefined) {

      for (let place of this.placesData) {
        if (this.IsMatches(place)) {
          this.tempPlacesData.push(place);
        }
      }
      // console.log("transfers");
      // console.log(this.noTransfer);
      // console.log(this.oneTransfer);
      // console.log(this.twoTransfers);
      // console.log("tempPlacesData");
      // console.log(this.tempPlacesData);
      this.placeService.SetPlacesValue(this.tempPlacesData);
      this.tempPlacesData = [];
    }


  }

  ngOnInit(): void {

    this.placeService.GetAllPlaces().subscribe(
      response => {
      }, error => {
      });

    this.places$ = this.placeService.places


  }

}

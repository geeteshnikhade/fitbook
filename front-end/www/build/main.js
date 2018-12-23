webpackJsonp([0],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = /** @class */ (function () {
    function ModalPage(viewCtrl, navCtrl, httpReq, navParams, cd) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.httpReq = httpReq;
        this.navParams = navParams;
        this.cd = cd;
        this.dataList = [];
        this.foodRecommendations = [];
        this.activityRecommendations = [];
        this.clarifiaData = [];
        this.pageToRender = "UploadFoodPage";
        this.sampleActivityLog = {
            "activityId": 12030,
            "distance": 3.34,
            "duration": 1800000,
            "isFavorite": false,
            "name": "Running",
            "startTime": "12:20"
        };
        this.onClick = function ($event, ind) {
            console.log('onClick $event: ', $event);
            _this.foodRecommendations[ind]['rating'] = $event['rating'];
        };
        this.onRatingChange = function ($event) {
            console.log('onRatingUpdated $event: ', $event);
            // this.onRatingChangeResult = $event;
        };
        this.onHoverRatingChange = function ($event) {
            console.log('onHoverRatingChange $event: ', $event);
            // this.onHoverRatingChangeResult = $event;
        };
        this.foodRecommendations = [
            { foodItemName: 'Chichen Tandoor sdf dsaf asdf asdfasdfasdf', cal: 440 },
            { foodItemName: 'Swarma', cal: 300 },
            { foodItemName: 'Puran Poli', cal: 460 },
            { foodItemName: 'Mutton', cal: 300 },
            { foodItemName: 'Daru', cal: 460 },
        ];
        this.dataList = [
            { name: 'Chichen Tandoor sasdaasdasdasdasdasdasdsdasda', cal: 440 },
            { name: 'Swarma', cal: 300 },
            { name: 'Puran Poli', cal: 460 },
            { name: 'Panner Tikka Masala', cal: 560 },
            { name: 'Masala Dosa', cal: 460 },
            { name: 'Cutting Chai', cal: 30 },
            { name: 'Tandori Chai', cal: 40 },
            { name: 'Panner Tikka Masala', cal: 560 },
            { name: 'Masala Dosa', cal: 460 },
            { name: 'Cutting Chai', cal: 30 },
            { name: 'Tandori Chai', cal: 40 },
        ];
        this.activityRecommendations = [
            { name: "Running", calBurnt: 700 },
            { name: "Curl Bar", calBurnt: 300 },
            { name: "Crunches", calBurnt: 600 },
            { name: "Walking", calBurnt: 550 },
            { name: "Swimming", calBurnt: 850 },
        ];
        this.clarifiaData = [
            { name: "Food 1", value: 89.8 },
            { name: "Food 2", value: 88.7 },
            { name: "Food 3", value: 85.4 },
            { name: "Food 4", value: 60.0 },
            { name: "Food 5", value: 45.0 },
        ];
        this.pageToRender = this.navParams.get('message');
        this.clarifiaData = this.navParams.get('apiData');
        this.activityRecommendations = this.navParams.get('recData');
        this.foodRecommendations = this.navParams.get('recData');
        console.log(this.foodRecommendations);
        if (this.foodRecommendations != undefined) {
            for (var i = 0; i < this.foodRecommendations.length; i++) {
                this.foodRecommendations[i]['rating'] = 2;
            }
        }
    }
    ModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalPage');
        console.log('CurrentPageToRender', this.navParams.get('message'));
        this.pageToRender = this.navParams.get('message');
    };
    ModalPage.prototype.logActivity = function (ind) {
        //this.sampleActivityLog["manualCalories"] = localStorage.getItem("calorieOutPerDay")
        this.closeModal();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    ModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    ModalPage.prototype.submitRatings = function (ind) {
        var obj = {};
        var foodRec = this.foodRecommendations;
        console.log(foodRec);
        for (var i = 0; i < foodRec.length; i++) {
            foodRec[i]["userID"] = localStorage.getItem("userID");
            delete foodRec[i]["Display_Name"];
            foodRec[i]["Calories"] = parseInt(foodRec[i]["Calories"]);
        }
        obj["data"] = foodRec;
        this.httpReq.updateRatings(obj).subscribe(function (data) {
            console.log("Sent ratings to AWS API gateway", data);
        }, function (error) {
            console.log(error);
            console.log("Error in get user info");
        });
        this.hitFitbit(this.foodRecommendations[ind]);
    };
    ModalPage.prototype.getItems = function (event) {
        this.searchWord = event.target.value;
    };
    ModalPage.prototype.searchFoodItemText = function () {
        console.log(this.searchWord);
        this.sendToFitbit(this.searchWord);
    };
    ModalPage.prototype.sendToFitbit = function (name) {
        var _this = this;
        var queryUrl = "https://api.fitbit.com/1/foods/search.json?query=" + name;
        this.httpReq.fitbitGetActivity(queryUrl, "Bearer " + localStorage.getItem('fitbitAccessToken')).subscribe(function (data) {
            console.log("Fitbit Search Food Request is successful ", data);
            var dataJson = data['foods'];
            var numberOfItems = 5;
            var formattedJson = [];
            var calorieCount = [];
            var uniqueCalorieLimit = 50;
            var count = 0;
            mainLoop: for (var i = 0; i < dataJson.length; i++) {
                for (var j = 0; j < calorieCount.length; j++)
                    if (Math.abs(calorieCount[j] - dataJson[i]['calories']) < uniqueCalorieLimit)
                        continue mainLoop;
                var obj = new Object();
                obj["foodName"] = dataJson[i]['name'];
                obj["calories"] = dataJson[i]['calories'];
                obj["unitId"] = dataJson[i]['defaultUnit']['id'];
                obj["amount"] = dataJson[i]['defaultServingSize'];
                obj["portion"] = dataJson[i]['defaultServingSize'] + ' ' + dataJson[i]['defaultUnit']['name'];
                formattedJson.push(obj);
                calorieCount.push(dataJson[i]['calories']);
                count++;
                if (count == numberOfItems)
                    break;
            }
            console.log(formattedJson);
            _this.searchOptions = formattedJson;
            _this.pageToRender = 'UploadFoodPage';
            _this.cd.detectChanges();
        }, function (error) {
            console.log(error);
            console.log("Error in Fitbit search query");
            //this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token)    
        });
    };
    ModalPage.prototype.logToFitbit = function (ind) {
        var foodItem = this.searchOptions[ind];
        this.hitFitbit(foodItem);
    };
    ModalPage.prototype.hitFitbit = function (item) {
        var _this = this;
        var today = new Date();
        var year = today.getFullYear();
        var month = (today.getMonth() + 1).toString();
        var dt = today.getDate().toString();
        if (parseInt(dt) < 10) {
            dt = '0' + dt;
        }
        if (parseInt(month) < 10) {
            month = '0' + month;
        }
        var dtString = year + '-' + month + '-' + dt;
        var foodItem = item;
        if ('unitId' in foodItem) {
            foodItem["mealTypeId"] = 7;
            foodItem["date"] = dtString;
            delete foodItem["portion"];
            var keys = Object.keys(foodItem);
            var str = '?';
            for (var i = 0; i < keys.length; i++) {
                str = str + keys[i] + "=" + foodItem[keys[i]] + "&";
            }
            console.log(str);
        }
        else {
            str = "?date=" + dtString + "&foodName=Chicken, Light Meat, Fried&amount=2&calories=" + foodItem['Calories'] + "&mealTypeId=7&unitId=251&";
        }
        console.log(foodItem);
        var foodLogUrl = "https://api.fitbit.com/1/user/" + localStorage.getItem('fitbitUserId') + "/foods/log.json";
        this.httpReq.fitbitLogFood(foodLogUrl + str, {}, "Bearer " + localStorage.getItem('fitbitAccessToken')).subscribe(function (data) {
            console.log("Fitbit Log Food Request is successful ", data);
            _this.closeModal();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }, function (error) {
            console.log(error);
            console.log("Error in Fitbit log food");
            //this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token)    
        });
    };
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-modal',
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */]],template:/*ion-inline-start:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\modal\modal.html"*/'<!--\n  Generated template for the ModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <div style="display: flex">\n      <ion-title>FitBook</ion-title>\n      <ion-icon ios="ios-close-circle-outline" md="md-close-circle" (click)="closeModal()"></ion-icon>\n    </div>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n\n  <!-- <div> {{pageToRender}}</div> -->\n  <div>\n    <!-- UploadFoodPage Modal render Here -->\n\n\n    <div *ngIf="pageToRender == \'UploadFoodPage\'">\n      <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n      <div class="buttonDiv"><button ion-button (click)="searchFoodItemText()">SUBMIT</button></div>\n      <ion-list>\n        <ion-item-sliding *ngFor="let item of searchOptions; let i = index">\n          <ion-item>\n            <ion-row>\n              <h2 col-lg-6 col-sm-6 col-xs-6>{{item.foodName}}</h2>\n              <div col-lg-3 col-sm-3 col-xs-3>{{item.calories}} <span style="color:grey">cals</span></div>\n                <div col-lg-3 col-sm-3 col-xs-3>{{item.portion}}</div>\n            </ion-row>\n          </ion-item>\n          <ion-item-options side="right">\n            <button (click)="logToFitbit(i)" ion-button color="primary">\n            <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n            Accept\n          </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n    </div>\n\n\n\n    <!-- DashBoardPage Modal render Here -->\n    <!-- Recommend Food Modal -->\n    <div *ngIf="pageToRender == \'foodModal\'">\n      <ion-row style="display: flex;justify-content: space-evenly">\n        <div col-lg-5 col-md-4 col-sm-4 col-xs-4>Name</div>\n        <div col-lg-3 col-md-4 col-sm-4 col-xs-4>Calories</div>\n        <div col-lg-4 col-md-4 col-sm-4 col-xs-4>Rating</div>\n      </ion-row>\n      <ion-list>\n        <ion-item-sliding *ngFor="let item of foodRecommendations; let i = index">\n          <ion-item>\n            <ion-row style="display: flex;\n            flex-direction: row;\n            justify-content: space-around;">\n              <div col-lg-5 col-md-4 col-sm-4 col-xs-4 class="textOverflow">\n                {{item.Display_Name}}\n              </div>\n              <div col-lg-3 col-md-4 col-sm-4 col-xs-4>\n                {{item.Calories}}\n              </div>\n              <div col-lg-4 col-md-4 col-sm-4 col-xs-4>\n                <star-rating [hoverEnabled]="true" [rating]=2 (starClickChange)="onClick($event, i)" (ratingChange)="onRatingChange($event)" (hoverRatingChange)="onHoverRatingChange($event)">\n                </star-rating>\n              </div>\n            </ion-row>\n          </ion-item>\n          <ion-item-options side="right">\n            <button (click)="submitRatings(i)" ion-button color="primary">\n            <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n            Accept \n          </button>\n          </ion-item-options>\n          <!-- <ion-item-options side="left">\n            <button ion-button color="danger">\n            <ion-icon name="ios-close-outline"></ion-icon>\n            Reject\n          </button>\n          </ion-item-options> -->\n\n        </ion-item-sliding>\n      </ion-list>\n    </div>\n\n    <!-- Recommend Activity Modal -->\n\n    <div *ngIf="pageToRender == \'activityModal\'">\n      <ion-row style="display: flex;justify-content: space-around">\n        <ion-col col-lg-9 col-md-10 col-sm-10 col-xs-10>Activity Recommended</ion-col>\n        <ion-col style="text-align: right" col-lg-3 col-md-2 col-sm-2 col-xs-2>Minutes</ion-col>\n      </ion-row>\n      <ion-list>\n        <ion-item-sliding *ngFor="let item of activityRecommendations; let i = index">\n          <ion-item>\n            <ion-row style="display: flex;\n            flex-direction: row;\n            justify-content: space-around;">\n              <ion-col col-lg-9 col-md-10 col-sm-10 col-xs-10>\n                {{item.Exercise}}\n              </ion-col>\n              <ion-col style="text-align: right" col-lg-3 col-md-2 col-sm-2 col-xs-2>\n                {{item.DurationInMins}}\n              </ion-col>\n            </ion-row>\n          </ion-item>\n          <ion-item-options side="right">\n            <button (click)="logActivity(i)" ion-button color="primary">\n              <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n              Accept \n            </button>\n          </ion-item-options>\n          <!-- <ion-item-options side="left">\n              <button ion-button color="danger">\n              <ion-icon name="ios-close-outline"></ion-icon>\n              Reject\n            </button>\n            </ion-item-options> -->\n\n        </ion-item-sliding>\n      </ion-list>\n    </div>\n\n\n\n    <!-- Data From Clarifia API -->\n    <div *ngIf="pageToRender == \'ClarifaiPage\'">\n        <ion-row style="display: flex;justify-content: space-around">\n        <ion-col col-lg-8 col-md-10 col-sm-10 col-xs-10>Food Name</ion-col>\n        <ion-col style="text-align: right" col-lg-4 col-md-2 col-sm-2 col-xs-2>Likelihood</ion-col>\n      </ion-row>\n      <ion-list>\n        <ion-item-sliding *ngFor="let item of clarifiaData|slice:0:5">\n          <ion-item>\n            <ion-row class="clarifiaData">\n              <ion-col col-lg-8 col-md-6 col-sm-6 col-xs-6>\n                {{item.name}}\n              </ion-col>\n              <ion-col style="text-align: right" col-lg-4 col-md-6 col-sm-6 col-xs-6>\n                {{item.value * 100 | number : \'1.2-2\'}}%\n              </ion-col>\n            </ion-row>\n          </ion-item>\n          <ion-item-options side="right">\n            <button (click)="sendToFitbit(item.name)" ion-button color="primary">\n                <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n                Accept \n              </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n    </div>\n\n\n\n\n\n\n    <!-- <div class="buttonDiv"><button ion-button >Close</button></div> -->\n\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\modal\modal.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _e || Object])
    ], ModalPage);
    return ModalPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl) {
        this.navCtrl = navCtrl;
        localStorage.clear();
    }
    WelcomePage.prototype.login = function () {
        window.location.href = "https://josh-chatbot.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=s965hf7ebf9hfv35013ga0mnn&redirect_uri=https://s3.amazonaws.com/fitbook.josh/index.html";
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-welcome',template:/*ion-inline-start:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\welcome\welcome.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n        <ion-icon><img style="max-width: 50px; vertical-align: middle;" src="https://s3.amazonaws.com/fitbook.josh/assets/imgs/logo1.jpg"></ion-icon>\n\n        FitBook - Recipes For Fitness</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    \n\n    <ion-card>\n\n  <img src="https://s3.amazonaws.com/fitbook.josh/assets/imgs/fitness.png">\n\n  <ion-card-content>\n\n    <ion-card-title>\n\n      Welcome to FitBook\n\n      </ion-card-title>\n\n    <p style="margin-bottom: 5%">\n\n      Your personal fitness trainer. Smarter, faster and mobile, without the expensive nagging & glare. Let\'s see what we can do for you.\n\n    </p>\n\n      <button (click)="login()" ion-button secondary >Get Started</button>\n\n  </ion-card-content>\n\n</ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\welcome\welcome.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object])
    ], WelcomePage);
    return WelcomePage;
    var _a;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_api__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, httpReq) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpReq = httpReq;
        this.preferAlcohol = false;
        this.isLactoseIntolerant = false;
        this.isDiabetic = false;
        this.isVegetarian = false;
        this.preferIndoor = false;
        this.preferOutdoor = false;
        this.userProfile = {};
        this.fitbitAccessToken = '';
        this.fitbitUserId = '';
        this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
        this.userName = this.userProfile.userName;
        this.userAge = this.userProfile.userAge;
        this.userGender = this.userProfile.userGender;
        this.userHeight = this.userProfile.userHeight;
        this.userWeight = parseInt(this.userProfile.userWeight);
        this.userWeightGoal = this.userProfile.userWeightGoal;
        this.isDiabetic = this.userProfile.isDiabetic;
        this.isLactoseIntolerant = this.userProfile.isLactoseIntolerant;
        this.isVegetarian = this.userProfile.isVegetarian;
        this.preferAlcohol = this.userProfile.preferAlcohol;
        this.preferOutdoor = this.userProfile.preferOutdoor;
        this.preferIndoor = this.userProfile.preferIndoor;
        this.exerciseType = this.userProfile.exerciseType;
        this.endDate = this.userProfile.endDate;
        this.fitbitAccessToken = localStorage.getItem('fitbitAccessToken');
        this.fitbitUserId = localStorage.getItem('fitbitUserId');
    }
    ProfilePage.prototype.saveFitbitProfile = function () {
        console.log(this.endDate);
        this.userProfile['userWeight'] = this.userWeight;
        this.userProfile['userHeight'] = this.userHeight;
        this.userProfile['isVegetarian'] = (this.isVegetarian ? 1 : 0);
        this.userProfile['isDiabetic'] = this.isDiabetic ? 1 : 0;
        this.userProfile['isLactoseIntolerant'] = this.isLactoseIntolerant ? 1 : 0;
        this.userProfile['preferAlcohol'] = this.preferAlcohol ? 1 : 0;
        this.userProfile['userWeightGoal'] = this.userWeightGoal;
        this.userProfile['userAge'] = this.userAge;
        this.userProfile['userGender'] = this.userGender;
        this.userProfile['preferOutdoor'] = this.preferOutdoor ? 1 : 0;
        this.userProfile['preferIndoor'] = this.preferIndoor ? 1 : 0;
        this.userProfile['exerciseType'] = this.exerciseType;
        if (this.endDate == undefined) {
            this.userProfile['userGoalDurationDays'] = 1;
        }
        else {
            var userGoalDurationDays = this.dateDiff(this.parseDate(this.endDate), new Date());
            this.userProfile['userGoalDurationDays'] = userGoalDurationDays + 1;
        }
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
        console.log(this.userProfile);
        var reDirectUrl = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22DF2W&redirect_uri=https://s3.amazonaws.com/fitbook.josh/index.html&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800&state=fitbit&prompt=login";
        window.location.href = reDirectUrl;
        //this.navCtrl.setRoot(HomePage, {userProfile: this.userProfile })
    };
    ProfilePage.prototype.saveProfile = function () {
        this.userProfile['userWeight'] = this.userWeight;
        this.userProfile['userHeight'] = this.userHeight;
        this.userProfile['isVegetarian'] = this.isVegetarian ? 1 : 0;
        this.userProfile['isDiabetic'] = this.isDiabetic ? 1 : 0;
        this.userProfile['isLactoseIntolerant'] = this.isLactoseIntolerant ? 1 : 0;
        this.userProfile['preferAlcohol'] = this.preferAlcohol ? 1 : 0;
        this.userProfile['userWeightGoal'] = this.userWeightGoal;
        this.userProfile['userAge'] = this.userAge;
        this.userProfile['userGender'] = this.userGender;
        this.userProfile['preferOutdoor'] = this.preferOutdoor ? 1 : 0;
        this.userProfile['preferIndoor'] = this.preferIndoor ? 1 : 0;
        this.userProfile['exerciseType'] = this.exerciseType;
        if (this.endDate == undefined) {
            this.userProfile['userGoalDurationDays'] = 1;
        }
        else {
            var userGoalDurationDays = this.dateDiff(this.parseDate(this.endDate), new Date());
            this.userProfile['userGoalDurationDays'] = userGoalDurationDays + 1;
        }
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
        this.pushToDb(this.fitbitAccessToken, this.fitbitUserId, "update");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { userProfile: this.userProfile });
    };
    ProfilePage.prototype.pushToDb = function (access_token, fitbitUserId, requestType) {
        var userProfile = JSON.parse(localStorage.getItem("userProfile"));
        userProfile["fitbitAccessToken"] = access_token;
        userProfile["fitbitUserID"] = fitbitUserId;
        var cognitoStorageObj = JSON.parse(localStorage.getItem("cognitoStorageObj"));
        userProfile["cognitoAccessToken"] = cognitoStorageObj["access_token"];
        userProfile["cognitoRefreshToken"] = cognitoStorageObj["refresh_token"];
        userProfile["cognitoIDToken"] = cognitoStorageObj["id_token"];
        var dbObj = {};
        dbObj["requestType"] = requestType;
        dbObj["data"] = userProfile;
        this.httpReq.pushUserProfile(dbObj).subscribe(function (data) {
            console.log("Pushing to DB POST Request is successful ", data);
            localStorage.setItem('calorieInPerDay', data["response"]["calorieInPerDay"]);
            localStorage.setItem('calorieOutPerDay', data["response"]["calorieOutPerDay"]);
            localStorage.setItem('calorieBreakfast', data["response"]["calorieBreakfast"]);
            localStorage.setItem('calorieLunch', data["response"]["calorieLunch"]);
            localStorage.setItem('calorieSnacks', data["response"]["calorieSnacks"]);
            localStorage.setItem('calorieDinner', data["response"]["calorieDinner"]);
        }, function (error) {
            console.log(error);
            console.log("Error in pushing to DB");
            //this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token)    
        });
    };
    ProfilePage.prototype.parseDate = function (str) {
        var mdy = str.split('-');
        return new Date(mdy[0], mdy[1] - 1, mdy[2]);
    };
    ProfilePage.prototype.dateDiff = function (second, first) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\profile\profile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n      <button [hidden]="userHeight==undefined" ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    <ion-title>\n\n        Profile</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-card>\n\n  <ion-card-header>\n\n    Set BMI\n\n  </ion-card-header>\n\n  <ion-card-content>\n\n   <ion-list>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Username</ion-label>\n\n    <ion-input disabled="true" [(ngModel)]="userName" type="text"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Height (cm)</ion-label>\n\n    <ion-input [(ngModel)]="userHeight" type="number"></ion-input>\n\n  </ion-item>\n\n\n\n       <ion-item>\n\n    <ion-label floating>Weight (kgs) </ion-label>\n\n    <ion-input [(ngModel)]="userWeight" type="number"></ion-input>\n\n  </ion-item>\n\n       \n\n       <ion-item>\n\n    <ion-label floating>Age </ion-label>\n\n    <ion-input [(ngModel)]="userAge" type="number"></ion-input>\n\n  </ion-item>\n\n       \n\n       <ion-item>\n\n    <ion-label>Gender</ion-label>\n\n  <ion-select [(ngModel)]="userGender">\n\n    <ion-option value="F">Female</ion-option>\n\n    <ion-option value="M">Male</ion-option>\n\n  </ion-select>\n\n  </ion-item>\n\n\n\n</ion-list>\n\n</ion-card-content>\n\n</ion-card>\n\n    \n\n    <ion-card>\n\n  <ion-card-header>\n\n    Set Preferences\n\n  </ion-card-header>\n\n  <ion-card-content>\n\n        <ion-item>\n\n  <ion-label>Only Vegetarian</ion-label>\n\n  <ion-checkbox [(ngModel)]="isVegetarian" color="secondary"></ion-checkbox>\n\n</ion-item>\n\n\n\n<ion-item>\n\n  <ion-label>Diabetic</ion-label>\n\n  <ion-checkbox [(ngModel)]="isDiabetic" color="secondary"></ion-checkbox>\n\n</ion-item>\n\n      <ion-item>\n\n  <ion-label>Lactose</ion-label>\n\n  <ion-checkbox [(ngModel)]="isLactoseIntolerant" color="secondary"></ion-checkbox>\n\n</ion-item>\n\n      <ion-item>\n\n  <ion-label>Alcohol</ion-label>\n\n  <ion-checkbox [(ngModel)]="preferAlcohol" color="secondary" ></ion-checkbox>\n\n</ion-item>\n\n      <ion-item>\n\n  <ion-label>Indoor Activities & Gym</ion-label>\n\n  <ion-checkbox [(ngModel)]="preferIndoor" color="secondary" ></ion-checkbox>\n\n</ion-item>\n\n      <ion-item>\n\n  <ion-label>Outdoor Activities</ion-label>\n\n  <ion-checkbox [(ngModel)]="preferOutdoor" color="secondary" ></ion-checkbox>\n\n</ion-item>\n\n      \n\n      <ion-item>\n\n    <ion-label>Workout Intensity</ion-label>\n\n  <ion-select [(ngModel)]="exerciseType">\n\n    <ion-option value="L">Light</ion-option>\n\n    <ion-option value="M">Moderate</ion-option>\n\n      <ion-option value="H">Heavy</ion-option>\n\n  </ion-select>\n\n  </ion-item>\n\n  </ion-card-content>\n\n</ion-card>\n\n    \n\n      <ion-card>\n\n  <ion-card-header>\n\n    Set Goal\n\n  </ion-card-header>\n\n  <ion-card-content>\n\n    <ion-list>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Goal Weight (kgs)</ion-label>\n\n    <ion-input [(ngModel)]="userWeightGoal" type="number"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n  <ion-label floating>By Date</ion-label>\n\n  <ion-datetime displayFormat="MM/DD/YYYY" min="2018-12-21" max="2020-10-31" [(ngModel)]="endDate"></ion-datetime>\n\n</ion-item>\n\n\n\n</ion-list>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n\n<button [disabled]="fitbitAccessToken" full (click)="saveFitbitProfile()" ion-button color="secondary">SYNC FITBIT AND SAVE</button>\n\n<button [disabled]="!fitbitAccessToken" full (click)="saveProfile()" ion-button color="secondary">UPDATE</button>\n\n    \n\n    \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\profile\profile.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiCall */]],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiCall */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiCall */]) === "function" && _c || Object])
    ], ProfilePage);
    return ProfilePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 138;

/***/ }),

/***/ 179:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 179;

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadFood; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_modal__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import {RoundProgressModule} from 'angular-svg-round-progressbar';

var Clarifai = __webpack_require__(443);
var UploadFood = /** @class */ (function () {
    function UploadFood(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.dataList = [
            { Title: 'Add Snack', imgPath: 'https://s3.amazonaws.com/fitbook.josh/assets/imgs/snacks.svg' },
            { Title: 'Add Breakfast', imgPath: 'https://s3.amazonaws.com/fitbook.josh/assets/imgs/breakfast.svg' },
            { Title: 'Add Lunch', imgPath: 'https://s3.amazonaws.com/fitbook.josh/assets/imgs/lunch.svg' },
            { Title: 'Add Dinner', imgPath: 'https://s3.amazonaws.com/fitbook.josh/assets/imgs/dinner.svg' },
        ];
    }
    UploadFood.prototype.openModal = function (pageName, apiData) {
        console.log("in modal fun");
        var data = { message: pageName, apiData: apiData };
        var modalPage = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modal_modal__["a" /* ModalPage */], data);
        modalPage.present();
    };
    UploadFood.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        var base64textString = btoa(binaryString);
        console.log(base64textString);
        // Hit thorugh SDK
        var app = new Clarifai.App({
            apiKey: '0e9eea46b9f24d2ab44bd627d2340e47'
        });
        app.models.predict(Clarifai.FOOD_MODEL, { base64: base64textString }).then(this.callClarifaiModal.bind(this));
    };
    UploadFood.prototype.callClarifaiModal = function (response) {
        var apiData = response.outputs[0].data.concepts;
        console.log(apiData);
        console.log("in clarifai modal");
        this.openModal('ClarifaiPage', apiData);
    };
    UploadFood.prototype.onFileChange = function (event) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
        if (this.selectedFile != undefined) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(this.selectedFile);
        }
    };
    UploadFood = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-uploadPic',template:/*ion-inline-start:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\uploadFood\uploadFood.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Upload Food </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card style="border-radius: 15px;" *ngFor="let item of dataList">\n    <ion-list>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src={{item.imgPath}}>\n        </ion-avatar>\n        <h2 style="padding-top: 25px">{{item.Title}}</h2>\n        <ion-icon name="ios-camera-outline" (click)="file.click()" item-end></ion-icon>\n        <input type="file" (change)="onFileChange($event)" #file class="hideFileUploader">\n        <ion-icon name="ios-add-circle-outline" item-end (click)="openModal(\'UploadFoodPage\')"></ion-icon>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>\n<!-- \n<ion-item>\n    <label class="labelContainer"><ion-icon name="ios-camera-outline" (click)="onClick()" item-end></ion-icon></label>\n    <input type="file" (change)="fileUpload($event)" class="file-input" style="opacity: 0" #fileInp>\n  </ion-item> -->'/*ion-inline-end:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\uploadFood\uploadFood.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _b || Object])
    ], UploadFood);
    return UploadFood;
    var _a, _b;
}());

//# sourceMappingURL=uploadFood.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Statistics; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import {RoundProgressModule} from 'angular-svg-round-progressbar';
// import * as HighCharts from 'highcharts';
var Statistics = /** @class */ (function () {
    function Statistics(navCtrl, httpReq) {
        this.navCtrl = navCtrl;
        this.httpReq = httpReq;
        this.lineChartLabels = [];
        this.lineChartData = [];
        this.dataList = [
            { Title: 'Calories Burnt Today', maxValue: parseInt(localStorage.getItem('calorieOutPerDay')), currentValue: parseInt(JSON.parse(localStorage.getItem('liveStats'))['caloriesOut']) },
            { Title: 'Calories Consumed Today', maxValue: parseInt(localStorage.getItem('calorieInPerDay')), currentValue: parseInt(localStorage.getItem('foodStats')) },
        ];
        //  public lineChartData:Array<any> = [
        //    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        //    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        //    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
        //  ];
        //public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.getWeekData();
    }
    Statistics.prototype.getWeekData = function () {
        var _this = this;
        var today = new Date();
        var year = today.getFullYear();
        var month = (today.getMonth() + 1).toString();
        var dt = today.getDate().toString();
        if (parseInt(dt) < 10) {
            dt = '0' + dt;
        }
        if (parseInt(month) < 10) {
            month = '0' + month;
        }
        var dtString = year + '-' + month + '-' + dt;
        var weekUrl = "https://api.fitbit.com/1/user/" + localStorage.getItem('fitbitUserId') + "/activities/calories/date/" + dtString + "/7d.json";
        this.httpReq.fitbitGetActivity(weekUrl, "Bearer " + localStorage.getItem('fitbitAccessToken')).subscribe(function (data) {
            console.log("Fitbit Week activity Request is successful ", data);
            var chartValues = [];
            for (var i = 0; i < data["activities-calories"].length; i++) {
                chartValues.push(parseInt(data["activities-calories"][i]['value']));
                _this.lineChartLabels.push(data["activities-calories"][i]['dateTime']);
            }
            _this.lineChartData.push({ data: chartValues, label: 'Calories Burnt' });
            console.log(_this.lineChartData);
            console.log(_this.lineChartLabels);
        }, function (error) {
            console.log(error);
            console.log("Error in Fitbit search query");
            //this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token)    
        });
    };
    // public randomize():void {
    //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    //   for (let i = 0; i < this.lineChartData.length; i++) {
    //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //     }
    //   }
    //   this.lineChartData = _lineChartData;
    // }
    // events
    Statistics.prototype.chartClicked = function (e) {
        console.log(e);
    };
    Statistics.prototype.chartHovered = function (e) {
        console.log(e);
    };
    Statistics = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-statistics',
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */]],template:/*ion-inline-start:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\statistics\statistics.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Statistic Page</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div *ngIf="lineChartLabels.length==7" class="mainContainer">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-lg-6>\n          <canvas baseChart [datasets]="lineChartData" [labels]="lineChartLabels" [options]="lineChartOptions" [colors]="lineChartColors" [legend]="lineChartLegend" [chartType]="lineChartType" (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n        </ion-col>\n        <ion-col offset-lg-2 offset-md-2 col-lg-4>\n          <ion-card class="rightContainer">\n            <div class="MainTitleCss">Track Your Progress</div>\n            <div class="progress-wrapper" *ngFor="let item of dataList">\n              <div class="progress">\n                {{item.currentValue / item.maxValue * 100 | number}}%\n              </div>\n              <round-progress [color]="\'#32CD32\'" [responsive]="false" [radius]="80" [animationDelay]="100" [current]=item.currentValue [max]=item.maxValue [rounded]="true" [animation]="\'easeInOutQuart\'" [duration]="1500" [background]="\'#eaeaea\'"></round-progress>\n              <div class="titleCss">{{item.Title}}</div>\n            </div>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\statistics\statistics.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */]) === "function" && _b || Object])
    ], Statistics);
    return Statistics;
    var _a, _b;
}());

//# sourceMappingURL=statistics.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(387);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_uploadFood_uploadFood__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_statistics_statistics__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_modal_modal__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_api_api__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular_svg_round_progressbar__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular_svg_round_progressbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_angular_svg_round_progressbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_charts__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular_star_rating__ = __webpack_require__(523);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_uploadFood_uploadFood__["a" /* UploadFood */],
                __WEBPACK_IMPORTED_MODULE_7__pages_statistics_statistics__["a" /* Statistics */],
                __WEBPACK_IMPORTED_MODULE_9__pages_modal_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_14_angular_svg_round_progressbar__["RoundProgressModule"],
                __WEBPACK_IMPORTED_MODULE_15_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_16_angular_star_rating__["a" /* StarRatingModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_uploadFood_uploadFood__["a" /* UploadFood */],
                __WEBPACK_IMPORTED_MODULE_7__pages_statistics_statistics__["a" /* Statistics */],
                __WEBPACK_IMPORTED_MODULE_9__pages_modal_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__providers_api_api__["a" /* ApiCall */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_uploadFood_uploadFood__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_statistics_statistics__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        this.pageTitle = 'Home';
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */] },
            { title: 'Upload Food', component: __WEBPACK_IMPORTED_MODULE_4__pages_uploadFood_uploadFood__["a" /* UploadFood */] },
            { title: 'Stats', component: __WEBPACK_IMPORTED_MODULE_5__pages_statistics_statistics__["a" /* Statistics */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome__["a" /* WelcomePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        console.log(page);
        this.pageTitle = page.title;
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.checkPage = function (page) {
        if (this.pageTitle == page) {
            return false;
        }
        return true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\app\app.html"*/'<ion-menu [hidden]="!checkPage(\'Logout\')" [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav  [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 242,
	"./af.js": 242,
	"./ar": 243,
	"./ar-dz": 244,
	"./ar-dz.js": 244,
	"./ar-kw": 245,
	"./ar-kw.js": 245,
	"./ar-ly": 246,
	"./ar-ly.js": 246,
	"./ar-ma": 247,
	"./ar-ma.js": 247,
	"./ar-sa": 248,
	"./ar-sa.js": 248,
	"./ar-tn": 249,
	"./ar-tn.js": 249,
	"./ar.js": 243,
	"./az": 250,
	"./az.js": 250,
	"./be": 251,
	"./be.js": 251,
	"./bg": 252,
	"./bg.js": 252,
	"./bm": 253,
	"./bm.js": 253,
	"./bn": 254,
	"./bn.js": 254,
	"./bo": 255,
	"./bo.js": 255,
	"./br": 256,
	"./br.js": 256,
	"./bs": 257,
	"./bs.js": 257,
	"./ca": 258,
	"./ca.js": 258,
	"./cs": 259,
	"./cs.js": 259,
	"./cv": 260,
	"./cv.js": 260,
	"./cy": 261,
	"./cy.js": 261,
	"./da": 262,
	"./da.js": 262,
	"./de": 263,
	"./de-at": 264,
	"./de-at.js": 264,
	"./de-ch": 265,
	"./de-ch.js": 265,
	"./de.js": 263,
	"./dv": 266,
	"./dv.js": 266,
	"./el": 267,
	"./el.js": 267,
	"./en-au": 268,
	"./en-au.js": 268,
	"./en-ca": 269,
	"./en-ca.js": 269,
	"./en-gb": 270,
	"./en-gb.js": 270,
	"./en-ie": 271,
	"./en-ie.js": 271,
	"./en-il": 272,
	"./en-il.js": 272,
	"./en-nz": 273,
	"./en-nz.js": 273,
	"./eo": 274,
	"./eo.js": 274,
	"./es": 275,
	"./es-do": 276,
	"./es-do.js": 276,
	"./es-us": 277,
	"./es-us.js": 277,
	"./es.js": 275,
	"./et": 278,
	"./et.js": 278,
	"./eu": 279,
	"./eu.js": 279,
	"./fa": 280,
	"./fa.js": 280,
	"./fi": 281,
	"./fi.js": 281,
	"./fo": 282,
	"./fo.js": 282,
	"./fr": 283,
	"./fr-ca": 284,
	"./fr-ca.js": 284,
	"./fr-ch": 285,
	"./fr-ch.js": 285,
	"./fr.js": 283,
	"./fy": 286,
	"./fy.js": 286,
	"./gd": 287,
	"./gd.js": 287,
	"./gl": 288,
	"./gl.js": 288,
	"./gom-latn": 289,
	"./gom-latn.js": 289,
	"./gu": 290,
	"./gu.js": 290,
	"./he": 291,
	"./he.js": 291,
	"./hi": 292,
	"./hi.js": 292,
	"./hr": 293,
	"./hr.js": 293,
	"./hu": 294,
	"./hu.js": 294,
	"./hy-am": 295,
	"./hy-am.js": 295,
	"./id": 296,
	"./id.js": 296,
	"./is": 297,
	"./is.js": 297,
	"./it": 298,
	"./it.js": 298,
	"./ja": 299,
	"./ja.js": 299,
	"./jv": 300,
	"./jv.js": 300,
	"./ka": 301,
	"./ka.js": 301,
	"./kk": 302,
	"./kk.js": 302,
	"./km": 303,
	"./km.js": 303,
	"./kn": 304,
	"./kn.js": 304,
	"./ko": 305,
	"./ko.js": 305,
	"./ku": 306,
	"./ku.js": 306,
	"./ky": 307,
	"./ky.js": 307,
	"./lb": 308,
	"./lb.js": 308,
	"./lo": 309,
	"./lo.js": 309,
	"./lt": 310,
	"./lt.js": 310,
	"./lv": 311,
	"./lv.js": 311,
	"./me": 312,
	"./me.js": 312,
	"./mi": 313,
	"./mi.js": 313,
	"./mk": 314,
	"./mk.js": 314,
	"./ml": 315,
	"./ml.js": 315,
	"./mn": 316,
	"./mn.js": 316,
	"./mr": 317,
	"./mr.js": 317,
	"./ms": 318,
	"./ms-my": 319,
	"./ms-my.js": 319,
	"./ms.js": 318,
	"./mt": 320,
	"./mt.js": 320,
	"./my": 321,
	"./my.js": 321,
	"./nb": 322,
	"./nb.js": 322,
	"./ne": 323,
	"./ne.js": 323,
	"./nl": 324,
	"./nl-be": 325,
	"./nl-be.js": 325,
	"./nl.js": 324,
	"./nn": 326,
	"./nn.js": 326,
	"./pa-in": 327,
	"./pa-in.js": 327,
	"./pl": 328,
	"./pl.js": 328,
	"./pt": 329,
	"./pt-br": 330,
	"./pt-br.js": 330,
	"./pt.js": 329,
	"./ro": 331,
	"./ro.js": 331,
	"./ru": 332,
	"./ru.js": 332,
	"./sd": 333,
	"./sd.js": 333,
	"./se": 334,
	"./se.js": 334,
	"./si": 335,
	"./si.js": 335,
	"./sk": 336,
	"./sk.js": 336,
	"./sl": 337,
	"./sl.js": 337,
	"./sq": 338,
	"./sq.js": 338,
	"./sr": 339,
	"./sr-cyrl": 340,
	"./sr-cyrl.js": 340,
	"./sr.js": 339,
	"./ss": 341,
	"./ss.js": 341,
	"./sv": 342,
	"./sv.js": 342,
	"./sw": 343,
	"./sw.js": 343,
	"./ta": 344,
	"./ta.js": 344,
	"./te": 345,
	"./te.js": 345,
	"./tet": 346,
	"./tet.js": 346,
	"./tg": 347,
	"./tg.js": 347,
	"./th": 348,
	"./th.js": 348,
	"./tl-ph": 349,
	"./tl-ph.js": 349,
	"./tlh": 350,
	"./tlh.js": 350,
	"./tr": 351,
	"./tr.js": 351,
	"./tzl": 352,
	"./tzl.js": 352,
	"./tzm": 353,
	"./tzm-latn": 354,
	"./tzm-latn.js": 354,
	"./tzm.js": 353,
	"./ug-cn": 355,
	"./ug-cn.js": 355,
	"./uk": 356,
	"./uk.js": 356,
	"./ur": 357,
	"./ur.js": 357,
	"./uz": 358,
	"./uz-latn": 359,
	"./uz-latn.js": 359,
	"./uz.js": 358,
	"./vi": 360,
	"./vi.js": 360,
	"./x-pseudo": 361,
	"./x-pseudo.js": 361,
	"./yo": 362,
	"./yo.js": 362,
	"./zh-cn": 363,
	"./zh-cn.js": 363,
	"./zh-hk": 364,
	"./zh-hk.js": 364,
	"./zh-tw": 365,
	"./zh-tw.js": 365
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 504;

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiCall; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiCall = /** @class */ (function () {
    function ApiCall(http) {
        this.http = http;
        this.appid = "";
        this.rooturl = "https://64q0oh6zui.execute-api.us-east-1.amazonaws.com/testv1/";
        this.http = http;
    }
    ApiCall.prototype.getUserProfile = function (term) {
        var url = this.rooturl + "getUserInfo?userName=" + term;
        //headers.append('Authorization', 'Basic '+ btoa(this.appid + ':' + this.appid));
        return this.http.get(url);
    };
    ApiCall.prototype.getRecommendation = function (payload) {
        var url = this.rooturl + "getUserRecommendation";
        var headers = {
            "content-type": "application/json",
        };
        return this.http.post(url, payload, { headers: headers });
    };
    ApiCall.prototype.getFitnessRecommendation = function (payload) {
        var url = this.rooturl + "getFitnessRecommendation";
        var headers = {
            "content-type": "application/json",
        };
        return this.http.post(url, payload, { headers: headers });
    };
    ApiCall.prototype.updateRatings = function (payload) {
        var url = this.rooturl + "updateRatings";
        var headers = {
            "content-type": "application/json",
        };
        return this.http.post(url, payload, { headers: headers });
    };
    ApiCall.prototype.cognitoGetAuth = function (url, payload, base64Encoded) {
        var headers = {
            "authorization": base64Encoded,
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
        };
        return this.http.post(url, payload, { headers: headers });
    };
    ApiCall.prototype.getUserInfo = function (url, accessToken) {
        var headers = {
            "authorization": accessToken,
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
        };
        return this.http.get(url, { headers: headers });
    };
    ApiCall.prototype.fitbitGetActivity = function (url, access_token) {
        var headers = {
            "authorization": access_token,
            "content-type": "application/x-www-form-urlencoded"
        };
        return this.http.get(url, { headers: headers });
    };
    ApiCall.prototype.fitbitLogFood = function (url, payload, access_token) {
        var headers = {
            "authorization": access_token,
            "content-type": "application/x-www-form-urlencoded"
        };
        return this.http.post(url, payload, { headers: headers });
    };
    //To database
    ApiCall.prototype.pushUserProfile = function (profile) {
        var url = this.rooturl + "updateUserInfo";
        var headers = {
            "content-type": "application/json",
        };
        return this.http.post(url, profile, { headers: headers });
    };
    ApiCall.prototype.fallbackApi = function (payload) {
        var url = this.rooturl + "getEFRecommendation";
        var headers = {
            "content-type": "application/json",
        };
        return this.http.post(url, payload, { headers: headers });
    };
    ApiCall = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
    ], ApiCall);
    return ApiCall;
    var _a;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__uploadFood_uploadFood__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modal_modal__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, httpReq, navParams, modalCtrl, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.httpReq = httpReq;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.authUrl = "https://josh-chatbot.auth.us-east-1.amazoncognito.com/";
        this.redirectUrl = "https://s3.amazonaws.com/fitbook.josh/index.html";
        //redirectUrl = "https://127.0.0.1:8101"
        this.clientId = "s965hf7ebf9hfv35013ga0mnn";
        this.base64EncodedApp = "czk2NWhmN2ViZjloZnYzNTAxM2dhMG1ubjoxa2huNzdrMTdpZzVuNmczamR2cHRyZzZzYjcxOWJnYWcwdDM3Mzc1ajV0amQ2cTc0bGQ1";
        this.fitbitClientId = "22DF2W";
        this.fitbitClientSecret = "9393abaebf2bb453950d8dcc02c27f8d";
        this.fitbitAuthUrl = "https://www.fitbit.com/oauth2/token";
        this.fitbitBase64 = "MjJERjJXOjkzOTNhYmFlYmYyYmI0NTM5NTBkOGRjYzAyYzI3Zjhk";
        this.dataList = [
            { TaskCompleted: 50, Target: 100, Text: "Calories Burnt", Img: "md-flame" },
            { TaskCompleted: 55, Target: 100, Text: "Calories Consumed", Img: "md-pizza" },
            { TaskCompleted: 70, Target: 10000, Text: "Steps", Img: "ios-walk-outline" },
            { TaskCompleted: 40, Target: 60, Text: "Minutes", Img: "ios-bicycle-outline" },
        ];
        this.CardList = [
            { id: "foodModal", Name: "Recommend Food", ImgPath: "https://s3.amazonaws.com/fitbook.josh/assets/imgs/food.png", functionName: 'foodModal()' },
            { id: "activityModal", Name: "Recommend Activity", ImgPath: "https://s3.amazonaws.com/fitbook.josh/assets/imgs/workout.png", functionName: 'activityModal()' },
        ];
        this.profileKeys = ["userName", "userGender", "userAge", "isVegetarian", "isDiabetic", "isLactoseIntolerant", "preferAlcohol", "preferIndoor", "preferOutdoor", "userWeight", "userWeightGoal", "userHeight", "userGoalDurationDays", "exerciseType"];
        this.userProfile = navParams.get('userProfile');
        console.log(this.userProfile);
    }
    HomePage.prototype.ionViewDidLoad = function () {
        // Put here the code you want to execute
        var token = this.getTokenFromUrl();
        if (token != undefined) {
            localStorage.setItem('fitbitAccessToken', token[0]);
            localStorage.setItem('fitbitUserId', token[1]);
            this.pushToDb(token[0], token[1], "insert");
            this.fitbitAuthentication(token[0], token[1]);
        }
        else {
            if (this.userProfile == undefined) {
                this.cognitoAuthentication();
            }
        }
        this.dataList[0]["Target"] = parseInt(localStorage.getItem('calorieOutPerDay'));
        this.dataList[1]["Target"] = parseInt(localStorage.getItem('calorieInPerDay'));
        var liveStats = JSON.parse(localStorage.getItem("liveStats"));
        this.dataList[1]["TaskCompleted"] = parseInt(localStorage.getItem('foodStats') ? localStorage.getItem('foodStats') : '0');
        if (liveStats != {} && liveStats != undefined) {
            this.dataList[0]["TaskCompleted"] = parseInt(liveStats["caloriesOut"]);
            this.dataList[2]["TaskCompleted"] = parseInt(liveStats["steps"]);
            this.dataList[3]["TaskCompleted"] = parseInt(liveStats["minutes"]);
        }
    };
    HomePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 5000,
            position: "middle",
            showCloseButton: true
        });
        toast.present();
    };
    //Merge Code v2
    HomePage.prototype.openModal = function (modalName, meal) {
        var _this = this;
        if (modalName == "foodModal") {
            var recType = "food";
            var mealType = meal;
        }
        else {
            var recType = "exercise";
        }
        var setProfile = JSON.parse(localStorage.getItem("userProfile"));
        console.log(setProfile);
        setProfile["fitbitAccessToken"] = localStorage.getItem("fitbitAccessToken");
        setProfile["fitbitUserID"] = localStorage.getItem("fitbitUserId");
        var cognitoStorageObj = JSON.parse(localStorage.getItem("cognitoStorageObj"));
        setProfile["cognitoAccessToken"] = cognitoStorageObj["access_token"];
        setProfile["cognitoRefreshToken"] = cognitoStorageObj["refresh_token"];
        setProfile["cognitoIDToken"] = cognitoStorageObj["id_token"];
        setProfile["recommendationType"] = recType;
        setProfile["mealType"] = mealType;
        setProfile["userID"] = parseInt(localStorage.getItem('userID'));
        setProfile["calorieDinner"] = parseInt(localStorage.getItem('calorieDinner'));
        setProfile["calorieBreakfast"] = parseInt(localStorage.getItem('calorieBreakfast'));
        setProfile["calorieLunch"] = parseInt(localStorage.getItem('calorieLunch'));
        setProfile["calorieSnacks"] = parseInt(localStorage.getItem('calorieSnacks'));
        setProfile["calorieOutPerDay"] = parseInt(localStorage.getItem('calorieOutPerDay'));
        console.log(setProfile);
        if (modalName == "foodModal") {
            this.httpReq.getRecommendation(setProfile).subscribe(function (data) {
                console.log("Got recommendation response from AWS API gateway", data);
                //'errorMessage' in data
                if ('errorMessage' in data) {
                    _this.callFallApi(modalName, setProfile);
                }
                else if (data['statusCode'] == 400) {
                    _this.presentToast("Im sorry. Looks like we have no recommendations that matches your requirements. But we are always learning.");
                }
                else {
                    var mData = { message: modalName, recData: data["body"] };
                    var modalPage = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modal_modal__["a" /* ModalPage */], mData);
                    modalPage.present();
                }
            }, function (error) {
                console.log(error);
                console.log("Error in get user info");
                _this.presentToast("Im sorry. We are facing some technical difficulties. But we are always learning. Try again later.");
            });
        }
        else {
            this.httpReq.getFitnessRecommendation(setProfile).subscribe(function (data) {
                console.log("Got recommendation response from AWS API gateway", data);
                if ('errorMessage' in data) {
                    _this.callFallApi(modalName, setProfile);
                }
                else if (data['statusCode'] == 400) {
                    _this.presentToast("Im sorry. Looks like we have no recommendations that matches your requirements. But we are always learning.");
                }
                else {
                    var fData = { message: modalName, recData: data["response"] };
                    var modalPage = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modal_modal__["a" /* ModalPage */], fData);
                    modalPage.present();
                }
            }, function (error) {
                console.log(error);
                console.log("Error in get user info");
                _this.presentToast("Im sorry. We are facing some technical difficulties. But we are always learning. Try again later.");
            });
        }
    };
    HomePage.prototype.callFallApi = function (modalName, data) {
        var _this = this;
        this.httpReq.fallbackApi(data).subscribe(function (data) {
            console.log("Got recommendation response from EC2 gateway", data);
            if ('errorMessage' in data) {
                //this.callFallApi(setProfile)
                _this.presentToast("Im sorry. We are facing some technical difficulties. But we are always learning. Try again later.");
            }
            else {
                var mData = { message: modalName, recData: data["body"] };
                var modalPage = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modal_modal__["a" /* ModalPage */], mData);
                modalPage.present();
            }
        }, function (error) {
            console.log(error);
            console.log("Error in get user info");
            _this.presentToast("Im sorry. We are facing some technical difficulties. But we are always learning. Try again later.");
        });
    };
    HomePage.prototype.showRadio = function (recType) {
        var _this = this;
        console.log(recType);
        if (recType == 'activityModal') {
            this.openModal(recType, "");
            return;
        }
        var alert = this.alertCtrl.create();
        alert.setTitle('Choose Meal');
        alert.addInput({
            type: 'radio',
            label: 'Breakfast',
            value: 'breakfast',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'Lunch',
            value: 'lunch',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Dinner',
            value: 'dinner',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Snacks',
            value: 'snacks',
            checked: false
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.openModal("foodModal", data);
            }
        });
        alert.present();
    };
    HomePage.prototype.goToUploadPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__uploadFood_uploadFood__["a" /* UploadFood */]);
    };
    // End merge
    HomePage.prototype.getTokenFromUrl = function () {
        var hash = window.location.hash;
        console.log(hash);
        if (hash != undefined && hash != '') {
            return [hash.split('&')[0].split('=')[1], hash.split('&')[1].split('=')[1]];
        }
        else
            return undefined;
    };
    HomePage.prototype.cognitoAuthentication = function () {
        var _this = this;
        //Cognito implementation
        var urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get('code');
        var id_token = "";
        var access_token = "";
        var expriry = "";
        var refresh_token = "";
        console.log(code);
        if (code == null) {
            console.log("No Code");
            var cognitoStorageObj = JSON.parse(localStorage.getItem('cognitoStorageObj'));
            console.log(cognitoStorageObj);
            if (cognitoStorageObj) {
                this.getUserInfo(cognitoStorageObj.access_token);
            }
            else {
                //window.location.href = authUrl + "login?response_type=code&client_id="+clientId+"&redirect_uri="+redirectUrl;
                //this.router.navigate(WelcomePage);
                console.log("No local Storage and no code");
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a" /* WelcomePage */]);
            }
        }
        else {
            var payload = "grant_type=authorization_code&client_id=" + this.clientId + "&code=" + code + "&redirect_uri=" + this.redirectUrl;
            this.httpReq.cognitoGetAuth(this.authUrl + "oauth2/token", payload, 'Basic ' + this.base64EncodedApp).subscribe(function (data) {
                console.log("Cognito Auth POST Request is successful ", data);
                id_token = data["id_token"];
                access_token = data["access_token"];
                expriry = data["expires_in"];
                refresh_token = data["refresh_token"];
                console.log(access_token);
                _this.getUserInfo(access_token);
                var cognitoStorageObj = {
                    'access_token': access_token,
                    'id_token': id_token,
                    'expriry': expriry,
                    'refresh_token': refresh_token
                };
                localStorage.setItem('cognitoStorageObj', JSON.stringify(cognitoStorageObj));
                if (id_token) {
                    _this.invokeIDPool(id_token, false);
                }
            }, function (error) {
                console.log(error);
                console.log("Error in get cognito access token auth");
                var cognitoStorageObj = JSON.parse(localStorage.getItem('cognitoStorageObj'));
                console.log(cognitoStorageObj);
                if (cognitoStorageObj) {
                    _this.getUserInfo(cognitoStorageObj.access_token);
                    if (cognitoStorageObj.id_token) {
                        _this.invokeIDPool(cognitoStorageObj.id_token, false);
                    }
                }
                else {
                    alert("Error: " + error.message + ". Please sign in again.");
                    window.location.href = _this.authUrl + "login?response_type=code&client_id=" + _this.clientId + "&redirect_uri=" + _this.redirectUrl;
                }
            });
        }
    };
    //cognitoAuthentication()
    HomePage.prototype.getUserInfo = function (accessToken) {
        var _this = this;
        this.httpReq.getUserInfo(this.authUrl + "oauth2/userInfo", 'Bearer ' + accessToken).subscribe(function (data) {
            console.log("Cognito User Info GET Request is successful ", data);
            localStorage.setItem('userName', data["username"]);
            _this.invokeIDPool(JSON.parse(localStorage.getItem('cognitoStorageObj')).id_token, false);
        }, function (error) {
            console.log(error);
            console.log("Error in get user info");
            _this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token);
        });
    };
    HomePage.prototype.invokeIDPool = function (id_token, param) {
        var _this = this;
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:d902e3ef-efb4-4be2-8cb8-2105051492c1',
            Logins: {
                // Change the key below according to the specific region your user pool is in.
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_Xids0dr14': id_token
            }
        });
        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        AWS.config.credentials.refresh(function (error) {
            if (error) {
                console.error(error);
            }
            else {
                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
                console.log('Successfully AWS logged!');
                AWS.config.credentials.get(_this.saveCredentials.bind(_this));
            }
        });
    };
    HomePage.prototype.saveCredentials = function () {
        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
        var expired = AWS.config.credentials.expired;
        var expiryTime = AWS.config.credentials.expireTime;
        console.log(accessKeyId);
        var AWSStorageObj = {
            'accessKeyId': accessKeyId,
            'secretAccessKey': secretAccessKey,
            'sessionToken': sessionToken,
            'expiryTime': expiryTime
        };
        localStorage.setItem('AWSStorageObj', JSON.stringify(AWSStorageObj));
        this.fetchUserDetails();
    };
    HomePage.prototype.refreshCredentials = function (refreshToken) {
        var _this = this;
        var payload = "grant_type=refresh_token&client_id=" + this.clientId + "&refresh_token=" + refreshToken + "&redirect_uri=" + this.redirectUrl;
        this.httpReq.cognitoGetAuth(this.authUrl + "oauth2/token", payload, 'Basic ' + this.base64EncodedApp).subscribe(function (data) {
            console.log("Cognito Refresh POST Request is successful ", data);
            var id_token = data["id_token"];
            var access_token = data["access_token"];
            var expriry = data["expires_in"];
            var refresh_token = data["refresh_token"];
            _this.getUserInfo(access_token);
            var cognitoStorageObj = {
                'access_token': access_token,
                'id_token': id_token,
                'expriry': expriry,
                'refresh_token': refresh_token
            };
            localStorage.setItem('cognitoStorageObj', JSON.stringify(cognitoStorageObj));
            if (id_token) {
                _this.invokeIDPool(id_token, false);
            }
        }, function (error) {
            console.log(error);
            console.log("Error in getting refresh token");
            alert("Error: " + error.message + ". Please sign in again.");
            window.location.href = _this.authUrl + "login?response_type=code&client_id=" + _this.clientId + "&redirect_uri=" + _this.redirectUrl;
        });
    };
    HomePage.prototype.fetchUserDetails = function () {
        var _this = this;
        this.httpReq.getUserProfile(localStorage.getItem('userName')).subscribe(function (data) {
            console.log("Got getUserInfo response from AWS API gateway", data);
            var response = data["response"];
            if (Object.keys(response).length > 0) {
                localStorage.setItem('userID', data["response"]["userID"]);
                localStorage.setItem('calorieInPerDay', data["response"]["calorieInPerDay"]);
                localStorage.setItem('calorieOutPerDay', data["response"]["calorieOutPerDay"]);
                localStorage.setItem('calorieBreakfast', data["response"]["calorieBreakfast"]);
                localStorage.setItem('calorieLunch', data["response"]["calorieLunch"]);
                localStorage.setItem('calorieSnacks', data["response"]["calorieSnacks"]);
                localStorage.setItem('calorieDinner', data["response"]["calorieDinner"]);
                localStorage.setItem('fitbitAccessToken', data["response"]["fitbitAccessToken"]);
                localStorage.setItem('fitbitUserId', data["response"]["fitbitUserID"]);
                var userProfileObj = {};
                for (var i = 0; i < _this.profileKeys.length; i++) {
                    userProfileObj[_this.profileKeys[i]] = data["response"][_this.profileKeys[i]];
                }
                console.log(userProfileObj);
                localStorage.setItem('userProfile', JSON.stringify(userProfileObj));
            }
            _this.gotToProfilePage();
        }, function (error) {
            console.log(error);
            console.log("Error in get user info");
        });
    };
    HomePage.prototype.gotToProfilePage = function () {
        if (localStorage.getItem('userProfile') == undefined || localStorage.getItem('userProfile') == {}) {
            this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
            var initializer = {};
            initializer["userName"] = localStorage.getItem('userName');
            initializer["userGender"] = '';
            initializer["isDiabetic"] = 0;
            initializer["isLactoseIntolerant"] = 0;
            initializer["isVegetarian"] = 0;
            initializer["preferAlcohol"] = 0;
            initializer["preferOutdoor"] = 0;
            initializer["preferIndoor"] = 0;
            initializer["exerciseType"] = '';
            localStorage.setItem('userProfile', JSON.stringify(initializer));
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */], { userProfile: { 'userName': localStorage.getItem('userName') } });
        }
        else {
            this.loadDashboard();
        }
    };
    HomePage.prototype.loadDashboard = function () {
        console.log(localStorage.getItem("fitbitAccessToken"), localStorage.getItem("fitbitUserId"));
        this.fitbitAuthentication(localStorage.getItem("fitbitAccessToken"), localStorage.getItem("fitbitUserId"));
        console.log(this.dataList);
    };
    HomePage.prototype.fitbitAuthentication = function (access_token, fitbitUserId) {
        var _this = this;
        var today = new Date();
        var year = today.getFullYear();
        var month = (today.getMonth() + 1).toString();
        var dt = today.getDate().toString();
        if (parseInt(dt) < 10) {
            dt = '0' + dt;
        }
        if (parseInt(month) < 10) {
            month = '0' + month;
        }
        var dtString = year + '-' + month + '-' + dt;
        //var payload = "client_id="+this.fitbitClientId+"&grant_type=authorization_code&redirect_uri="+this.redirectUrl+"&code="+code
        var url = "https://api.fitbit.com/1/user/" + fitbitUserId + "/activities/date/" + dtString + ".json";
        console.log(url);
        this.httpReq.fitbitGetActivity(url, "Bearer " + access_token).subscribe(function (data) {
            console.log("Fitbit Get Actitvity Request is successful ", data);
            var dataJson = data['summary'];
            var obj = new Object();
            obj["steps"] = dataJson['steps'];
            obj["caloriesOut"] = dataJson['caloriesOut'];
            obj["minutes"] = dataJson['fairlyActiveMinutes'] + dataJson['lightlyActiveMinutes'] + dataJson['veryActiveMinutes'];
            console.log(obj);
            localStorage.setItem('liveStats', JSON.stringify(obj));
            _this.dataList[0]["TaskCompleted"] = obj["caloriesOut"];
            _this.dataList[2]["TaskCompleted"] = obj["steps"];
            _this.dataList[3]["TaskCompleted"] = obj["minutes"];
        }, function (error) {
            console.log(error);
            console.log("Error in Fitbit get access token");
            //this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token)    
        });
        var foodUrl = "https://api.fitbit.com/1/user/" + fitbitUserId + "/foods/log/date/" + dtString + ".json";
        this.httpReq.fitbitGetActivity(foodUrl, "Bearer " + access_token).subscribe(function (data) {
            console.log("Fitbit Get Food Request is successful ", data);
            var dataJson = data['summary'];
            var obj = new Object();
            obj["caloriesIn"] = dataJson['calories'];
            obj["water"] = dataJson['water'];
            console.log(obj);
            localStorage.setItem('foodStats', obj["caloriesIn"]);
            _this.dataList[1]["TaskCompleted"] = obj["caloriesIn"];
        }, function (error) {
            console.log(error);
            console.log("Error in Fitbit get access tokennnnn");
            //this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token)    
        });
    };
    HomePage.prototype.pushToDb = function (access_token, fitbitUserId, requestType) {
        var _this = this;
        var setProfile = JSON.parse(localStorage.getItem("userProfile"));
        console.log(setProfile);
        setProfile["fitbitAccessToken"] = access_token;
        setProfile["fitbitUserID"] = fitbitUserId;
        var cognitoStorageObj = JSON.parse(localStorage.getItem("cognitoStorageObj"));
        setProfile["cognitoAccessToken"] = cognitoStorageObj["access_token"];
        setProfile["cognitoRefreshToken"] = cognitoStorageObj["refresh_token"];
        setProfile["cognitoIDToken"] = cognitoStorageObj["id_token"];
        var dbObj = {};
        dbObj["requestType"] = requestType;
        dbObj["data"] = setProfile;
        console.log(dbObj);
        this.httpReq.pushUserProfile(dbObj).subscribe(function (data) {
            console.log("Pushing to DB POST Request is successful ", data);
            localStorage.setItem('calorieInPerDay', data["response"]["calorieInPerDay"]);
            localStorage.setItem('calorieOutPerDay', data["response"]["calorieOutPerDay"]);
            localStorage.setItem('calorieBreakfast', data["response"]["calorieBreakfast"]);
            localStorage.setItem('calorieLunch', data["response"]["calorieLunch"]);
            localStorage.setItem('calorieSnacks', data["response"]["calorieSnacks"]);
            localStorage.setItem('calorieDinner', data["response"]["calorieDinner"]);
            _this.dataList[0]["Target"] = parseInt(localStorage.getItem('calorieOutPerDay'));
            _this.dataList[1]["Target"] = parseInt(localStorage.getItem('calorieInPerDay'));
        }, function (error) {
            console.log(error);
            console.log("Error in pushing to DB");
            //this.refreshCredentials(JSON.parse(localStorage.getItem('cognitoStorageObj')).refresh_token)    
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */]],template:/*ion-inline-start:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    <ion-title>Dashboard</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-row>\n\n    <ion-card style="border-radius: 20px">\n\n      <ion-card-header>\n\n        Todays Activity\n\n      </ion-card-header>\n\n      <ion-card-content>\n\n        <ion-row>\n\n          <ion-col>\n\n            <div class="progress-wrapper" *ngFor="let item of dataList">\n\n              <div class="progress">\n\n                <ion-icon name={{item.Img}}></ion-icon>\n\n              </div>\n\n              <round-progress [semicircle]="true" [color]="\'#32CD32\'" [responsive]="false" [radius]="80" [animationDelay]="100" [current]=item.TaskCompleted [max]=item.Target [rounded]="true" [animation]="\'easeInOutQuart\'" [duration]="1500" [background]="\'#eaeaea\'"></round-progress>\n\n              <div class="titleCss">{{item.TaskCompleted +\' \'+ item.Text}}</div>\n\n            </div>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-card-content>\n\n    </ion-card>\n\n  </ion-row>\n\n  <div>\n\n    <ion-row>\n\n      <ion-card *ngFor="let item of CardList">\n\n        <div class="cardContainer" (click)="showRadio(item.id)">\n\n          <img class="imgCss" src={{item.ImgPath}} />\n\n          <ion-card-content>\n\n            <p class="titleCss">\n\n              {{item.Name}}\n\n            </p>\n\n          </ion-card-content>\n\n        </div>\n\n\n\n      </ion-card>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <div>\n\n    <ion-row>\n\n      <ion-card (click)="goToUploadPage()">\n\n        <div class="cardContainer">\n\n          <img class="imgCss" src="https://s3.amazonaws.com/fitbook.josh/assets/imgs/log.png" />\n\n          <input type="file" class="hideFileUploader" #file>\n\n          <ion-card-content>\n\n            <p class="titleCss">\n\n              Log Food\n\n            </p>\n\n          </ion-card-content>\n\n        </div>\n\n\n\n      </ion-card>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <!-- <ion-icon name="ios-camera-outline" (click)="file.click()" item-end></ion-icon> -->\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Joshua\Documents\NYU\Fall18\CC\project\Github\CloudProjectFrontEnd\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiCall */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]) === "function" && _f || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[366]);
//# sourceMappingURL=main.js.map
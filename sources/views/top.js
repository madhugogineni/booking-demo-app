import { JetView } from "webix-jet";
import FlightSelectorView from "views/flightselector";
import AllFlightsView from "views/allflights";
import LanguagesPopup from "views/lang";
import NotificationsPopup from "views/notifications";

export default class TopView extends JetView {
    config() {
        console.log(window.innerWidth);
        const _ = this.app.getService("locale")._;
        var theme = this.app.config.theme;
        if (theme == "") {
            theme = "light-theme"
        }
        var stylesheets = document.styleSheets;
        console.log(stylesheets);
        if (theme == "light-theme") {
            console.log(theme);
            stylesheets[2].disabled = true;
            stylesheets[3].disabled = false;

            stylesheets[5].disabled = true;
            stylesheets[6].disabled = true;
            stylesheets[7].disabled = true;
            stylesheets[8].disabled = false;
            stylesheets[9].disabled = false;
            stylesheets[10].disabled = false;


        } else if (theme == "dark-theme") {
            console.log(theme);
            stylesheets[2].disabled = false;
            stylesheets[3].disabled = true;

            stylesheets[5].disabled = false;
            stylesheets[6].disabled = false;
            stylesheets[7].disabled = false;
            stylesheets[8].disabled = true;
            stylesheets[9].disabled = true;
            stylesheets[10].disabled = true;
        }
        //var theme = "light-theme";{ email: "madhu.chaitanya@riktamtech.com", password: "234234!" }


        var credentials = {
            email: "madhu.chaitanya@riktamtech.com",
            password: "234234!"
        };
        var inputData = {
            list_id: 75441650,
            view_id: 11
        };
        // webix.storage.cookie.put("_tigerlists", "9d8kmf7av45mfqq3pk17fpbft7");


        //     fetch("http://riktam.tigersheet.com/login/validate-login?email=madhu.chaitanya@riktamtech.com&password=234234!",{
        // method: "GET",
        // headers: new Headers({
        //     "Cookie": "_tigerlists=
        // var temp = webix.ajax()
        // .headers({
        // "Access-Control-Allow-Headers": "*"
        //     "Content-type": "application/json",
        //     "Set-Cookie": "_tigerlists=9d8kmf7av45mfqq3pk17fpbft7"
        // })
        // .post("http://riktam.tigersheet.com/views/get-view-data", { view_id: 11, list_id: 75441650 }, function(text, data, XmlHttpRequest) { //?view_id=11&list_id=75441650
        //     console.log(text);
        //     console.log("data");
        //     console.log(data);
        //     console.log("XmlHttpRequest");
        //     console.log(XmlHttpRequest);
        //     return data.json();
        // });
        // var temp1 = webix.ajax().get("http://riktam.tigersheet.com/login/validate-login?email=madhu.chaitanya@riktamtech.com&password=234234!", function(text, data) {
        //     console.log(data.json());
        //     return data.json();
        // });

        // var temp = fetch("http://riktam.tigersheet.com/login/validate-login?email=madhu.chaitanya@riktamtech.com&password=234234!", {
        //     method: 'GET',
        //     // mode: "cors",
        //     // headers: new Headers({
        //     // 'Access-Control-Allow-Origin': 'http://localhost:8080/#!/top/',
        //     //     //     'Access-Control-Allow-Credentials': true
        //     // }),
        //     // mode: "no-cors",
        //     // credentials: 'include',

        // }).then(function(response) {
        //     return response.json();
        // }).then(function(response1) {
        //     console.log(response1);
        // }).then(function() {

        //?view_id=11&list_id=75441650
        fetch("http://riktam.tigersheet.com/views/get-view-data?view_id=11&list_id=75441650", {
            method: 'GET',
            //     mode: "no-cors",
            //     headers: new Headers({
            //         "cookie": "_tigerlists=odh0lar67ip3265jr5e3r538f3",
            //         'Content-Type': 'application/json',
            //         "Access-Control-Request-Headers": "*",
            //         "Access-Control-Request-Method": "*"
            //     }),
        }).then(function(dataResponse) {
            console.log(dataResponse);
            // return dataResponse.json();
        }).catch(function() {
            console.log(arguments)
        });

        // });
        return {
            view: "scrollview",
            id: "parentDiv",
            width: window.innerWidth,
            height: window.innerHeight,
            scrollX: true,
            scrollY: true,
            body: {
                css: theme,
                rows: [{
                        view: "toolbar",
                        height: 70,
                        localId: "toolbar",
                        css: " header",
                        elements: [{
                                paddingY: 7,
                                rows: [{
                                    margin: 8,
                                    cols: [{
                                            view: "label",
                                            template: "Webix Booking App",
                                            width: 310

                                        },
                                        {
                                            view: "tabbar",
                                            id: "mainTabbar",
                                            value: "Flights",
                                            width: 400,
                                            bottomOffset: 1,
                                            options: [
                                                { id: "Dashboard", value: "Dashboard <br> <div class='dashboard'>●</div>" },
                                                { id: "Flights", value: "Flights <br> <div class='flights'>●</div>" },
                                                { id: "Hotels", value: "Hotels <br> <div class='hotels'>●</div>" },
                                                { id: "Cars", value: "Cars <br> <div class='cars'>●</div>" }
                                            ],
                                            css: "custom-tabbar",
                                            on: {
                                                onAfterTabClick: function() {
                                                    console.log($$("mainTabbar").getValue());

                                                }
                                            }

                                        },
                                        {
                                            // width: 990
                                            fillspace: true
                                        },
                                        {
                                            view: "icon",
                                            icon: "mdi mdi-invert-colors",
                                            tooltip: _("Click to change the theme"),
                                            color: theme,
                                            click: function() {
                                                let color = this.config.color;
                                                console.log(color);
                                                if (color == "light-theme") {
                                                    color = "dark-theme";
                                                } else if (color == "dark-theme") {
                                                    color = "light-theme";
                                                }

                                                //color = !color ? "dark-theme" : "";
                                                //console.log("after swapping = "+color);
                                                webix.storage.local.put("theme_color", color);
                                                this.$scope.app.config.theme = color;
                                                //console.log(this.$scope.app.config.theme);
                                                this.$scope.app.refresh();
                                            }
                                        },
                                        {
                                            view: "icon",
                                            icon: "mdi mdi-bell",
                                            localId: "bell",
                                            badge: 3,
                                            tooltip: _("Latest notifications"),
                                            click: function() {
                                                this.$scope.notifications.showPopup(this.$view);
                                            },
                                            css: "blue-badge"
                                        },
                                        {
                                            view: "icon",
                                            icon: "mdi mdi-earth",
                                            tooltip: _("Change the language"),
                                            click: function() {
                                                this.$scope.languages.showPopup(this.$view);
                                            }
                                        }
                                    ]
                                }]
                            },
                            { width: 6 }
                        ]
                    },
                    {
                        type: "space",
                        cols: [{
                                rows: [
                                    FlightSelectorView,
                                    {}
                                ],
                                css: "left-padding",
                                // gravity: 0.17
                                width: 330
                            },
                            {
                                rows: [
                                    AllFlightsView,
                                ],
                                gravity: 0.81
                                    // width: 1490
                            },
                            {
                                rows: [
                                    {}
                                ],
                                gravity: 0.02
                            }

                            // AllFlightsView
                            // width: 1490,
                        ],
                    }
                ],
            }
        };
    }
    init() {
        this.languages = this.ui(LanguagesPopup);
        this.notifications = this.ui(NotificationsPopup);

        this.on(this.app, "read:notifications", () => {
            this.$$("bell").config.badge = 0;
            this.$$("bell").refresh();

            setTimeout(() => {
                if (this.app) {
                    this.$$("bell").config.badge += 1;
                    this.$$("bell").refresh();
                    this.app.callEvent("new:notification");
                }
            }, 10000);
        });
        // window.onresize = doALoadOfStuff;

        webix.event(window, "resize", function() {
            var datatableHeight = window.innerHeight - 172;
            if (datatableHeight < 700) {
                datatableHeight = 700 - 152;
            }
            console.log("--------------------------------------------" + datatableHeight);
            $$("parentDiv").define("width", window.innerWidth);
            $$("parentDiv").define("height", window.innerHeight);
            $$("datatable").define("height", datatableHeight);
            $$("parentDiv").resize();
            $$("datatable").resize();
        })
    }
}


// function doALoadOfStuff() {
//     $$("parentDiv").define("width", window.innerWidth);
//     $$("parentDiv").resize();
// }
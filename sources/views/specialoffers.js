import { JetView } from "webix-jet";
import { getOffers } from "models/offers";
// import "../styles/specialoffers.css";
function custom_checkbox(obj, common, value) {
    if (value)
        return "<img class='webix_table_checkbox' src='/images/checkbox-intermediate.png'/>";
    else
        return "<img class='webix_table_checkbox' src='/images/custom-checkbox.png'/>";
};
window.datatableurl = "http://3/16.182.173:3000/filter";
export default class SpecialOffersView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        var datatableHeight = window.innerHeight - 172; //813, 953 , 783 = 0
        if (datatableHeight < 700) {
            datatableHeight = 700 - 152;
        }
        console.log("--------------------------------------------------" + datatableHeight);
        var popup = {
            view: "window",
            id: "headerMenu",
            height: 250,
            width: 300,
            body: {
                view: "list",
                data: [
                    { id: "welcome", value: "Welcome" },
                    { id: "welcome1", value: "Welcome1" }
                ]
            },
            position: "center"
        };
        var datatable = {
            rows: [{
                view: "datatable",
                localId: "datatable",
                id: "datatable",
                dragColumn: true,
                // select: true,
                editable: true,
                checkboxRefresh: true,
                scrollX: true,
                ready: this.initListeners,
                height: datatableHeight,
                css: "special-offers",
                // autowidth: true,
                columns: [{
                        id: "checkboxes",
                        header: ["<i class='fas fa-search align-center top-padding-3'></i>", ""],
                        width: 100,
                        gravity: 0.3,
                        sort: "int",
                        // template: function(obj) {
                        //     if (obj.check) {
                        //         return "<img class='clickable' src='/images/checkbox-intermediate.png'/>";
                        //     } else {
                        //         return "<img class='clickable' src='/images/custom-checkbox.png'/>";
                        //     }
                        // },
                        template: custom_checkbox,
                        css: "align-center",
                    },
                    {
                        id: "direction",
                        header: [{ text: "Direction", css: "sorting-dialog" }, { content: "serverFilter", placeholder: "Search" }],
                        minWidth: 400,
                        fillspace: true
                    },
                    {
                        id: "date",
                        header: [_("Date"), {
                            content: "textFilter",
                            placeholder: "Search",

                        }],
                        width: 200,
                        format: webix.i18n.longDateFormatStr,
                        css: "date-column",
                    },
                    {
                        id: "price",
                        header: [_("Price"), { content: "serverFilter", placeholder: "Search" }],
                        width: 200,
                        format: webix.i18n.priceFormat,
                        css: "price-column",
                    },
                    {
                        id: "save",
                        header: [_("Save"), { content: "serverFilter", placeholder: "Search" }],
                        width: 150,
                        format: webix.i18n.priceFormat,
                    },
                    {
                        id: "places",
                        header: [_("Tickets"),
                            {
                                content: "serverFilter",
                                placeholder: "Search"
                            }
                        ],
                        sort: "server",
                        width: 150
                    },
                    {
                        id: "status",
                        header: [_("Status"), { content: "serverFilter", placeholder: "Search" }],
                        adjust: "data",
                        css: "status-column",
                        template: obj => {
                            let st = "";
                            if (obj.status === "Open")
                                st = "open";
                            else
                                st = (obj.status === "Last deals") ? "last" : "soon";
                            return `<span class="status ${st}">&#9679;&nbsp;&nbsp;${_(obj.status)}</span>`;
                        },
                        width: 150
                    },
                ],
                onClick: {
                    "clickable": function(ev, id, target) {
                        console.log(id);
                    }
                },
                on: {
                    onResize(w) {
                        if (w < 940 && this.getColumnIndex("time") !== -1 && this.getColumnIndex("places") !== -1) {
                            this.hideColumn("time");
                            this.hideColumn("places");
                        } else if (w >= 940 && this.getColumnIndex("time") === -1 && this.getColumnIndex("places") === -1) {
                            this.showColumn("time");
                            this.showColumn("places");
                        }
                        if (w < 743 && this.getColumnIndex("save") !== -1) {
                            this.hideColumn("save");
                        } else if (w >= 743 && this.getColumnIndex("save") === -1) {
                            this.showColumn("save");
                        }
                    },
                    onHeaderClick: function(id, e, node) {
                        console.log(id);
                        console.log(e);
                        console.log(node);
                        console.log(popup);
                        console.log($$("headerMenu").isVisible());
                        var columnHeaderId = id;
                        var sortString = "",
                            filterString = "";
                        // $$("datable").filter();
                        webix.ui({
                            view: "popup",
                            id: "headerMenu",
                            height: 150,
                            width: 120,
                            // head: "Sort Options",
                            body: {
                                view: "list",
                                data: [
                                    { id: "asc", value: "Sort A-Z" },
                                    { id: "desc", value: "Sort Z-A" }
                                ],
                                on: {
                                    onItemClick: function(id) {
                                        console.log(id);
                                        var directionFilter = $$("datatable").getFilter("direction").value;
                                        var dateFilter = $$("datatable").getFilter("date").value;
                                        var priceFilter = $$("datatable").getFilter("price").value;
                                        var saveFilter = $$("datatable").getFilter("save").value;
                                        var placesFilter = $$("datatable").getFilter("places").value;
                                        // console.log("palcesFIlter = " + placesFilter);
                                        sortString = "?sort[" + columnHeaderId.column + "]=" + id;
                                        filterString = "&filter[direction]=" + directionFilter + "&filter[date]=" + dateFilter + "&filter[price]=" + priceFilter + "&filter[save]=" + saveFilter + "&filter[places]=" + placesFilter;
                                        $$("datatable").clearAll();
                                        // console.log("http://3.16.182.173:3000/filter" + sortString + filterString);
                                        webix.ajax().get("http://3.16.182.173:3000/filter" + sortString + filterString, function(result) {
                                            // console.log(result);
                                            $$("datatable").parse(result, "json");
                                        });
                                        $$("datatable").data.url = "http://3.16.182.173:3000/filter" + sortString;
                                        window.datatableurl = "http://3.16.182.173:3000/filter" + sortString;
                                        console.log($$("datatable").data.url);
                                        // $$("datatable").load("http://3.16.182.173:3000/filter" + sortString + filterString);
                                        this.hide();
                                    }
                                }
                            }
                        }).show(node);
                    },
                    onBeforeFilter: function(id, value, config) {
                        console.log("welcome");
                        console.log(id);
                        console.log(value);
                        console.log(config);
                    },
                    onCheck: function() {
                        console.log("We;come");
                    },
                },
                url: "http://3.16.182.173:3000/filter"
            }, { fillspace: true }]
        };

        var temp = {
            rows: [datatable, popup],
            // gravity: 0.7
        }
        return temp;
    }

    initListeners(params) {
        webix.event($$("datatable").getFilter("date"), "click", function(e) {
            webix.ui({
                view: "window",
                id: "calendarPopup",
                position: "center",
                width: 300,
                height: 300,
                head: "Calendar View",
                body: {
                    view: "calendar",
                    events: webix.Date.isHoliday,
                    weekHeader: true,
                    on: {
                        onDateSelect: function(date) {
                            var temp = "";
                            temp += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                            console.log(temp);
                            $$("datatable").getFilter("date").value = temp;
                            $$("datatable").clearAll();
                            $$("datatable").load("http://3.16.182.173:3000/filter?filter[date]=" + temp);
                            $$("datatable").data.url = window.datatableurl;
                            this.hide();
                        }
                    }
                }
            }).show();
        });
    }

    init() {
        const grid = this.$$("datatable");
        this.on(this.app, "sort:clicked", function(temp) {
            console.log(temp);
            console.log(grid.getFilter("direction").value);
            grid.clearAll();
            grid.load("http://3.16.182.173:3000/filter?sort[direction]=desc");
        });
        this.on(this.app, "search:flight", (from, to, date) => {
            grid.hideOverlay();
            if (from || to || date)
                grid.filter(obj => {
                    const data_from = from ? obj.direction.indexOf(from) : 0;
                    const data_to = to ? obj.direction.indexOf(to) : 100;
                    const date_f = date ? obj.date.toString().slice(0, 14) === date.toString().slice(0, 14) : 1;
                    return data_from !== -1 && data_to !== -1 && data_from < data_to && date_f;
                });
            else
                grid.filtedater();
            if (griddate === 0)
                grid.showOverlay("Sorry, there are no flights for this route");
        });
    }
}
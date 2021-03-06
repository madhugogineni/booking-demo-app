import {JetView} from "webix-jet";
import {getOffers} from "models/offers";

export default class RegularOffersView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        return {
            rows: [
                {
                    view: "datatable",
                    localId: "all:flights",
                    select: true,
                    columns: [
                        {id: "id", header: "#", width: 40, sort: "int"},
                        {id: "no", header: [_("Number"),{content: "textFilter"}], fillspace: 1, sort: "string"},
                        {
                            id: "direction",
                            header: [_("Direction"), {content: "textFilter"}],
                            fillspace: 3,
                            sort: "string"
                        },
                        {
                            id: "date", header: [_("Date"), {content: "textFilter"}], fillspace: 2, sort: "date",
                            format: webix.i18n.longDateFormatStr
                        },
                        {id: "deptime", header: [_("Departs"), {content: "textFilter"}], fillspace: 1},
                        {id: "arrtime", header: [_("Arrives"), {content: "textFilter"}], fillspace: 1},
                        {
                            id: "comments",
                            header: [_("Comments"), {content: "textFilter"}],
                            adjust: "width",
                            sort: "string",
                            template: obj => {
                                if (obj.comments === 1)
                                    return `<span class="status ontime">&#9679;&nbsp;&nbsp;${_("On Time")}</span>`;
                                else
                                    return `<span class="status landed">&#9679;&nbsp;&nbsp;${_("Landed")}</span>`;
                            }
                        }
                    ]
                }
            ]
        };
    }

    init() {
        const grid = this.$$("all:flights");
        grid.sync(getOffers());

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
                grid.filter();
            if (grid.count() === 0)
                grid.showOverlay("Sorry, there are no flights for this route");
        });
    }
}

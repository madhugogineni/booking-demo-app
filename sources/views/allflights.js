import { JetView, plugins } from "webix-jet";
// import "../styles/allflights.css";
export default class AllFlightsView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        const theme = this.app.config.theme;

        return {
            rows: [{
                view: "toolbar",
                localId: "toolbar",
                css: theme + " flights-toolbar",
                cols: [{
                        view: "label",
                        template: _("Flights<i class='fas fa-plane-departure left-padding'></i>"),
                        fillspace: true,
                        css: "toolbar-label"
                    },
                    {
                        view: "segmented",
                        localId: "offers",
                        width: 300,
                        options: [
                            { id: "specialoffers", value: _("OFFERS") },
                            { id: "regularoffers", value: _("REGULAR") },
                            { id: "flightinfo", value: _("INFO") }
                        ]
                    },
                    { width: 6 }
                ]
            }, { $subview: true }],
        };
    }
    init() {
        this.use(plugins.Menu, "offers");
    }
}
import { JetView } from "webix-jet";
import SearchingFlight from "views/searchingflight";
import Hotels from "views/hotels";
import Cars from "views/cars";
import Registration from "views/registration";
export default class FlightSelectorView extends JetView {
    config() {
        const _ = this.app.getService("locale")._;
        const theme = this.app.config.theme;

        return {
            multi: false,
            margin: 1,
            css: theme + " leftnavbar",
            height: 700,
            rows: [{
                    header: _("<i class='fas fa-plane'></i> Look for a Flight"),
                    body: SearchingFlight,
                    css: "rounded-corners"
                },
                {
                    header: _("<i class='fab fa-dyalog margin-5'></i>Hotels"),
                    collapsed: true,
                    body: Hotels
                },
                {
                    header: _("<i class='fas fa-car margin-5'></i>Cars"),
                    collapsed: true,
                    body: Cars
                },
                {
                    header: _("<i class='far fa-flushed margin-5'></i>Register"),
                    css: "registration",
                    collapsed: true,
                    body: Registration
                }
            ]
        };
    }
}
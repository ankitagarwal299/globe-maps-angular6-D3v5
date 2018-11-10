import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";

import {Router} from '@angular/router';

import * as d3 from "d3";
import * as topojson from "topojson";

import { default as ajpac } from "./AJPAC";
import { default as capitals } from "./capitals";

@Component({
  selector: "app-apac",
  templateUrl: "./apac.component.html",
  styleUrls: ["./apac.component.scss"],
  encapsulation: ViewEncapsulation.None 
  
})
export class APACComponent implements OnInit {
  // Reference chart variable inside Component
  @ViewChild("chart")
  chartElement: ElementRef;

  constructor(private router : Router) { }

  ngOnInit() {
    this.buildChart();
  }

  buildChart() {
  let hongKong =
  {"type":"Feature","properties":{"type":"Sovereign country","geounit":"Hong Kong"},"geometry":{"type":"Polygon","coordinates":[[[114.13318634033203,22.288461076609813],[114.14108276367188,22.291002427735325],[114.14726257324219,22.290367094285866],[114.1537857055664,22.288143404470272],[114.16168212890625,22.28687270869273],[114.16683197021484,22.28337823574864],[114.17095184326172,22.282742867647574],[114.1815948486328,22.284966643369362],[114.18365478515625,22.283060552059016],[114.18914794921874,22.285602001364676],[114.19086456298828,22.289414088696724],[114.19429779052734,22.29259074872355],[114.20185089111328,22.295132024757425],[114.20597076416016,22.294496710081507],[114.2138671875,22.291637758296712],[114.21764373779297,22.289414088696724],[114.22348022460938,22.28687270869273],[114.22416687011719,22.2843312824866],[114.22554016113281,22.27956598383525],[114.23206329345703,22.272576585413475],[114.23343658447266,22.266222283797788],[114.22931671142578,22.259867693629854],[114.22554016113281,22.26177410097435],[114.22622680664062,22.257961260321512],[114.22863006591797,22.25573705531537],[114.22725677490233,22.251606295132948],[114.2245101928711,22.24747541310042],[114.2190170288086,22.245886579877173],[114.21009063720703,22.24747541310042],[114.20082092285156,22.238895499613232],[114.1915512084961,22.23698878081858],[114.18811798095702,22.240484412123447],[114.18743133544922,22.244933271292847],[114.18537139892578,22.245886579877173],[114.17953491210938,22.244933271292847],[114.1750717163086,22.238895499613232],[114.17232513427734,22.23063286414865],[114.16614532470703,22.233175265402785],[114.1644287109375,22.238577714949102],[114.1640853881836,22.244933271292847],[114.15962219238281,22.246522115329117],[114.158935546875,22.243979956221004],[114.1476058959961,22.249381989178495],[114.13902282714844,22.249064228301147],[114.13387298583983,22.250970782750866],[114.13078308105469,22.255101561680632],[114.12769317626953,22.260820900547685],[114.12460327148438,22.267810886256022],[114.12185668945312,22.2722588771868],[114.11705017089844,22.27607132828315],[114.1204833984375,22.28337823574864],[114.13043975830078,22.28687270869273],[114.13318634033203,22.288461076609813]]]}};

  let hongkong2= {"type":"Feature","properties":{"type":"Sovereign country","geounit":"Hong kong"},"geometry":{"type":"Polygon","coordinates":[[[114.15515899658203,22.31704861179864],[114.1592788696289,22.31704861179864],[114.16030883789062,22.30783771160823],[114.15721893310545,22.303073214469702],[114.1537857055664,22.303073214469702],[114.15412902832031,22.298626203841597],[114.15721893310545,22.297990905053133],[114.16030883789062,22.30021443817393],[114.16648864746094,22.300849726851165],[114.16820526123047,22.295132024757425],[114.1702651977539,22.29290841075506],[114.17369842529295,22.29290841075506],[114.17610168457031,22.295132024757425],[114.17987823486328,22.29926149974121],[114.1864013671875,22.299579146607684],[114.19292449951172,22.302755575548254],[114.19292449951172,22.30783771160823],[114.19120788574219,22.310061087979612],[114.19532775878906,22.32054224254707],[114.18914794921874,22.32721165838893],[114.17747497558594,22.327846824223613],[114.16339874267578,22.325306143534565],[114.15584564208984,22.32085984100593],[114.15515899658203,22.31704861179864]]]}};

    var margin = { top: 10, left: 0, right: 0, bottom: 0 },
      height = 800 - margin.top - margin.bottom,
      width = 1250 - margin.left - margin.right;

    var svg = d3
      .select(this.chartElement.nativeElement)
      .append("svg")
      .attr("height", height)
      .attr("width", width);


    /* Russia Removed */
     var projection = d3
      .geoMercator()
      .center([125, 28])
      .scale(650)
      .rotate([28,-5])
      .precision(0.1)
     .translate([width / 2, height / 2]);

    var path = d3.geoPath().projection(projection);

    ready(ajpac, capitals); //invoke ready function

    function ready(data, capitals) {
       let ajpacRegion1 :any ;
       ajpacRegion1 = topojson.feature(data,data.objects.continent_Asia_subunits);

       let ajpacRegion = ajpacRegion1.features.filter(function(a){
        return a && a.properties.geounit != 'Russia';
        });

        ajpacRegion.push(hongKong);//adding geomtery for hongkong part 1
        ajpacRegion.push(hongkong2);//adding geomtery for hongkong part 2
      
        function aa(d):any{
          var that = d3.select(this)
          .attr("fill", "#eee9e9")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", "0.5")
          .style("stroke-dasharray", ("10,3"));
  
          capitals.features.forEach(function (cap) {
            if (cap.properties.NAME == d.properties.geounit) {
              that.attr("fill", "#C2E05D");
            }
          });
        }

      svg
        .selectAll("path")
        .data(
          ajpacRegion.filter(function(d) {
            return d.geometry; // return only features with a geometry
          })
        )
        .enter()
        .append("path")
        .attr("class", "states")
        .attr("d", path)
        .attr("class", aa )
        .on("mouseover", function (data: any) {
          d3.select("#countryheading").text(data.properties.geounit);
          //  d3.select(this).attr("opacity",".5");
          d3.select(this).attr("cursor", "pointer");
        })
        .on("mouseout", function (d: any) {
          var that = d3.select(this);
          that.attr("fill", "#eee9e9").attr("opacity","1");

          capitals.features.forEach(function (cap) {
            if (cap.properties.NAME == d.properties.geounit) {
              that.attr("fill", "#C2E05D");
            }
          });
        });

      

      svg.selectAll("rect")
      .data(capitals.features)
      .enter()
      .append("rect")
      .attr("x",  function (d:any) {
         return projection(d.geometry.coordinates)[0] +25;
       })
      .attr("y", function (d:any) {
         return projection(d.geometry.coordinates)[1]-8;
       })
      .attr("width", 25)
      .attr("height", 15)
      .attr("fill", "black");


      svg
      .selectAll(".city-label")
      .data(capitals.features)
      .enter().append("text")
      .attr("class", "city-label")
      .attr("x", function (d:any) {
        return projection(d.geometry.coordinates)[0]+25;
      })
      .attr("y", function (d:any) {
        return projection(d.geometry.coordinates)[1]-10;
      })
      .text(function (d:any) {
        return d.properties.NAME;
      })
      .attr("fill", "black");

      
      svg
      .selectAll(".city-label1")
      .data(capitals.features)
      .enter().append("text")
      .attr("class", "city-label1")
      
      .attr("x", function (d:any) {
        return projection(d.geometry.coordinates)[0]+25;
      })
      .attr("y", function (d:any) {
        return projection(d.geometry.coordinates)[1];
      })
      .text(function (d:any) {
         return d.properties.FACTORIES ;
      })
      .attr("fill", "#fff")
      .attr("dx", 5)
      .attr("dy", 2);

      // svg
      // .selectAll(".city-circle")
      // .data(capitals.features)
      // .enter()
      // .append("circle")
      // .attr("r", 1.5)
      // .attr("cx", function (d:any) {
      //   return projection(d.geometry.coordinates)[0];

      // })
      // .attr("cy", function (d:any) {
      //   return projection(d.geometry.coordinates)[1];
      // }).attr("dx", ".55em");


      svg
      .selectAll("image")
      .data(capitals.features)
      .enter()
      .append("image")
      .attr("xlink:href", "../assets/img/flag4.svg")   
      .attr("x", function (d:any) {
        var cord = projection(d.geometry.coordinates);
        return cord[0];
      })
      .attr("y", function (d:any) {
        var cord = projection(d.geometry.coordinates);
        return cord[1] - 25;
      })

    } //ready function end
  }//build fn 

  clicked(event: any) {
    switch (event.target.__data__.properties.geounit) {
      case 'India':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'India' } });
        break;
      case 'China':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'China' } });
        break;
      case 'Thailand':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'Thailand' } });
        break;
      case 'Malaysia':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'India' } });
        break;
      case 'Singapore':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'Singapore' } });
        break;
      case 'Indonesia':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'Indonesia' } });
        break;
      case 'Hong Kong':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'Hong Kong' } });
        break;
      case 'Taiwan':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'Taiwan' } });
        break;
      case 'Philippines':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'Philippines' } });
        break;
      case 'South korea':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'South korea' } });
        break;
      case 'Japan':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Asia', country: 'Japan' } });
        break;
    }
  }
}

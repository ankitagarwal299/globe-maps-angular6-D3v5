import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router"
import * as d3 from "d3";
import * as topojson from "topojson";

/* https://piwodlaiwo.github.io/topojson/ 
https://geojson-maps.ash.ms/
*/
import { default as america } from "./America";
import { default as capitals } from "./capitals";
@Component({
  selector: 'app-america-continent',
  templateUrl: './america-continent.component.html',
  styleUrls: ['./america-continent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AmericaContinentComponent implements OnInit {
  // Reference chart variable inside Component
  @ViewChild("chart")
  chartElement: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    this.buildChart();

  }

  buildChart() {
    var margin = { top: 10, left: 0, right: 0, bottom: 0 },
      height = 750 - margin.top - margin.bottom,
      width = 600 - margin.left - margin.right;

    var svg = d3
      .select(this.chartElement.nativeElement)
      .append("svg")
      .attr("height", height)
      .attr("width", width);


    /* Russia Removed */
    var projection = d3
      .geoMercator()
      .center([-70, 35])
      .scale(200)
      .rotate([20, 0])
      .precision(0.1)
      // .geoAlbers()//Do not show hawaii or alaska region
      // .scale(600)
      .translate([width / 2, height / 2]);

    var path = d3.geoPath().projection(projection);

    ready(america, capitals); //invoke ready function

    function ready(data, capitals) {
      let americaRegion1:any;
      americaRegion1 = topojson.feature(data, data.objects.custom);


      let americaRegion = americaRegion1.features.filter(function (a) {
        return a && a.properties.geounit != 'Greenland';
      });

       function aa(d: any):any {
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
      };

      svg
        .selectAll("path")
        .data(  
          americaRegion.filter( (d) =>{
            return d.geometry; // return only features with a geometry
          })
        )
        .enter()
        .append("path")
        .attr("class", "states")
        .attr("d", path)
        .attr("class", aa)
        .on("mouseover", function (data:any) {
          d3.select("#countryheading").text(data.properties.geounit);
          // d3.select(this).attr("opacity", ".5");
          d3.select(this).attr("cursor","pointer");

        })
        .on("mouseout", function (d:any):void {
          var that = d3.select(this);
          that.attr("fill", "#eee9e9").attr("opacity", "1");

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
        .attr("x", function (d:any) {
          return projection(d.geometry.coordinates)[0];
        })
        .attr("y", function (d:any) {
          return projection(d.geometry.coordinates)[1] + 8;
        })
        .attr("width", 25)
        .attr("height", 15)
        .attr("fill", "black");


      svg
        .selectAll(".city-label")
        .data(capitals.features)
        .enter().append("text")
        .attr("class", "city-label")

        .attr("x", function (d: any) {
          return projection(d.geometry.coordinates)[0];
        })
        .attr("y", function (d: any) {
          return projection(d.geometry.coordinates)[1]+5;
        })
        .text(function (d: any) {
          return d.properties.NAME;
        })
        .attr("fill", "black");

      svg
        .selectAll(".city-label1")
        .data(capitals.features)
        .enter().append("text")
        .attr("class", "city-label1")
        .attr("x", function (d: any) {
          return projection(d.geometry.coordinates)[0];
        })
        .attr("y", function (d: any) {
          return projection(d.geometry.coordinates)[1] + 18;
        })
        .text(function (d:any) {
          return d.properties.FACTORIES;
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
      //   return projection(d.geometry.coordinates)[0]

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
        .attr("height", "100")
        .attr("width", "100")
        .attr("x", function (d:any) {
          var cord = projection(d.geometry.coordinates);
          return cord[0];
        })
        .attr("y", function (d:any) {
          var cord = projection(d.geometry.coordinates);
          return cord[1] - 25;
        })
    }//ready function end
  }//buildchart function end

  clicked(event: any) {
    console.log(event);
    switch (event.target.__data__.properties.geounit) {

      case 'Canada':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'America', country: 'Canada' } });
        break;
      case 'United States of America':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'America', country: 'United States of America' } });
        break;
      case 'Brazil':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'America', country: 'Brazil' } });
        break;
      case 'Mexico':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'America', country: 'Mexico' } });
        break;
    }
  }
}




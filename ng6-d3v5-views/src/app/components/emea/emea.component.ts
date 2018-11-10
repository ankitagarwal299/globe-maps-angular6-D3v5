import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

import * as d3 from "d3";
import * as topojson from "topojson";

import { default as emea } from "./EMEA2";
import { default as capitals } from "./capitals";


@Component({
  selector: 'app-emea',
  templateUrl: './emea.component.html',
  styleUrls: ['./emea.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EMEAComponent implements OnInit {
  // Reference chart variable inside Component
  @ViewChild("chart")
  chartElement: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    this.buildChart();
  }
  buildChart() {


    var margin = { top: 0, left: 0, right: 0, bottom: 0 },
      height = 748 - margin.top - margin.bottom,
      width = 1050 - margin.left - margin.right;

    var svg = d3
      .select(this.chartElement.nativeElement)
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    var projection = d3.geoAlbers()
      .center([-35, 55.4])
      .rotate([-38, 3.0])
      .parallels([150, 100])
      .scale(1450)
      .translate([width / 2 * 0.9, height / 2]);

    var path = d3.geoPath().projection(projection);

    ready(emea, capitals);//invoke ready function

    function ready(data: any, capitals) {
      var region: any;
      let emearRegion: any;
      region = topojson.feature(data, data.objects.continent_Europe_subunits);
      emearRegion = region.features;


      function aa(d: any): any {
        var that = d3.select(this)
          .attr("fill", "#eee9e9")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", "0.5")
          .style("stroke-dasharray", ("10,3"));

        capitals.features.forEach(function (cap) {
          if (cap.properties.NAME == d.properties.geounit) {
            // that.attr("fill", "#00bceb");
            that.attr("fill", "#C2E05D");
          }
        });
      }



      svg
        .selectAll("path")
        .data(emearRegion.filter(function (d) {
          return d.geometry != null;    // return only features with a geometry
        }))
        .enter()
        .append("path")
        .attr("class", "states")
        .attr("d", path)
        .attr("class", aa)
        .on("mouseover", function (data: any) {
          d3.select("#countryheading").text(data.properties.geounit);
          //d3.select(this).attr("opacity",".5");cursor
          d3.select(this).attr("cursor", "pointer");
        })
        .on("mouseout", function (d: any) {
          var that = d3.select(this);
          // that.attr("fill", "#58585b").attr("opacity","1");
          that.attr("fill", "#eee9e9").attr("opacity", "1");

          capitals.features.forEach(function (cap) {
            if (cap.properties.NAME == d.properties.geounit) {
              // that.attr("fill", "#00bceb");
              that.attr("fill", "#C2E05D");
            }
          });
        });





      svg.selectAll("rect")
        .data(capitals.features)
        .enter()
        .append("rect")
        .attr("x", function (d: any) {
          return projection(d.geometry.coordinates)[0];

        })
        .attr("y", function (d: any) {
          return projection(d.geometry.coordinates)[1] + 3;
        })
        .attr("width", 25)
        .attr("height", 15)
        // .attr("fill", "green");
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
          return projection(d.geometry.coordinates)[1];
        })
        .text(function (d: any) {
          return d.properties.NAME;
        })
        // .attr("fill", "#ffffff");
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
          return projection(d.geometry.coordinates)[1] + 14;
        })
        .text(function (d: any) {
          return d.properties.FACTORIES;
        })
        // .attr("fill", "#000")
        .attr("fill", "#fff")
        .attr("dx", 5)
        .attr("dy", 2);

      svg
        .selectAll("image")
        .data(capitals.features)
        .enter()
        .append("image")
        .attr("xlink:href", "../assets/img/flag4.svg")
        // .attr("xlink:href", "../assets/img/flag4.svg")
        .attr("x", function (d: any) {
          var cord = projection(d.geometry.coordinates);
          return cord[0] - 10;
        })
        .attr("y", function (d: any) {
          var cord = projection(d.geometry.coordinates);
          return cord[1] - 30;
        });


    } //ready function end
  }//build fn

  clicked(event: any) {
    switch (event.target.__data__.properties.geounit) {
      case 'United Kingdom':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'United Kingdom' } });
        break;
      case 'Norway':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Norway' } });
        break;
      case 'Denmark':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Denmark' } });
        break;
      case 'Netherlands':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Netherlands' } });
        break;
      case 'Belgium':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Belgium' } });
        break;
      case 'Germany':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Germany' } });
        break;
      case 'Poland':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Poland' } });
        break;
      case 'Germany':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Germany' } });
        break;
      case 'Czech Republic':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Czech Republic' } });
        break;
      case 'Hungary':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Hungary' } });
        break;
      case 'Estonia':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Estonia' } });
        break;
      case 'Russia':
        this.router.navigate(['/unitedkingdom'], { queryParams: { continent: 'Europe', country: 'Russia' } });
        break;
    }
  }
}

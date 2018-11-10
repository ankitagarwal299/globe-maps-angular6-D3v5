import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  OnInit,
  VERSION,
  ViewEncapsulation
} from "@angular/core";

import * as d3 from "d3";
import * as topojson from "topojson";
import { default as world } from "./states";
import { default as capitals } from "./capitals";

@Component({
  selector: "app-usamap",
  templateUrl: "./usamap.component.html",
  styleUrls: ["./usamap.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UsamapComponent implements OnInit {
  // Reference chart variable inside Component
  @ViewChild("chart")
  chartElement: ElementRef;

  constructor() { }

  ngOnInit() {
    this.buildChart();
  }

  buildChart() {


    var margin = { top: 150, left: 300, right: 0, bottom: 0 },
      height = 800 - margin.top - margin.bottom,
      width = 1600 - margin.left - margin.right;

    var svg = d3
      .select(this.chartElement.nativeElement)
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    var projection = d3
      .geoAlbers()//Do not show hawaii or alaska region
      .scale(1350)
      .translate([width / 2, height / 2]);
    var path = d3.geoPath().projection(projection);

    let num:any= 0;

    /* Tooltip */
    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("position", "absolute").style("opacity", 0).html(num);


    /* Formattting tooltiop  marque */
    var format = d3.format(",d");


    ready(world, capitals);//invoke ready function

    function ready(data, capitals) {
      var states:any;
      let usStates:any;
      states = topojson.feature(data, data.objects.usStates);
      usStates = states.features;

      svg
        .selectAll("path")
        .data(usStates)
        .enter()
        .append("path")
        .attr("class", "states")
        .attr("d", path)
        .on("mouseover", function (data) {
          console.log('this', this);
          //Add the class on mouse over
          d3.select(this).classed("selected", function (d) {
            return true;
          })

          var xPosition = parseFloat(d3.event.pageX) + 15;
          var yPosition = parseFloat(d3.event.pageY) - 15;

          tooltip.style("left", 300 + "px").style("top", 280 + "px").style("opacity", 1);

          /* Below code for transitioning numbers using tween f() */
          d3.select(".tooltip")
            .transition()
            .duration(2000)
            .on("start", function repeat() {
              d3.active(this).tween("text", function () {
                var that:any;
                that = d3.select(this);
                var i = d3.interpolateNumber(that.text().replace(/,/g, ""), Math.random() * 1e6);
                return function (t) {
                  that.text(format(i(t)));
                };
              });
            });

        })
        .on("mousemove", function (d, i) {
          d3.select(this).classed("selected", true).attr("fill", "#00BCEB");
        })
        .on("mouseout", function (data) {
          tooltip.style("opacity", 0);
          // tooltip.style("display", "none");
          //Remove the class on mouse out
          d3.select(this).classed("selected", false).attr("fill", "#00BCEB");
        });

      svg
        .selectAll(".city-label")
        .data(capitals.features)
        .enter().append("text")
        .attr("class", "city-label")
        .attr("x", function (d:any) {
          //var cord = projection([d.long, d.lat]);
          return projection(d.geometry.coordinates)[0];
        })
        .attr("y", function (d:any) {
          //var cord = projection([d.long, d.lat]);
          return projection(d.geometry.coordinates)[1];
        })
        .text(function (d:any) {
          return d.properties.NAME;
        })
        .attr("dx", 5)
        .attr("dy", 2)
        .attr("fill", "#fff");
        // .attr("fill", "#005073")

      svg
        .selectAll(".city-circle")
        .data(capitals.features)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", function (d:any) {
          return projection(d.geometry.coordinates)[0];

        })
        .attr("cy", function (d:any) {
          return projection(d.geometry.coordinates)[1];
        });

      svg
        .selectAll("image")
        .data(capitals.features)
        .enter()
        .append("image")
        .attr("xlink:href", "../assets/img/location5.svg")
        .attr("height", "100")
        .attr("width", "100")
        .attr("x", function (d:any) {
          var cord = projection(d.geometry.coordinates);
          return cord[0] - 12;
        })
        .attr("y", function (d:any) {
          var cord = projection(d.geometry.coordinates);
          return cord[1] - 25;
        })
        .on("mouseover", function (d:any) {
          document.getElementById("map").innerHTML = d.properties.NAME; //infoTooltip

          //document.getElementById("map").innerHTML = d.properties.NAME + "," + d.properties.POPULATION; //infoTooltip

          var xPosition = parseFloat(d3.event.pageX) - 200;
          var yPosition = parseFloat(d3.event.pageY) - 15;

          d3.select("#map").classed("hidden", false);

          d3.select("#map")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px");
        })
        .on("mouseout", function (d, i) {
          d3.select(this).style("fill", "none");
          d3.select("#map").classed("hidden", true);
        })
        .on("mousemove", function (d, i) {
          var xPosition = parseFloat(d3.event.pageX) - 200;
          var yPosition = parseFloat(d3.event.pageY) - 15;

          d3.select("#map").style("left", xPosition + "px").style("top", yPosition + "px");

          d3.select("#map").classed("hidden", false);
        });
    } //ready function end
  }
}

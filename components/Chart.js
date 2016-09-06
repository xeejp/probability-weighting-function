import React, { Component } from 'react'
import { connect } from 'react-redux'

import Highcharts from 'react-highcharts'

const mapStateToProps = ({}) => ({})

const Chart = (({ add, rate, title}) => {
     var fullrate = rate.concat(rate)
     for(var i = rate.length; i < fullrate.length; i++){
       fullrate[i] = -fullrate[i]
      }
     var data = Object.keys(add).map((key, index) => [fullrate[index], add[key] + 1000])

      return <Highcharts
              config={{
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        credits : {
            enabled: false,
        },
        title: {
            text: (title == undefined)? '実験結果' : title
        },
        xAxis: {
            title: {
                enabled: true,
                text: '確率[%]'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: '金額[円]'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x}%の時の金額 {point.y}円'
                }
            },
       },
        series: [{
            type: 'scatter',
            name: '金額',
            color: 'rgba(70, 70, 230, .5)',
            data: data
        }]
    }} />
})

export default connect()(Chart)
<!--<template></template>-->

<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['options'], 
    mounted () {
        this.renderChart(this.chartData, this.options)
    }
    // methods: {
    //     update(newData) {
    //         console.log('updating', newData)
    //         this.chartData.datasets.push(newData)
    //         this._chart.update()      
    //     }
    // }
}
</script>

<style>
    
</style>
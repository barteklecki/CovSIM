<template>
    <div id="multiSlider" @click="getClick($event)">
        <div id="msBar" class="bg-warning" :style="{width:msVal+'% !important'}">{{ msVal + msUnit }}</div>
        <div>X</div>
    </div>
</template>

<script>
// import
export default {
    data: function() { 
        //props: [valA, valB];
        return {
        msVal:          50,                     // 0-100% width of bar
        msMin:          0,                      // limit lower to msMin
        msMax:          100,                    // limit upper to msMax
        msUnit:         '%'                     // units
        };
    },
    methods: {
        getClick: function(e) {
            var bar = document.getElementById('multiSlider');
            this.msVal = (e.pageX - bar.getBoundingClientRect().left)*100/bar.clientWidth;
            ;
        },
        getTogglePointsCount: function() {
            return;
        },
        msReset: function() {
            return;
        },
        setMin: function(value) {
            return;
        },
        setMax: function(value) {
            return;
        },
        getStripSize: function(value) {
            return;
        },
        displayMin: function(value) {
            return;
        },
        displayMax: function(value) {
            return;
        },
        
    }
}
</script>

<style>
    #multiSlider {
        border-width: 1px;
        border-color: black;
        border-style: solid;
        height: 30px;
    }

    #msBar{
        background-color: blue;
        border-width: 0px;
        border-color: brown;
        border-style: solid;
        height: 28px;
    }



</style>
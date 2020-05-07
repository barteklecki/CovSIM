<template>
    <div id="multiSlider"  @click="getClick($event)" @dblclick="resetBar()" :style="{background: grid}">
        <div id="msBar" :style="[{'margin-left': relA + '%'},{width: relAB +'%'}]">{{ valA + ' ' + valAB }}</div>
    </div>
</template>

<script>

export default {
    props: {
        msActive:   {type: Boolean,default: true},
        msSteps:    {type: Number, default: 100},
        msA:        {type: Number, default: 0},
        msAB:       {type: Number, default: 0},
        msMin:      {type: Number, default: 0},
        msMax:      {type: Number, default: 0},
    
    },
    data() { 
        return {
        active: true,   // component active & can be controled
        steps:  100,     // number of descrete steps from 0 to 100%
        valA:   0,      // bar starting in steps
        valAB:  0,      // bar lenght   in steps
        relA:   0,      // bar starting relative in %
        relAB:  0,      // bar lenght   relative in %
        min:    0,      // limit lower A (0 -> no limit)
        max:    0,      // limit upper B (0 -> no limit)
        grid:  '0'      // placeholder for bg grid string
        };
    },
    mounted() {         // init & data repationships
        this.setData;
        this.getBGGrad;
    },
    computed: {
        setData() {
            //console.log('Multi-Slider -> \nStep:'+this.msSteps+' A:'+this.msA+' AB:'+this.msAB);
            this.steps  = this.msSteps;       
            this.valA   = this.msA;       
            this.valAB  = this.msAB;      
            this.min = this.msMin;  
            this.max = this.msMax;  
            
            this.relA  = this.valA  / this.steps * 100;
            this.relAB = this.valAB / this.steps * 100; 
        },
        emitVal() {
            this.$emit('valA',  this.valA);
            this.$emit('valB',  this.valA + this.valAB);
            this.$emit('valAB', this.valAB);
            this.$emit('val',   [this.active, this.steps, this.valA, this.valAB, this.units]);
        },
        getBGGrad() {
            let i = (1 / this.steps) * 100;
            this.grid = 'repeating-linear-gradient(90deg, white, white '+i+'%, #f8f8f8 '+i+'%, #f8f8f8 '+(i*2)+'%)'
        }
    },
    methods: {
        getClick(event) {
            let el = document.getElementById('multiSlider');
            let length = el.clientWidth;
            let pos = event.pageX - el.getBoundingClientRect().left;
            let step = Math.round(pos / (length / this.steps));
            if (this.min && step < this.min) { step = this.min }
            if (this.max && step > this.max) { step = this.max }
            this.setBar(step);
            this.getBGGrad;
        },
        setBar(step) { //      [ 1       A|||||┋|||||B         2 ]
            if (!this.active) { return; }
            if        (step > this.valA && this.valAB == 0) {   // 0
                this.valA  = step;                  
                this.valAB = 1;
            } else if (step < this.valA + (this.valAB/2)) {     // 1                                        
                this.valAB = this.valAB + this.valA - step;
                this.valA  = step;
            } else if (step >= this.valA + (this.valAB/2) ) {   // 2                     
                this.valAB = step - this.valA;                 
            } else {
                console.log('-ms-idle-click-');
            }
            this.relA  = this.valA  / this.steps * 100;
            this.relAB = this.valAB / this.steps * 100;
            
            this.emitVal;
            console.log('Multi-Slider => A:'+this.valA+'  AB:'+this.valAB);
            return;
        },
        resetBar() {
            this.valA  = 0;
            this.valAB = 0;
            this.relA  = 0;
            this.relAB = 0;
            return;
        }
    }

}
</script>

<style>
    #multiSlider {
        border-width: 1px;
        border-color: black;
        border-style: solid;
        height: 100%;
    }

    #msBar {
        background-color: aquamarine;
        height: 100%;
        font-size: 8px;
        border-left-width: 0px;
        border-left-style: solid;
        border-left-color: #ff9c77;
        border-right-width: 0px;
        border-right-style: solid;
        border-right-color: #ff9c77;
        cursor: col-resize;
        min-height: 10px;
    }

</style>
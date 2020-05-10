<!--       [0                   A||||||||||||||┋||||||||||||||||B                   steps]             -->
<template>
    <div :id="'ms'+val.id" class="ms" @click="getClick($event)" @dblclick="resetBar()" :style="{background: grid}">
        <div class="msBar" :class="{disactive: !val.active}" :style="[{'margin-left': relA + '%'},{width: relAB +'%'}]"><!--{{val.valA + ' ' + val.valB }}--></div>
    </div>
</template>

<script>
export default {
    props: {
        val: { 
            type: Object,
            default: function() { return {
                id:     0,     // unique identifier
                active: true,  // component is active
                steps:  10,    // number of discrete steps
                valA:   0,     // bar starting point
                valB:   0,     // bar ending point
                min:    0,     // lower value limiter (0=no limit)
                max:    0      // upper value limiter (0=no limit)
            }; }
        }
    },
    data() { return { 
        relA:    0,             // bar starting relative in %
        relAB:   0,             // bar lenght   relative in %
        grid:    ''             // placeholder for bg grid string
    }; },
    mounted() {                 // init & data repationships
        this.setBar(this.val.valA);
        this.getBGGrad;
    },
    computed: {
        getBGGrad() {
            let i = (1 / this.val.steps) * 100;
            this.grid = 'repeating-linear-gradient(90deg, white, white '+i+'%, #f8f8f8 '+i+'%, #f8f8f8 '+(i*2)+'%)';
        }
    },
    methods: {
        getClick(event) {
            let el = document.getElementById('ms'+this.val.id);      
            let length = el.clientWidth;
            let pos = event.pageX - el.getBoundingClientRect().left;
            let step = Math.round(pos / (length / this.val.steps));
            if (this.val.min && step < this.val.min) { step = this.val.min; }  // range validation
            if (this.val.max && step > this.val.max) { step = this.val.max; }
            this.setBar(step);
            this.getBGGrad;
        },
        setData() {          
            this.relA  = this.val.valA  / this.val.steps * 100;
            this.relAB = (this.val.valB-this.val.valA) / this.val.steps * 100;
        },
        setBar(step) {                      //     [ 1       A|||||┋|||||B         2 ]
            if (!this.val.active) { 
                console.log('[component deactivated]');
                return; 
            }
            if (step > this.val.valA && this.val.valB == 0) {                       // 0
                this.val.valA  = step;                  
                this.val.valB = this.val.steps;
            } else if (step < this.val.valA + ((this.val.valB-this.val.valA)/2)) {  // 1                                        
                this.val.valA = step;
            } else if (step >= this.val.valA + ((this.val.valB-this.val.valA)/2)) { // 2                     
                this.val.valB = step;                 
            } else {
                console.log('[ms-idle-click]');
            }
            this.relA  = this.val.valA  / this.val.steps * 100;
            this.relAB = (this.val.valB-this.val.valA) / this.val.steps * 100;
            if (!this.val.id) { this.val.id = Math.round(Math.random()*10000); } //generating unique id
            // $emit here
            return;
        },
        resetBar() {
            this.val.valA = 0;
            this.val.valB = 0;
            this.relA     = 0;
            this.relAB    = 0;
            return;
        }
    }

}
</script>

<style>
    .ms {
        border-width: 1px;
        border-color: #707070;
        border-style: solid;
        border-radius: 3px;
        height: 100%;
        width: 100%;
    }

    .msBar {
        background-color: aquamarine;
        height: 100%;
        font-size: 8px;
        border-left-width: 0px;
        border-left-style: solid;
        border-left-color: #ff9c77;
        border-right-width: 0px;
        border-right-style: solid;
        border-right-color: #ff9c77;
        min-height: 10px;
        cursor: col-resize;
    }

    .disactive {
        background-color: #d3d3d39f;
        border-width: 1px;
        border-style: solid;
        border-color: #cacaca9f;
        cursor: not-allowed;
    }

</style>
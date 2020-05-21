<template>
    <div class="float-center">
        <slot></slot>
        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm">
                <div class="input-group-text bg-white input-group-sm">
                    Title:
                </div>
            </div>
            <input  type="text" 
                    id="title" 
                    class="form-control form-control-light form-control-sm" 
                    maxlength="50"
                    aria-describedby="title-help">
        </div>
        <div class="form-group mt-1 form-sm">
            <label for="formControlRange" class="font-weight-light mb-0 mt-2">
                Duration of simulation: <span  class="font-weight-bold">{{ set.days }} days</span>
            </label>
            <input  :step="15" id="rangeDays"
                    v-model="set.days"
                    type="range" 
                    class="custom-range custom-range-light my-0" 
                    min="30" max="360">
        </div>
        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm input-group-light">
                <div class="input-group-text bg-white">
                    Day zero:
                </div>
            </div>
            <input  v-model.lazy="set.dayZero"
                    @change="set.dayZero=chNum(set.dayZero,0,10)" 
                    type="text" 
                    id="dayzero" 
                    class="form-control form-control-light form-control-sm text-right"
                    maxlength="6" 
                    aria-describedby="title-help">
            <div class="input-group-append" id="button-addon4">
                <button @click="set.dayZero=chNum(set.dayZero,1)"  class="btn btn-light" type="button">+</button>
                <button @click="set.dayZero=chNum(set.dayZero,-1)" class="btn btn-light" type="button">-</button>
            </div>
        </div>
        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend  input-group-sm">
                <div class="input-group-text bg-white">
                    Ro:
                </div>
            </div>
            <input  v-model.lazy="set.ro"
                    @change="set.ro=chNum(set.ro,0,1)" 
                    type="text" 
                    id="ro" 
                    class="form-control form-control-light form-control-sm text-right" 
                    maxlength="6"
                    aria-describedby="title-help">
            <div class="input-group-append" id="button-addon4">
                <button @click="set.ro=chNum(set.ro,0.01)"  class="btn btn-light" type="button">+</button>
                <button @click="set.ro=chNum(set.ro,-0.01)" class="btn btn-light" type="button">-</button>
            </div>
        </div>

        <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend input-group-sm">
                <div class="input-group-text bg-white">
                    IFR[%]:
                </div>
            </div>
            <input  v-model.lazy="set.ifr" 
                    @change="set.ifr=chNum(set.ifr,0,10)"
                    type="text" 
                    id="ifr" 
                    class="form-control form-control-light form-control-sm text-right" 
                    maxlength="6"
                    aria-describedby="title-help">
            <div class="input-group-append" id="button-addon4">
                <button @click="set.ifr=chNum(set.ifr,1)"  class="btn btn-light" type="button">+</button>
                <button @click="set.ifr=chNum(set.ifr,-1)" class="btn btn-light" type="button">-</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['set'],
    methods: {
        chNum(num,x,def=0) {
            num = Number(num);
            num += x;
            if ( num < 0 || isNaN(num) ) { num = def; }
            return (Math.round(num*100)/100);
        }
    }   
}
</script>

<style>
.custom-range::-webkit-slider-thumb {
  background: aquamarine;
}
.custom-range::-moz-range-thumb {
  background: aquamarine;
}
.custom-range::-ms-thumb {
  background: aquamarine;
}
</style>
<template>
    <div id="npi" class="container container-primary p-0 my-1" style="width: 100%, border-weight: 1px, boredr-style: solid, border-color: black">
        <div class="row">
        <div class="col col-lg-4 pr-0 justify-content-end" style="border-weight: 1px, boredr-style: solid, border-color: black">
            <div class="btn-group d-flex" role="group">
                <button class="btn btn-outline-secondary btn-sm" @click="set.visible = !set.visible">&#10060;</button>
                <button class="btn btn-outline-secondary btn-sm w-100">
                    {{ set.name }}
                </button>
                <button class="btn btn-outline-secondary btn-sm text-left w-100 min-w-10">
                    &#128197; {{ val.valA }}-{{ val.valB}}
                </button>
                <button v-if="this.val.active"  class="btn btn-outline-secondary btn-sm" @click="activation">&#9989;</button>
                <button v-else class="btn btn-secondary text-light btn-sm" @click="activation">&#9940;</button>
                <button class="btn btn-outline-secondary btn-sm">&#9776;</button>
            </div>
        </div>
        <div class="col col-lg-8">
            <div>
                <multi-slider :val="val" style="height: 31px"></multi-slider>
            </div>
        </div>
        </div>
    </div>      
</template>

<script>
import multiSlider from './MultiSlider.vue';
export default {
    components: {
        'multi-slider': multiSlider
    },
    props: {
        val: { type: Object },
        set: { type: Object }
    },
    methods: {
        activation() {
            this.val.active = !this.val.active;
        }
    }
}
</script>

<style>
    .barInfo {
        font-size: 0.7em;
        color:darkgray;
    }
</style>
<template>
    <div id="npi" class="container container-primary p-0 my-1">
        <div class="row">
        <div class="col col-lg-4 pr-0 justify-content-end">
            <div class="btn-group d-flex" role="group">
                <button @click="set.visible = !set.visible" class="btn btn-outline-secondary btn-sm">
                    &#10060;
                </button>
                <button class="btn btn-outline-secondary btn-sm w-100 text-left text-truncate">
                    {{ set.name }}
                </button>
                <button class="btn btn-outline-secondary btn-sm text-left w-100 min-w-10">
                    &#128197; {{ val.valA }}-{{ val.valB}}
                </button>
                <button v-if="this.val.active" @click="activation" class="btn btn-outline-secondary btn-sm">
                    &#9989;
                </button>
                <button v-else @click="activation" class="btn btn-secondary text-light btn-sm">
                    &#9940;
                </button>
                <!-- <button class="btn btn-outline-secondary btn-sm">&#9776;</button> -->
            </div>
        </div>
        <div class="col col-lg-8">
            <div>
                <multi-slider :val="val" style="min-height: 31px"></multi-slider>
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
    #npi:hover {
        background-color: #00000007;
    }

    .barInfo {
        font-size: 0.7em;
        color:darkgray;
    }
</style>
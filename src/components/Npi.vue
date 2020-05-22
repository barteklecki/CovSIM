<template>
    <div id="npi" class="container container-primary p-0 my-1">
        <div class="row">
        <div class="col col-lg-4 pr-0 justify-content-end">
            <div class="btn-group d-flex" role="group">
                <button @click="npi.isVisible = !npi.isVisible" class="btn btn-outline-secondary btn-sm">
                    &#10060;
                </button>
                <button class="btn btn-outline-secondary btn-sm w-100 text-left text-truncate">
                    {{ npi.name }}
                </button>
                <button class="btn btn-outline-secondary btn-sm text-left w-100 min-w-10">
                    &#128197; {{ range.starts }}-{{ range.ends}}
                </button>
                <button v-if="this.range.isActive" @click="activation" class="btn btn-outline-secondary btn-sm">
                    &#9989;
                </button>
                <button v-else @click="activation" class="btn btn-secondary text-light btn-sm">
                    &#9940; 
                </button>
            </div>
        </div>
        <div class="col col-lg-8">
            <div>
                <custom-range :range="range" class="customRange"></custom-range>
            </div>
        </div>
        </div>
    </div>      
</template>

<script>
import customRange from './CustomRange.vue';

export default {
    components: {
        'custom-range': customRange
    },
    props: {
        range: { type: Object },
        npi: { type: Object }
    },
    methods: {
        activation() {
            this.range.isActive = !this.range.isActive;
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
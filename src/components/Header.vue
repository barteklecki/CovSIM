<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 py-0 mb-3 fixed-top shadow-sm">
      <a class="navbar-brand mx-3 font-weight-bold">
        <img src="../img/covico.svg" class="logo d-inline-block align-top mx-2" alt="CovSIM">
        COVSIM
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" 
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <router-link to="/" tag="li" class="nav-item" active-class="active" exact>
                <a class="nav-link">
                    Sim
                </a>
            </router-link>
            <router-link to="/tutorial" tag="li" class="nav-item" active-class="active" exact>
                <a class="nav-link">
                    Tutorial
                </a>
            </router-link>
            <router-link to="/about" tag="li" class="nav-item" active-class="active" exact>
                <a class="nav-link">
                    About
                </a>
            </router-link>
        </ul>
      </div>
      <form v-if="isShareVisible" class="form-inline">
        <div v-if="shareLink" class="form-group">
          <input :value="shareLink" readonly type="text" class="form-control form-control-sm mr-2 text-right" id="link">
        </div>
        <button :disabled="isShareButtonDisabed()" @click="nodeSubmit" class="btn btn-dark btn-sm mr-5">
            SHARE
        </button>
      </form>
    </nav>    
</template>

<script>
import { eventBus } from '../main.js';

export default {
    data() {
        return {
            shareLink: '',
            isShareVisible: false
        }
    },
    methods: {
        nodeSubmit() {
            this.shareLink = "generating link...";
            eventBus.$emit('node-submit');
        },
        isShareButtonDisabed() {
            return this.shareLink ? true : false;
        }
    },
    created() {
        eventBus.$on('set-link', (link) => {
            this.shareLink = link;
        });
        eventBus.$on('is-share-visible', (isVisible) => {
            this.isShareVisible = isVisible;
        });
    }
}
</script>

<style>
    #link {
        min-width: 350px;
    }

    .logo {
        width: 30px;
        height: 30px;
    }
</style>
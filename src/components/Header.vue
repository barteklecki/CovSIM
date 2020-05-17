<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 py-0 mb-3 fixed-top shadow-sm">
      <a class="navbar-brand mx-3 font-weight-bold" href="#">
        <img src="../img/covico.svg" width="30" height="30" class="d-inline-block align-top mx-2" alt="">
        COVSIM
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Sim<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Tutorial</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">About</a>
          </li>
        </ul>
      </div>
      <!-- SHARE -->
      <form class="form-inline">
        <div v-if="shareLink" class="form-group">
          <input type="text" :value="shareLink" readonly class="form-control form-control-sm mr-2" id="link">
        </div>
        <button :disabled="shareLink ? true : false" @click="nodeSubmit" class="btn btn-outline-dark btn-sm mr-5">SHARE</button>
        <!-- <button @click="eventBus.$emit('node-fetch')"  class="btn btn-outline-dark btn-sm mr-5">FETCH</button> -->
      </form>
    </nav>    
</template>

<script>
import { eventBus } from '../main.js';

export default {
    //props: ['shareLink'],
    data() {
        return {
            shareLink: ''   // 0 = hiden
        }
    },
    methods: {
        nodeSubmit() {
            this.shareLink = "generating link...";
            eventBus.$emit('node-submit');
        }
    },
    created() {
        eventBus.$on('set-link', (link) => {
            this.shareLink = link;
        });
    }
}
</script>

<style>
    #link {
        width: 400px;
    }
</style>
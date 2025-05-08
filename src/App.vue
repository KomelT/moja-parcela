<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";
import {
  MglGeolocateControl,
  MglMap,
  MglNavigationControl,
} from "@indoorequal/vue-maplibre-gl";
import LayerSelectorControl from "./components/LayerSelectorControl.vue";
import Menu from "./components/Menu.vue";
import { computed } from "vue";
import { useStore } from "./stores/store";

const store = useStore();

const mapStyle = computed(() => {
  return `/map-styles/${store.mapStyle}.json`;
});
</script>

<template>
  <MglMap :mapStyle="mapStyle" :center="[13.726414891504586, 45.85477731775239]" :zoom="9">
    <MglNavigationControl position="top-left" />
    <MglGeolocateControl position="top-left" />
    <LayerSelectorControl position="top-right" />
    <Menu position="top-right" />
  </MglMap>
</template>

<style>
.maplibregl-map {
	height: 100vh !important;
  width: 100vw !important;
}
</style>
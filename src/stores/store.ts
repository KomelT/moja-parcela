import type { LngLatLike } from "maplibre-gl";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

const useStore = defineStore("store", {
	state() {
		return {
			mapStyle: ref("openstreetmap"),
			markerLatLng: ref([0, 0]) as Ref<LngLatLike>,
		};
	},
});

export { useStore };

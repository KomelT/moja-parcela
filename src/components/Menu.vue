<script setup lang="ts">
import { MglCustomControl, useMap } from "@indoorequal/vue-maplibre-gl";
import ComboBox, { type ComboBoxProps } from './ComboBox.vue';
import Text from "./Text.vue";
import Button from './Button.vue';
import { ko } from "../assets/ko"
import { ref, type Ref } from 'vue'
import { Marker, type ControlPosition, type LngLatLike } from "maplibre-gl";
import { useStore } from "../stores/store";

type MenuProps = {
  position: ControlPosition | undefined;
}

const props = defineProps<MenuProps>()

const map = useMap();

const store = useStore();

const currentMarker = ref<Marker | null>(null);

setTimeout(() => {
  if (map.isLoaded && map.map) {
    map.map.addSource("parcele", {
      type: "raster",
      tiles: ["https://ipi.eprostor.gov.si/wms-si-gurs-g/wms?service=WMS&version=1.3.0&transparent=true&request=GetMap&layers=SI.GURS.KN:OSNOVNI_PARCELE,SI.GURS.KN:OSNOVNI_PARCELE&styles=nep_kn_parcele,nep_kn_parcele_lbl&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image/png"],
      tileSize: 256,
    });
    map.map.addLayer({
      id: "parcele",
      type: "raster",
      source: "parcele",
      paint: {},
    });

    if (!currentMarker.value) {
      currentMarker.value = new Marker()
        .setLngLat([0, 0])
        .addTo(map.map);
    }

    // @ts-ignore
    currentMarker.value.setLngLat([0, 0]);
  }
}, 3000);

const sko: Ref<ComboBoxProps["selected"]> = ref(null)
const plot_num = ref('')

const plotUrl = "https://ipi.eprostor.gov.si/wfs-si-gurs-g/wfs?request=GetFeature&version=2.0.0&typeName=SI.GURS.KN:OSNOVNI_PARCELE&outputFormat=application/json&srsName=EPSG:4326"

async function getPlot() {
  const res = await fetch(`${plotUrl}&cql_filter=KO_ID=${sko.value?.id}%20AND%20ST_PARCELE='${plot_num.value}'`)
  const data = await res.json();
  const bbox = data.features[0].bbox
  const center: LngLatLike = [
    (bbox[0] + bbox[2]) / 2,
    (bbox[1] + bbox[3]) / 2
  ]

  map.map?.flyTo({
    center: center,
    zoom: 17,
  });

  store.markerLatLng = center;
  currentMarker.value?.setLngLat(center);
}

</script>

<template>
  <MglCustomControl :position="props.position">
    <div class="bg-white p-2 rounded-lg shadow-md sm:w-80 w-70">
      <div class="flex">
        <ComboBox title="Katas. občina" :options="ko" v-model:selected="sko" class="mr-3" />
        <Text title="Št. parcele" v-model:text="plot_num" />
      </div>
      <Button text="Išči" class="mt-2" :onClick="() => getPlot()" />
    </div>
  </MglCustomControl>
</template>
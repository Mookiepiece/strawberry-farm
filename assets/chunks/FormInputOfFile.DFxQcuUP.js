const r=`<script setup lang="ts">\r
import { ref, watchEffect } from 'vue';\r
import { on } from '../../strawberry-farm/shared/on';\r
\r
const props = defineProps<{\r
  disabled?: boolean;\r
}>();\r
\r
const info = ref('');\r
const dragging = ref(false);\r
const dragover = ref(false);\r
\r
const handleChange = (e: Event) => {\r
  const { files } = e.target as HTMLInputElement;\r
  const file = files![0];\r
\r
  if (\r
    ['.png', '.jpg', '.jpeg', '.webp', '.avif'].some(ext =>\r
      file.name.endsWith(ext),\r
    )\r
  ) {\r
    const imgEl = document.createElement('img');\r
    imgEl.src = URL.createObjectURL(file);\r
    imgEl.decode().then(() => {\r
      info.value = JSON.stringify(\r
        {\r
          name: file.name,\r
          size: file.size,\r
\r
          naturalWidth: imgEl.naturalWidth,\r
          naturalHeight: imgEl.naturalHeight,\r
        },\r
        null,\r
        2,\r
      );\r
      URL.revokeObjectURL(imgEl.src); // TODO preview\r
    });\r
  } else if (['.mp4', '.webm'].some(ext => file.name.endsWith(ext))) {\r
    const videoEl = document.createElement('video');\r
    videoEl.src = URL.createObjectURL(file);\r
    videoEl.onloadedmetadata = () => {\r
      info.value = JSON.stringify(\r
        {\r
          name: file.name,\r
          size: file.size,\r
\r
          naturalWidth: videoEl.videoWidth,\r
          naturalHeight: videoEl.videoHeight,\r
          duration: videoEl.duration,\r
        },\r
        null,\r
        2,\r
      );\r
      URL.revokeObjectURL(videoEl.src); // TODO preview\r
    };\r
  } else {\r
    if (file.size < 10 * 1024 * 1024) {\r
      const fr = new FileReader();\r
      fr.onload = e => {\r
        info.value = '' + fr.result;\r
        console.log(1, e, fr.result);\r
      };\r
      fr.onprogress = e => {\r
        console.log(2, e, fr.result);\r
      };\r
\r
      fr.readAsText(file);\r
    }\r
  }\r
};\r
\r
watchEffect(onCleanUp => {\r
  if (!props.disabled) {\r
    onCleanUp(\r
      on(document.body).dragover(() => {\r
        dragging.value = true;\r
      }),\r
    );\r
    onCleanUp(\r
      on(document.body).dragleave(e => {\r
        if (!e.relatedTarget) dragging.value = false;\r
      }),\r
    );\r
  }\r
});\r
\r
const handleDrop = (e: DragEvent) => {\r
  const f = e.dataTransfer?.files;\r
  info.value = [...(f ?? [])].map(s => s.name).join('\\n');\r
};\r
<\/script>\r
\r
<template>\r
  <div>\r
    <label\r
      :data-dragging="dragging || undefined"\r
      :data-dragover="dragover || undefined"\r
      @dragover.prevent="!props.disabled && (dragover = true)"\r
      @dragleave.prevent="dragover = false"\r
      @drop.prevent="handleDrop"\r
    >\r
      <input type="file" @change="handleChange" />\r
    </label>\r
    <div style="max-height: 100px">\r
      {{ info }}\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
label {\r
  display: block;\r
  border: 6px dashed #8883;\r
\r
  &:hover,\r
  &:has(> input:focus-visible) {\r
    border: 6px dashed #8888;\r
  }\r
}\r
\r
label[data-dragging] {\r
  border-color: #8848 !important;\r
}\r
\r
label[data-dragover] {\r
  border-color: #a448 !important;\r
}\r
\r
input {\r
  pointer-events: none;\r
  outline: none;\r
}\r
</style>\r
`;export{r as default};

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { on } from '../../strawberry-farm/functions/on';

const props = defineProps<{
  disabled?: boolean;
}>();

const info = ref('');
const dragging = ref(false);
const dragover = ref(false);

const handleChange = e => {
  const { files } = e.target as HTMLInputElement;
  const file = files![0];

  if (
    ['.png', '.jpg', '.jpeg', '.webp', '.avif'].some(ext =>
      file.name.endsWith(ext),
    )
  ) {
    const imgEl = document.createElement('img');
    imgEl.src = URL.createObjectURL(file);
    imgEl.decode().then(() => {
      info.value = JSON.stringify(
        {
          name: file.name,
          size: file.size,

          naturalWidth: imgEl.naturalWidth,
          naturalHeight: imgEl.naturalHeight,
        },
        null,
        2,
      );
      URL.revokeObjectURL(imgEl.src); // TODO preview
    });
  } else if (['.mp4', '.webm'].some(ext => file.name.endsWith(ext))) {
    const videoEl = document.createElement('video');
    videoEl.src = URL.createObjectURL(file);
    videoEl.onloadedmetadata = () => {
      info.value = JSON.stringify(
        {
          name: file.name,
          size: file.size,

          naturalWidth: videoEl.videoWidth,
          naturalHeight: videoEl.videoHeight,
          duration: videoEl.duration,
        },
        null,
        2,
      );
      URL.revokeObjectURL(videoEl.src); // TODO preview
    };
  } else {
    if (file.size < 10 * 1024 * 1024) {
      const fr = new FileReader();
      fr.onload = e => {
        info.value = '' + fr.result;
        console.log(1, e, fr.result);
      };
      fr.onprogress = e => {
        console.log(2, e, fr.result);
      };

      fr.readAsText(file);
    }
  }
};

watchEffect(onCleanup => {
  if (!props.disabled) {
    onCleanup(
      on(document.body, 'dragover', () => {
        dragging.value = true;
      }),
    );
    onCleanup(
      on(document.body, 'dragleave', () => {
        dragging.value = false;
      }),
    );
  }
});

const handleDrop = (e: DragEvent) => {
  const f = e.dataTransfer?.files;
  info.value = [...(f ?? [])].map(s => s.name).join('\n');
};
</script>

<template>
  <div>
    <label
      :data-dragging="dragging || undefined"
      :data-dragover="dragover || undefined"
      @dragover.prevent="!props.disabled && (dragover = true)"
      @dragleave="dragover = false"
      @drop.prevent="handleDrop"
    >
      <input type="file" @change="handleChange" />
    </label>
    <div style="max-height: 100px;">
      {{ info }}
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  border: 6px dashed #8883;

  &:hover,
  &:has(> input:focus-visible) {
    border: 6px dashed #8888;
  }
}

label[data-dragging]::before {
  content: 'drop file here';
}

label[data-dragover]::before {
  content: 'ohhhhh';
}
input {
  pointer-events: none;
  outline: none;
}
</style>

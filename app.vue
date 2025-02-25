<template>
  <div class=" text-8xl h-[100vh] bg-slate-950">
    <ConfettiExplosion v-if="visible" :particleCount="200" :force="0.3" />
  <div class="flex justify-center items-center h-32 pt-40 w-full ">
  <span class="text-white">Cine-i cea mai frumusica?</span>
  </div>
    <div class="flex gap-24 mt-40 justify-center">
    <UButton
    ref="yesButton"
    color="gray"
    @click="explode"
    size="large"
    :label="yesButtonLabel"/>
    <UButton
    ref="noButton"
    @click="explode"
    variant="solid" color="gray"
    size="large"
             :label="noButtonLabel"
    />
    </div>
  </div>

</template>

<script setup>
import ConfettiExplosion from "vue-confetti-explosion";
const yesButton = ref(null);
const noButton = ref(null);

const yesButtonLabel = ref('Iulecika');
const noButtonLabel = ref('Altcineva');

const { isOutside : isOutsideNoButton} = useMouseInElement(noButton)

  const visible = ref(false);

  const explode = async () => {
    visible.value = false;
    await nextTick();
    visible.value = true;
  };

watch(isOutsideNoButton, (value) => {
  if (!value) {
    noButtonLabel.value = 'Iulecika'
    yesButtonLabel.value = 'Altcineva'
  } else {
    noButtonLabel.value = 'Altcineva'
    yesButtonLabel.value = 'Iulecika'
  }
});
</script>

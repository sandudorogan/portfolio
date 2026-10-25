<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Sandu Dorogan — Full Stack Developer',
  description: 'Tell me the what and I\'ll show you the how.',
})

const stripes = 'repeating-linear-gradient(180deg, #888888 0px, #888888 2px, #ffffff 2px, #ffffff 4px)'
</script>

<template>
  <div
    class="flex flex-col w-full h-full"
    style="position: relative; background-color: #b7b7c7;"
  >
    <svg
      width="1200"
      height="630"
      style="position: absolute; top: 0; left: 0;"
    >
      <defs>
        <pattern
          id="dither"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 0h2v2H0zM4 4h2v2H4z" fill="#9595ad" />
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#dither)" />
    </svg>
    <div
      class="flex flex-row items-center w-full h-[44px] px-[22px] text-[24px]"
      style="background-color: #dddddd; border-bottom: 2px solid #111111; font-family: 'Pixelify Sans', 'Pixelify+Sans'; font-weight: 700; color: #111111;"
    >
      <div
        class="flex items-center justify-center w-[26px] h-[26px] mr-[14px] text-[20px]"
        style="background-color: #4a3fb5; color: #ffffff;"
      >
        S
      </div>
      <div class="flex">
        Sandu
      </div>
    </div>

    <div class="flex flex-row flex-1 w-full px-[80px] pt-[48px] pb-[64px]">
      <div
        class="flex flex-col w-full h-full"
        style="background-color: #dddddd; border: 2px solid #111111; box-shadow: 12px 12px 0 #111111;"
      >
        <div class="flex flex-row items-center w-full h-[48px] px-[14px]">
          <div class="flex w-[22px] h-[22px]" style="background-color: #eeeeee; border: 2px solid #111111;" />
          <div class="flex flex-1 h-[22px] mx-[14px]" :style="{ backgroundImage: stripes }" />
          <div class="flex text-[24px]" style="font-family: 'Pixelify Sans', 'Pixelify+Sans'; color: #111111;">
            dorogans.com
          </div>
          <div class="flex flex-1 h-[22px] mx-[14px]" :style="{ backgroundImage: stripes }" />
          <div class="flex w-[22px] h-[22px]" style="background-color: #eeeeee; border: 2px solid #111111;" />
        </div>

        <div
          class="flex flex-col justify-center flex-1 mx-[6px] mb-[6px] px-[56px]"
          style="background-color: #ffffff; border: 2px solid #111111;"
        >
          <div
            class="flex text-[68px]"
            style="font-family: 'Pixelify Sans', 'Pixelify+Sans'; font-weight: 700; line-height: 1.05; color: #111111; text-shadow: 5px 5px 0 #ccccff;"
          >
            {{ title }}
          </div>
          <div
            class="flex max-w-[900px] mt-[28px] text-[30px]"
            style="font-family: 'Atkinson Hyperlegible', 'Atkinson+Hyperlegible'; line-height: 1.4; color: #333333;"
          >
            {{ description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

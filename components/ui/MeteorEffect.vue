<template>
  <!-- Decorative meteor effect - hidden from accessibility tree -->
  <div
    :class="cn('meteor-effect pointer-events-none absolute inset-0 overflow-hidden', props.class)"
    aria-hidden="true"
  >
    <div
      v-for="(meteor, index) in meteors"
      :key="index"
      class="absolute meteor"
      :style="meteor.style"
    />
  </div>
</template>

<script setup lang="ts">
interface MeteorEffectProps {
  class?: string;
  count?: number;
  color?: string;
}

const props = withDefaults(defineProps<MeteorEffectProps>(), {
  count: 20,
  color: '#64748b',
})

interface Meteor {
  style: {
    top: string;
    left: string;
    animationDelay: string;
    animationDuration: string;
  };
}

const meteors = computed<Meteor[]>(() => {
  return Array.from({ length: props.count }, () => ({
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    },
  }))
})
</script>

<style scoped>
.meteor {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: v-bind('props.color');
  box-shadow:
    0 0 0 1px rgba(100, 116, 139, 0.1),
    0 0 1px 1px v-bind('props.color'),
    0 0 20px 2px v-bind('props.color');
  animation: meteor-fall linear infinite;
  opacity: 0;
}

.meteor::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 1px;
  background: linear-gradient(to right, v-bind('props.color'), transparent);
  transform: translateX(-100%) rotate(45deg);
  transform-origin: right;
}

@keyframes meteor-fall {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(215deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(200px, 200px) rotate(215deg);
  }
}
</style>


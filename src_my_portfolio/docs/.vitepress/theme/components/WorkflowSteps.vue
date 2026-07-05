<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

interface WorkflowStep {
  title: string
  desc: string
}

const { t, tArray, language } = useI18n()
const steps = tArray<WorkflowStep>('hire.steps')
</script>

<template>
  <div class="hire-workflow fade-in" :data-lang="language">
    <p class="hire-workflow-label">{{ t('hire.workflowLabel') }}</p>

    <div class="hire-steps" role="list">
      <div
        v-for="(step, idx) in steps"
        :key="`${language}-${idx}`"
        class="hire-step"
        :class="`hire-step--${idx + 1}`"
        role="listitem"
        tabindex="0"
      >
        <span class="hire-step-num">{{ t('hire.stepPrefix') }} {{ idx + 1 }}</span>
        <span class="hire-step-title">{{ step.title }}</span>

        <div class="hire-step-tooltip" role="tooltip">
          {{ step.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

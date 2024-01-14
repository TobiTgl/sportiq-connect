<template>
  <v-card
    v-if="highlighted"
    flat
    class="highlighted text-white py-2"
    rounded="b-0"
  >
    Most Popular
  </v-card>
  <v-card v-else flat class="text-primary py-2">&nbsp;</v-card>

  <v-card
    class="pricing-card"
    flat
    elevation="3"
    :class="highlighted ? 'highlight-card' : 'non-highlight-card'"
    rounded="t-0"
  >
    <!-- Title -->

    <v-card-title class="mb-3">
      <h3>{{ title }}</h3>
    </v-card-title>

    <!-- Subtitle -->
    <p class="description" style="min-height: 63px">{{ description }}</p>

    <v-card-text style="min-height: 135px">
      <div v-if="title !== 'Enterprise'">
        <!-- Price -->
        <div v-if="!isYearly" class="text-h4">€{{ monthlyPrice }}</div>
        <div v-else class="">
          <span class="strikethrough text-h5">€{{ monthlyPrice }}</span>
          <span class="ml-3 text-h4">€{{ yearlyPrice }}</span>
        </div>

        <!-- price note -->
        <p class="timeframe mt-5">per month</p>
        <p v-if="title === 'Free'" class="timeframe">forever</p>
        <p v-if="title === 'Standard'" class="timeframe">
          for the first 12 months
        </p>
      </div>
    </v-card-text>

    <!-- Button -->
    <v-card-actions class="mx-1 mb-3">
      <v-btn
        v-if="currentplan === true"
        variant="outlined"
        block
        style="height: 48px"
        rounded="lg"
        class="not-clickable"
        :ripple="false"
      >
        Current Plan
      </v-btn>
      <v-btn
        v-else-if="title === 'Enterprise'"
        :color="theme.global.current.value.dark ? 'white' : 'black'"
        block
        variant="flat"
        style="height: 48px"
        rounded="lg"
        href="mailto:sales@sportiq-connect.de"
      >
        {{ buttonText }}
      </v-btn>
      <v-btn
        v-else
        :color="theme.global.current.value.dark ? 'white' : 'black'"
        block
        variant="flat"
        style="height: 48px"
        rounded="lg"
        @click.prevent="$router.push({ name: 'Profile' })"
      >
        {{ buttonText }}
      </v-btn>
    </v-card-actions>

    <v-divider></v-divider>

    <!-- features -->
    <v-card-text class="" align="start" style="min-height: 252px">
      <v-row>
        <v-col cols="1"><v-icon>mdi-arrow-left</v-icon></v-col>
        <v-col cols="*">
          <p v-if="title === 'Standard'" class="mb-5">
            <i>Everything included in Free, plus...</i>
          </p>
          <p v-if="title === 'Enterprise'" class="mb-5">
            <i>Everything included in Standard, plus...</i>
          </p>
          <p v-for="item in features" :id="item" class="mb-3">
            {{ item }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
const theme = useTheme();

defineProps({
  title: { String, required: true },
  monthlyPrice: { String, required: true },
  yearlyPrice: { String, required: true },
  description: { String, required: true },
  features: { Array, required: true },
  buttonText: { String, required: true },
  highlighted: { Boolean, required: false, default: false },
  isYearly: { Boolean, required: true },
  currentplan: { Boolean, required: true },
});
</script>

<style scoped>
.description {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  padding: 0 1rem;
}

.strikethrough {
  position: relative;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}
.strikethrough:before {
  position: absolute;
  content: "";
  left: 0;
  top: 50%;
  right: 0;
  border-top: 1px solid;
  border-color: inherit;

  -webkit-transform: rotate(15deg);
  -moz-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  -o-transform: rotate(15deg);
  transform: rotate(15deg);
}

.timeframe {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 12px;
}

.highlight-card {
  border: 2px solid #2196f3;
}

.non-highlight-card {
  border: 2px solid #ffffff;
}

.highlighted {
  background-color: #2196f3;
}

.not-clickable {
  cursor: default;
}
</style>

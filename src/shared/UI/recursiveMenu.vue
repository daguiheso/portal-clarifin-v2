<template>
  <a
    href="javascript:;"
    class="side-menu__item"
    :class="`${menuData?.selected ? 'active' : ''}`"
    @mouseover="HoverToggleInnerMenuFn($event, menuData)"
    @click="toggleSubmenu($event, menuData, undefined, level)">
    <span
      v-if="level == 1"
      class="shape1" /><span
        v-if="level == 1"
        class="shape2" />

    <i
      v-if="menuData?.icon"
      :class="`${menuData?.icon} side-menu__icon`" />
    <span
      v-if="level == 1"
      class="side-menu__label">
      {{ menuData.title }}
      <span
        v-if="menuData.badge"
        :class="`badge ${menuData?.badgeColor} ms-1`">
        {{ menuData.badge
        }}
      </span>
    </span>
    <span v-if="level > 1">
      {{ menuData.title }}
      <span
        v-if="menuData.badge"
        :class="`badge ${menuData?.badgeColor} ms-1`">
        {{ menuData.badge
        }}
      </span>
    </span>
    <i class="fe fe-chevron-right side-menu__angle" />
  </a>
  <ul
    class="slide-menu "
    :class="`${menuData.active && level == 1 ? 'double-menu-active' : ''} child${level} ${menuData?.dirchange ? 'force-left' : ''}`"
    :style="menuData.active ? 'display : block' : ''">
    <li
      v-if="level <= 1"
      class="slide side-menu__label1">
      <a href="javascript:void(0)">{{ menuData.title }}</a>
    </li>

    <li
      v-for="(firstLevelMenuItem, subIndex) in menuData.children"
      :key="subIndex"
      :class="`
            ${firstLevelMenuItem.headTitle ? 'slide__category' : ''} ${firstLevelMenuItem?.type == 'empty' ? 'slide' : ''} ${firstLevelMenuItem?.type == 'link' ? 'slide' : ''} ${firstLevelMenuItem?.type == 'sub' ? 'slide has-sub' : ''} ${firstLevelMenuItem?.selected ? 'active' : ''}`">
      <template v-if="firstLevelMenuItem?.type === 'link'">
        <router-link
          :to="firstLevelMenuItem.path"
          class="side-menu__item"
          :class="`${firstLevelMenuItem?.selected ? 'active' : ''}`">
          {{ firstLevelMenuItem.title }}<span
            v-if="firstLevelMenuItem.badge"
            :class="`badge ${firstLevelMenuItem.badgeColor} ms-1`">
            {{ firstLevelMenuItem.badge }}
          </span>
        </router-link>
      </template>
      <template v-if="firstLevelMenuItem?.type === 'empty'">
        <a
          href="javascript:;"
          class="side-menu__item">
          {{ firstLevelMenuItem.title }}
          <span
            v-if="firstLevelMenuItem.badge"
            :class="`badge ${firstLevelMenuItem.badgeColor} ms-1`">
            {{
              firstLevelMenuItem.badge }}
          </span>
        </a>
      </template>
      <template v-if="firstLevelMenuItem?.type === 'sub'">
        <RecursiveMenu
          :menu-data="firstLevelMenuItem"
          :toggle-submenu="toggleSubmenu"
          :hover-toggle-inner-menu-fn="HoverToggleInnerMenuFn"
          :level="level + 1" />
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    menuData: {
      type: Object,
      required: true,
    },
    toggleSubmenu: {
      type: Function,
      required: true,
    },
    HoverToggleInnerMenuFn: {
      type: Function,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
})
</script>

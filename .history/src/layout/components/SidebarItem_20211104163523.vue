<template>
  <div
    class="sidebar-item"
    :class="{ select_item: module == item.name }"
    v-if="stateHidden(item)"
  >
    <span class="text">
      <span>{{ item.meta.title }}</span>
      <i class="el-icon-caret-right"></i>
    </span>
    <div class="dropdown">
      <!-- <div
        class="dropdown-item"
        v-for="(data, index) in item.children"
        :key="index"
      >
        {{ data.meta.title }}
      </div> -->
      <router-link
        v-for="(data, index) in item.children"
        :key="index"
        :to="{ name: data.name }"
        custom
        v-slot="{ navigate }"
      >
        <div
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          class="dropdown-item"
          :class="{ select_link: route == data.name }"
          v-if="stateHidden(data)"
        >
          <span class="line"></span>
          {{ data.meta.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    route() {
      return this.$route.name;
    },
    module() {
      return this.$route.matched[0].name;
    },
    role() {
      return this.$store.getters.role;
    },
  },
  methods: {
    stateHidden(row) {
      if (!row.hidden) {
        if (!row.meta.role) {
          return true;
        } else {
          if (row.meta.role == this.role) {
            return true;
          }
          return false;
        }
      }
      return false;
    },
  },
  created() {},
  mounted() {
    // console.log(this.route);
  },
};
</script>
<style lang="scss" scoped>
.sidebar-item {
  position: relative;
  display: inline-block;
  text-align: center;
  width: 125px;
  height: 55px;
  line-height: 55px;
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
  .text {
    padding: 10px 5px 10px 20px;
    span {
      margin-right: 5px;
    }
    i {
      font-size: 20px;
      transition: all 0.3s;
    }
  }
  .dropdown {
    display: none;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    min-width: 125px;
    padding: 0 10px;
    .dropdown-item {
      position: relative;
      border-bottom: 1px dashed rgba(0, 254, 228, 0.4);
      cursor: pointer;
      height: 50px;
      line-height: 50px;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  &:hover {
    i {
      transform: rotate(90deg);
    }
  }
  &:hover .dropdown {
    display: block;
  }
}
.select_item {
  .text {
    color: #00fee4;
    border-bottom: 1px solid #00fee4;
  }
}
.select_link {
  color: #00fee4;
  .line {
    position: absolute;
    top: 19px;
    left: 0;
    display: inline-block;
    width: 3px;
    height: 11px;
    background-color: #00fee4;
  }
}
</style>

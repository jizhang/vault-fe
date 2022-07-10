<template>
  <div class="sidebar">
    <el-menu
      ref="menu"
      default-active="1"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      @select="handleSelect"
    >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-receiving menu-icon"></i>元数据管理</template>
        <el-menu-item index="1-1">表数据管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100%;
  padding-top: 60px;
  .el-menu {
    height: 100%;
    border: none;
  }

  .menu-icon {
    color: rgba(255, 255, 255, 0.8);
    margin: -3px 6px 0 -10px;
    font-size: 16px;
  }
}
</style>

<script>
import _ from 'lodash'

const MENU = [
  {
    index: '1',
    path: '/meta/',
    children: [
      { index: '1-1', path: '/meta/table/list' },
    ],
  },
]

export default {
  mounted() {
    const currentRoute = $router.currentRoute.path

    let openedMenus, activedIndex
    const menuItem = _.find(MENU, (item) => _.includes(currentRoute, item.path))
    if (menuItem) {
      openedMenus = [menuItem.index]
      activedIndex = menuItem.index
    }

    _.forEach(MENU, (menuItem) => {
      if (_.has(menuItem, 'children')) {
        const childItem = _.find(menuItem.children, (item) => _.includes(currentRoute, item.path))
        if (childItem) {
          openedMenus = [menuItem.index]
          activedIndex = childItem.index
          return false
        }
      }

      if (_.has(menuItem, 'includes')) {
        const includeItem = _.find(menuItem.includes, (item) => _.includes(currentRoute, item.path))
        if (includeItem) {
          openedMenus = [menuItem.index]
          activedIndex = menuItem.index
          return false
        }
      }
    })

    this.$refs.menu.openedMenus = openedMenus
    this.$refs.menu.activedIndex = activedIndex
  },

  methods: {
    handleSelect(key) {
      let path = ''

      _.forEach(MENU, (menuItem) => {
        if (menuItem.index === key) {
          path = menuItem.path
          return false
        }

        _.forEach(_.get(menuItem, 'children', []), (childItem) => {
          if (childItem.index === key) {
            path = childItem.path
            return false
          }
        })

        if (path) {
          return false
        }
      })

      $router.push({
        path: '/dashboard' + path,
      })
    },
  },
}
</script>

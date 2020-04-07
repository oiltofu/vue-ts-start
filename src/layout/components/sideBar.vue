<template>
  <v-card
    height="400"
    width="256"
    class="mx-auto">
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-group
          no-action
          sub-group
          value="true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(admin, i) in admins"
            :key="i"
            link>
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group sub-group
          no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(crud, i) in cruds"
            :key="i">
            <v-list-item-title v-text="crud[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {
  admins = [
    ['Management', 'people_outline'],
    ['Settings', 'settings']
  ]

  cruds = [
    ['Create', 'add'],
    ['Read', 'insert_drive_file'],
    ['Update', 'update'],
    ['Delete', 'delete']
  ]
}
</script>

<style lang="scss" scoped>
</style>

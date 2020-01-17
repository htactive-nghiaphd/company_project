<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-avatar>
            <img :src="require('../assets/tải xuống.png')" alt="John" />
            <v-list-item-title class="title">HT ACTIVE</v-list-item-title>
          </v-avatar>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.title"
                :to="item.link"
              ></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.itemsChild"
            :key="subItem.titleChild"
            :to="subItem.link"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="subItem.titleChild"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- <v-list-group></v-list-group> -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon>mdi-dots-vertical</v-icon>

      <v-spacer></v-spacer>
      <template>
        <div>
          <v-row>
              <v-col cols="4" sm="3">
                  <v-avatar size="36px">
                      <img :src="require('../assets/tải xuống.png')" alt="Jonh" />
                  </v-avatar>
              </v-col>
              <v-col>
                <strong>Pham Van Nghia</strong>
              </v-col>
          </v-row>
        </div>
      </template>
    </v-app-bar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      drawer: null
    }
  },
  computed: {
    ...mapState('Interface', ['items', 'datas'])
  },
  methods: {
    ...mapMutations('Interface', ['clickmose'])
  }
}
</script>

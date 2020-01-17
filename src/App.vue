<template>
  <v-app>
    <v-toolbar>
      <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark>
                  Board
              </v-btn>
            </template>
         <v-list>
         </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
          <router-link to="/register" tag="span"><v-btn>Register</v-btn></router-link>
      </div>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>

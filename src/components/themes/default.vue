<template>
    <div class="theme-default">
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
            <v-list dense>
                <template v-for="item in items">
                    <v-layout v-if="item.heading" :key="item.heading" row align-center>
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i">
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" @click="MenuAction(item)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Google Contacts</span>
            </v-toolbar-title>
            <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            <v-menu bottom left>
                <v-btn slot="activator" dark flat>
                    Admin
                    <v-icon>arrow_drop_down</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="(item, i) in menuUser" :key="i" @click="MenuAction(item)">
                        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <!-- <v-btn icon large>
					<v-avatar size="32px" tile>
						<img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify">
					</v-avatar>
				</v-btn> -->
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <!-- fill-height-->
                <!-- <v-layout justify-center align-center>
					<v-tooltip right>
						
					</v-tooltip>
					<v-tooltip right>
						<v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/EQOYVV" target="_blank">
							<v-icon large>mdi-codepen</v-icon>
						</v-btn>
						<span>Codepen</span>
					</v-tooltip>
				</v-layout> -->
                <router-view/>
            </v-container>
        </v-content>
    </div>
</template>
<script>
import { firebase } from "@/plugins/firebaseInit.js";
export default {
  name: "theme-default",
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {icon: "contacts", text: "Contacts"},
      {icon: "history", text: "Frequently contacted"},
      {icon: "content_copy", text: "Languages", push: "languages"},
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Labels",
        model: true,
        children: [
          {icon: "add", text: "Create label"}
        ]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "More",
        model: false,
        children: [
          {text: "Import"},
          {text: "Export"},
          {text: "Print"},
          {text: "Undo changes"},
          {text: "Other contacts"}
        ]
      },
      {icon: "settings", text: "Settings"},
      {icon: "chat_bubble", text: "Send feedback"},
      {icon: "help", text: "Help"},
      {icon: "phonelink", text: "App downloads"},
      {icon: "keyboard", text: "Go to the old version"}
    ],
    menuUser: [
      { icon: "local_dining", text: "Profile", router: "profile" },
      { icon: "local_dining", text: "Setting", router: "setting" },
      {
        icon: "local_dining",
        text: "Logout",
        go: "auth",
        store: "auth/logout"
      }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    MenuAction(item) {
        if (item.store) this.$store.commit(item.store);
        if (item.go) this.$router.go('/' + item.go);
        else this.$router.push('/' + item.push);
    }
  }
};
</script>

<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="userList"
      :loading="loading"
      :sort-by="[{ key: 'name', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>

          <!-- Add user Button and dialog -->
          <v-dialog v-model="showDialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn variant="flat" color="primary" v-bind="props" class="mr-5">
                + Add User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>New User</v-card-title>
              <v-card-text>
                <v-form v-model="isValid">
                  <v-text-field
                    v-model="name"
                    label="Display name"
                    :rules="rules.name"
                    class="mb-3"
                    clearable
                  />
                  <v-text-field
                    v-model="email"
                    label="E-Mail"
                    type="email"
                    :rules="rules.email"
                    clearable
                    class="mb-3"
                  />
                  <v-text-field
                    label="Initial password"
                    readonly
                    variant="solo"
                    v-model="password"
                  >
                    <template v-slot:append-inner>
                      <v-icon
                        class="copy-btn"
                        @click:append-inner="copyToClipboard"
                      >
                        mdi-content-copy
                      </v-icon>
                    </template>
                  </v-text-field>
                  <v-select
                    label="Role"
                    :items="['Athlete', 'Admin']"
                    v-model="role"
                    :rules="rules.role"
                    class="mb-3"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn variant="outlined"> Cancle </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  variant="outlined"
                  color="primary"
                  :disabled="!isValid"
                  @click.prevent="createUser"
                  :loading="loading"
                >
                  Create
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <!-- Action buttons -->
      <template v-slot:item.actions="{ item }">
        <v-tooltip text="Reset Password" location="top">
          <template v-slot:activator="{ props }">
            <v-icon
              class="mr-3"
              v-bind="props"
              @click="resetPassword(item.userId)"
            >
              mdi-lock-reset
            </v-icon>
          </template>
        </v-tooltip>

        <v-tooltip text="Delete user" location="top">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" @click="deleteUser(item.userId)">
              mdi-delete
            </v-icon>
          </template>
        </v-tooltip>
      </template>

      <!-- No data slot -->
      <template v-slot:no-data>
        Your organization has no users yet! Create a new one with the button
        above.
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { getAuth } from "firebase/auth";
const auth = getAuth();
import axios from "axios";
import { ref } from "vue";
import { getBackendUrl } from "@/helpers/helpers";
import { onBeforeMount } from "vue";
const loading = ref(true);

const showDialog = ref(false);
const name = ref("");
const email = ref("");
const password = ref("SiqC@" + new Date().getFullYear());
const role = ref<"Athlete" | "Admin">();
const isValid = ref(false);
const rules = {
  email: [
    (v: any) => !!v || "E-Mail is required.",
    (v: any) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Unvalid e-mail address.",
  ],
  name: [
    (v: any) => !!v || "Name is required.",
    (v: any) => (v && v.length >= 3) || "Name must be at least 3 characters.",
    (v: any) => /^[A-Za-z\s]+$/.test(v) || "Name must only contain characters.",
  ],
  role: [(v: any) => !!v || "Role is required."],
};

const headers = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Assigned Role",
    key: "role",
  },
  {
    title: "",
    key: "actions",
    sortable: false,
  },
];

const userList = ref<
  Array<{
    userId: string;
    name: string;
    email: string;
    role: "Athlete" | "Admin";
  }>
>([]);

// TODO: fetch users from backend
onBeforeMount(() => {
  auth.currentUser
    ?.getIdToken()
    .then((token) => {
      axios
        .get(getBackendUrl() + "/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          userList.value = response.data;
          loading.value = false;
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

async function createUser() {
  loading.value = true;

  await auth.currentUser
    ?.getIdToken()
    .then((token) => {
      axios
        .post(
          getBackendUrl() + "/auth/users/create",
          {
            name: name.value,
            email: email.value,
            role: role.value,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          userList.value.push({
            userId: response.data.userId,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          });

          showDialog.value = false;
          loading.value = false;
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function copyToClipboard() {
  navigator.clipboard.writeText(password.value);
}

function deleteUser(userId: string) {
  // TODO: delete user
  loading.value = true;
  console.log("delete user:", userId);

  loading.value = false;
}

function resetPassword(userId: string) {
  // TODO: reset password
  loading.value = true;
  console.log("reset password", userId);

  loading.value = false;
}
</script>

<style lang="scss" scoped>
.copy-btn {
  cursor: pointer;
}
.copy-btn:hover {
  color: #1867c0;
}
</style>

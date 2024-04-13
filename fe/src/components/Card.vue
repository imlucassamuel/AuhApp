<template>
  <div class="elements-centrelized">
    <el-card class="element-main-card" :model="ruleCard">
      <el-tabs type="border-card" class="demo-tabs" @tab-click="handleForm()">
        <el-tab-pane>
          <template #label>
            <router-link to="/sign-in">
              <span class="custom-tabs-label">
                <el-icon><UserFilled /></el-icon>
                <span>Entrar</span>
              </span>
            </router-link>
          </template>
          <Form
            v-if="ruleCard.signin"
            :signin="ruleCard.signin"
            :signup="ruleCard.signup"
            @update:prop="handleUpdate"
          />
        </el-tab-pane>

        <el-tab-pane>
          <template #label>
            <router-link to="/sign-up">
              <span class="custom-tabs-label">
                <el-icon><Edit style="margin-top: 2.4px" /></el-icon>
                <span>Criar conta</span>
              </span>
            </router-link>
          </template>
          <Form
            v-if="ruleCard.signup"
            :signup="ruleCard.signup"
            :signin="ruleCard.signin"
            @update:prop="handleUpdate"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { UserFilled, Edit } from "@element-plus/icons-vue";
import Form from "./Form.vue";

const ruleCard = ref({
  signin: true,
  signup: false,
  name: "",
  email: "",
});

const handleForm = () => {
  ruleCard.value.signin = !ruleCard.value.signin;
  ruleCard.value.signup = !ruleCard.value.signup;
};

const handleUpdate = (payload) => {
  if (payload.prop === "signin") {
    ruleCard.value.signin = payload.value;
  } else if (payload.prop === "signup") {
    ruleCard.value.signup = payload.value;
  }
};
</script>

<style>
.elements-centrelized {
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 70vh;
  padding: 2rem;
}

.element-main-card {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1280px;
  min-height: 400px;
  margin: 64px auto;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
}

.custom-tabs-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
</style>

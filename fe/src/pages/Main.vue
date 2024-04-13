<template>
  <el-container class="layout-container-demo">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <p>{{ user }}</p>
          <el-icon size="24px"><UserFilled /></el-icon>
          <span circle @click="handleLogout">
            <img :src="logout" alt="Logout" />
          </span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import getTokenFromCookies from "../utils/getTokenFromCookies";
import { UserFilled } from "@element-plus/icons-vue";
import logout from "../assets/logout.svg";
import { useRouter } from "vue-router";

const router = useRouter();
const user = getTokenFromCookies("email");

const handleLogout = () => {
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  router.push("/sign-in");
};

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};

const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>

<style scoped>
.layout-container-demo {
  display: flex;
  height: 100vh;
  flex: 1;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: #686363;
  color: #ffffff;
}
.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
  background-color: #ffffff;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  right: 20px;

  span {
    cursor: pointer;
    padding-top: 4px;
  }
}
</style>

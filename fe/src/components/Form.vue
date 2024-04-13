<template>
  <el-form v-loading="loading" ref="ruleFormRef" style="max-width: 600px;" :model="ruleForm" status-icon :rules="rules" label-width="auto"
    class="demo-ruleForm">
    <el-form-item v-if="!props.signin && !token.hasToken" label="Nome" prop="name">
      <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item v-if="!token.hasToken" label="Email" prop="email">
      <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item v-if="!token.hasToken" label="Senha" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item v-if="!props.signin && !token.hasToken" label="Telefone" prop="phone">
      <el-input maxlength="12"  v-model="ruleForm.phone"
        :formatter="(value) => `${value}`.replace(/\D/g, '').replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')" />
    </el-form-item>
    <el-form-item v-if="token.hasToken" label="Token" prop="token">
      <el-input v-model="token.codeToken" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button v-if="!token.hasToken" style="margin-top:24px;padding: 0 120px;" type="primary" @click="submitForm(ruleFormRef)">{{
        !props.signin ?
          'Cadastrar' : 'Entrar' }}
      </el-button>
      <el-button v-else style="margin-top:24px;padding: 0 120px;" type="primary" @click="submitToken(token.codeToken)">
        Enviar token
      </el-button>
    </el-form-item>
    <h1>

    </h1>
  </el-form>
</template>

<script  setup>
import instance from '../http/axios.js';
import { reactive, ref, defineEmits  } from 'vue';
import {  useRouter } from 'vue-router';

import setCookie from '../utils/saveTokenIntoCookies.js';
import { Notification } from '../toast/handleToast.js';

const ruleFormRef = ref();
const loading = ref(false)
const token = ref({
  hasToken: false,
  codeToken: '',
})
const router = useRouter();


const props = defineProps({
  signin: Boolean,
  signup: Boolean
});
const emit = defineEmits(['update:prop']);


const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Insira uma senha válida'))
  }
  else {
    callback()
  }
}

const validateName = (rule, value, callback) => {
  const regex = /\s\S+$/;

  if (!regex.test(value)) {
    callback(new Error('Insira nome e sobrenome'))
  }
  else {
    callback()
  }
}

const validateEmail = (rule, value, callback) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    callback(new Error('Insira um e-mail valido'))
  }
  else {
    callback()
  }
}

const ruleForm = reactive({
  password: '',
  phone: '',
  name: '',
  email: '',
})

const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  email: [{ validator: validateEmail, trigger: 'blur' }],
})

const handleSubmitForm = async (formEl) => {
  loading.value = true;
  if (props.signup) {
    try {
      await instance.post('/sign-up', ruleForm);
      loading.value = false;

      emit('update:prop', { prop: 'signin', value: true })
      emit('update:prop', { prop: 'signup', value: false })
      router.push('/sign-in');
    } catch (error) {
      Notification(error)
      loading.value = false;

    }
  }

  if (props.signin) {
    try {
      await instance.post('/sign-in', ruleForm);
      token.value.hasToken= true;
      loading.value = false;

    } catch (error) {
      Notification(error)

      loading.value = false;

    }
  }


};

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {

    if (valid) {
      handleSubmitForm(formEl)
      resetForm(formEl)
    } else {
      return false
    }
  })
}

const submitToken = async (codeToken) => {
  try {
    setCookie('token', codeToken);
    router.push('/main');

  } catch (error) {
    Notification(error)
  }
}


const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

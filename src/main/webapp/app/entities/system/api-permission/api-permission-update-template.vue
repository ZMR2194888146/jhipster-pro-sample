<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.id.$model" id="api-permission-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.serviceName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.apiPermission.serviceName.$model"
              id="api-permission-serviceName"
              name="serviceName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.name.$model" id="api-permission-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.code.$model" id="api-permission-code" name="code" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.description')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.apiPermission.description.$model"
              id="api-permission-description"
              name="description"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.type')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="api-permission-type" name="type" v-model="$v.apiPermission.type.$model">
              <a-select-option value="BUSINESS">{{ $t('lwjsApp.ApiPermissionType.BUSINESS') }}</a-select-option>
              <a-select-option value="API">{{ $t('lwjsApp.ApiPermissionType.API') }}</a-select-option>
              <a-select-option value="ENTITY">{{ $t('lwjsApp.ApiPermissionType.ENTITY') }}</a-select-option>
              <a-select-option value="MICRO_SERVICE">{{ $t('lwjsApp.ApiPermissionType.MICRO_SERVICE') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.method')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.method.$model" id="api-permission-method" name="method" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.url')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.url.$model" id="api-permission-url" name="url" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.status')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="api-permission-status" name="status" v-model="$v.apiPermission.status.$model">
              <a-select-option value="CONFIGURABLE">{{ $t('lwjsApp.ApiPermissionState.CONFIGURABLE') }}</a-select-option>
              <a-select-option value="PERMIT_ALL">{{ $t('lwjsApp.ApiPermissionState.PERMIT_ALL') }}</a-select-option>
              <a-select-option value="UNREACHABLE">{{ $t('lwjsApp.ApiPermissionState.UNREACHABLE') }}</a-select-option>
              <a-select-option value="AUTHENTICATE">{{ $t('lwjsApp.ApiPermissionState.AUTHENTICATE') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.systemApiPermission.parent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="api-permission-parent" name="parent" v-model="apiPermission.parentId">
              <a-select-option
                v-bind:value="apiPermissionOption.id"
                v-for="apiPermissionOption in apiPermissions"
                :key="apiPermissionOption.id"
                >{{ apiPermissionOption.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.apiPermission.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./api-permission-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>

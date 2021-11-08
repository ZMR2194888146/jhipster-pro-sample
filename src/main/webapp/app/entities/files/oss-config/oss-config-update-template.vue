<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.id.$model" id="oss-config-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.provider')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="oss-config-provider" name="provider" v-model="$v.ossConfig.provider.$model">
              <a-select-option value="MINIO">{{ $t('lwjsApp.OssProvider.MINIO') }}</a-select-option>
              <a-select-option value="QINIU">{{ $t('lwjsApp.OssProvider.QINIU') }}</a-select-option>
              <a-select-option value="ALI">{{ $t('lwjsApp.OssProvider.ALI') }}</a-select-option>
              <a-select-option value="TENCENT">{{ $t('lwjsApp.OssProvider.TENCENT') }}</a-select-option>
              <a-select-option value="LOCAL">{{ $t('lwjsApp.OssProvider.LOCAL') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.ossCode')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.ossCode.$model" id="oss-config-ossCode" name="ossCode" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.endpoint')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.endpoint.$model" id="oss-config-endpoint" name="endpoint" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.accessKey')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.accessKey.$model" id="oss-config-accessKey" name="accessKey" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.secretKey')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.secretKey.$model" id="oss-config-secretKey" name="secretKey" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.bucketName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.ossConfig.bucketName.$model"
              id="oss-config-bucketName"
              name="bucketName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.appId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.appId.$model" id="oss-config-appId" name="appId" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.region')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.region.$model" id="oss-config-region" name="region" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.remark')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.ossConfig.remark.$model" id="oss-config-remark" name="remark" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.filesOssConfig.enabled')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.ossConfig.enabled.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="oss-config-enabled"
              name="enabled"
            ></a-switch>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.ossConfig.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./oss-config-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>

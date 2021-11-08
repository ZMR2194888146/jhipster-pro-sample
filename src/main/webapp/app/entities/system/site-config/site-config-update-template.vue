<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.siteConfig.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.id.$model" id="site-config-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.siteConfig.title')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.title.$model" id="site-config-title" name="title" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.siteConfig.remark')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.remark.$model" id="site-config-remark" name="remark" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.siteConfig.fieldName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.fieldName.$model" id="site-config-fieldName" name="fieldName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.siteConfig.fieldValue')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.siteConfig.fieldValue.$model"
              id="site-config-fieldValue"
              name="fieldValue"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('lwjsApp.siteConfig.fieldType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="site-config-fieldType" name="fieldType" v-model="$v.siteConfig.fieldType.$model">
              <a-select-option value="INTEGER">{{ $t('lwjsApp.CommonFieldType.INTEGER') }}</a-select-option>
              <a-select-option value="LONG">{{ $t('lwjsApp.CommonFieldType.LONG') }}</a-select-option>
              <a-select-option value="BOOLEAN">{{ $t('lwjsApp.CommonFieldType.BOOLEAN') }}</a-select-option>
              <a-select-option value="STRING">{{ $t('lwjsApp.CommonFieldType.STRING') }}</a-select-option>
              <a-select-option value="FLOAT">{{ $t('lwjsApp.CommonFieldType.FLOAT') }}</a-select-option>
              <a-select-option value="DOUBLE">{{ $t('lwjsApp.CommonFieldType.DOUBLE') }}</a-select-option>
              <a-select-option value="ZONED_DATE_TIME">{{ $t('lwjsApp.CommonFieldType.ZONED_DATE_TIME') }}</a-select-option>
              <a-select-option value="LOCATE_DATE">{{ $t('lwjsApp.CommonFieldType.LOCATE_DATE') }}</a-select-option>
              <a-select-option value="BIG_DECIMAL">{{ $t('lwjsApp.CommonFieldType.BIG_DECIMAL') }}</a-select-option>
              <a-select-option value="TEXTBLOB">{{ $t('lwjsApp.CommonFieldType.TEXTBLOB') }}</a-select-option>
              <a-select-option value="IMAGEBLOB">{{ $t('lwjsApp.CommonFieldType.IMAGEBLOB') }}</a-select-option>
              <a-select-option value="ARRAY">{{ $t('lwjsApp.CommonFieldType.ARRAY') }}</a-select-option>
              <a-select-option value="ENUM">{{ $t('lwjsApp.CommonFieldType.ENUM') }}</a-select-option>
              <a-select-option value="UPLOAD_IMAGE">{{ $t('lwjsApp.CommonFieldType.UPLOAD_IMAGE') }}</a-select-option>
              <a-select-option value="UPLOAD_FILE">{{ $t('lwjsApp.CommonFieldType.UPLOAD_FILE') }}</a-select-option>
              <a-select-option value="ENTITY">{{ $t('lwjsApp.CommonFieldType.ENTITY') }}</a-select-option>
              <a-select-option value="RADIO">{{ $t('lwjsApp.CommonFieldType.RADIO') }}</a-select-option>
              <a-select-option value="MULTI_SELECT">{{ $t('lwjsApp.CommonFieldType.MULTI_SELECT') }}</a-select-option>
              <a-select-option value="DATA_DICTIONARY">{{ $t('lwjsApp.CommonFieldType.DATA_DICTIONARY') }}</a-select-option>
              <a-select-option value="UUID">{{ $t('lwjsApp.CommonFieldType.UUID') }}</a-select-option>
              <a-select-option value="INSTANT">{{ $t('lwjsApp.CommonFieldType.INSTANT') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.siteConfig.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./site-config-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
